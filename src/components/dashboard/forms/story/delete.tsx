import { useState } from "react";
import { toast } from "sonner";
import { ActionModal } from "@/components/dashboard/dialogs/action-modal";
import { DeleteConfirmationMessage } from "@/components/ui/delete-confirmation-message";
import { useStoryStore } from "@/stores/storyStore";
import { deleteStoryRequest } from "@/requests/story/delete";

interface DeleteStoryDialogProps {
  open: boolean;
  onClose: () => void;
  storyId: number;
  storyTitle: string;
}

export function DeleteStoryDialog({
  open,
  onClose,
  storyId,
  storyTitle,
}: DeleteStoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const { fetchStories } = useStoryStore();

  const handleDelete = async () => {
    setLoading(true);

    const result = await deleteStoryRequest(storyId);

    if (result.success) {
      toast.success(`Cerita "${storyTitle}" berhasil dihapus.`);
      await fetchStories();
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
      title={`Hapus Cerita "${storyTitle}"?`}
      onSubmit={handleDelete}
      loading={loading}
    >
      <DeleteConfirmationMessage label={`cerita "${storyTitle}"`} />
    </ActionModal>
  );
}
