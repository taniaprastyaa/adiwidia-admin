import { ActionModal } from "@/components/dashboard/dialogs/action-modal";
import { useProvinceStore } from "@/stores/provinceStore";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProvinceRequest } from "@/requests/province/delete";
import { DeleteConfirmationMessage } from "@/components/ui/delete-confirmation-message";

interface DeleteProvinceDialogProps {
  open: boolean;
  onClose: () => void;
  provinceId: number;
  provinceName: string;
}

export function DeleteProvinceDialog({ open, onClose, provinceId, provinceName,
}: DeleteProvinceDialogProps) {
  const { fetchProvinces } = useProvinceStore();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteProvinceRequest(provinceId);

    if (result.success) {
      await fetchProvinces();
      toast.success(result.message);
      onClose();
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <ActionModal open={open} onClose={onClose} type="delete" title={`Hapus Provinsi ${provinceName}?`} onSubmit={handleDelete} loading={loading} >
      <DeleteConfirmationMessage label={`provinsi ${provinceName}`} />
    </ActionModal>
  );
}