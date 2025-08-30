"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ActionModal } from "@/components/dashboard/dialogs/action-modal";
import { DeleteConfirmationMessage } from "@/components/ui/delete-confirmation-message";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";
import { deleteVirtualMuseumItemRequest } from "@/requests/virtual-museum-item/delete";

interface DeleteVirtualMuseumItemDialogProps {
  open: boolean;
  onClose: () => void;
  itemId: number;
  itemName: string;
}

export function DeleteVirtualMuseumItemDialog({
  open,
  onClose,
  itemId,
  itemName,
}: DeleteVirtualMuseumItemDialogProps) {
  const [loading, setLoading] = useState(false);
  const { fetchItems } = useVirtualMuseumItemStore();

  const handleDelete = async () => {
    setLoading(true);

    const result = await deleteVirtualMuseumItemRequest(itemId);

    if (result.success) {
      toast.success(`Item "${itemName}" berhasil dihapus.`);
      await fetchItems(); 
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
      title={`Hapus Item "${itemName}"?`}
      onSubmit={handleDelete}
      loading={loading}
    >
      <DeleteConfirmationMessage label={`item "${itemName}"`} />
    </ActionModal>
  );
}
