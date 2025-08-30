import { useState } from "react";
import { toast } from "sonner";
import { ActionModal } from "@/components/dashboard/dialogs/action-modal";
import { DeleteConfirmationMessage } from "@/components/ui/delete-confirmation-message";
import { useCultureStore } from "@/stores/cultureStore";
import { deleteCultureRequest } from "@/requests/culture/delete";

interface DeleteCultureDialogProps {
  open: boolean;
  onClose: () => void;
  cultureId: number;
  cultureName: string;
}

export function DeleteCultureDialog({
  open,
  onClose,
  cultureId,
  cultureName,
}: DeleteCultureDialogProps) {
  const [loading, setLoading] = useState(false);
  const { fetchCultures } = useCultureStore();

  const handleDelete = async () => {
    setLoading(true);

    const result = await deleteCultureRequest(cultureId);

    if (result.success) {
      toast.success(`Budaya "${cultureName}" berhasil dihapus.`);
      await fetchCultures(); // refresh data cultures
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
      title={`Hapus Budaya "${cultureName}"?`}
      onSubmit={handleDelete}
      loading={loading}
    >
      <DeleteConfirmationMessage label={`budaya "${cultureName}"`} />
    </ActionModal>
  );
}
