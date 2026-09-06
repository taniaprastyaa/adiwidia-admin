"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ActionModal } from "@/components/dashboard/dialogs/action-modal";
import { DeleteConfirmationMessage } from "@/components/ui/delete-confirmation-message";
import { useMuseumSceneStore } from "@/stores/museumSceneStore";
import { deleteMuseumSceneRequest } from "@/requests/museum-scene/delete";

interface DeleteMuseumSceneDialogProps {
  open: boolean;
  onClose: () => void;
  sceneId: number;
  sceneName: string;
}

export function DeleteMuseumSceneDialog({
  open,
  onClose,
  sceneId,
  sceneName,
}: DeleteMuseumSceneDialogProps) {
  const [loading, setLoading] = useState(false);
  const { fetchScenes } = useMuseumSceneStore();

  const handleDelete = async () => {
    setLoading(true);

    const result = await deleteMuseumSceneRequest(sceneId);

    if (result.success) {
      toast.success(`Scene "${sceneName}" berhasil dihapus.`);
      await fetchScenes();
      onClose();
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      type="delete"
      title={`Hapus Scene "${sceneName}"?`}
      onSubmit={handleDelete}
      loading={loading}
    >
      <DeleteConfirmationMessage label={`scene "${sceneName}"`} />
    </ActionModal>
  );
}
