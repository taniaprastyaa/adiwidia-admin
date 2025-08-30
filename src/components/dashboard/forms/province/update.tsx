"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useProvinceStore } from "@/stores/provinceStore";
import { updateProvinceRequest } from "@/requests/province/update";
import { ActionModal } from "@/components/dashboard/dialogs/action-modal";
import type { Province } from "@/types";

interface UpdateProvinceModalProps {
  open: boolean;
  onClose: () => void;
  province: Province | null;
}

export default function UpdateProvinceModal({ open, onClose, province,
}: UpdateProvinceModalProps) {
  const { loadingCrud } = useProvinceStore();

  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: ""
  });

  useEffect(() => {
    if (province) {
      setForm({
        id: province.id,
        name: province.name,
        description: province.description || ""
      });
    }
  }, [province]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const result = await updateProvinceRequest(form);

    if (result.success) {
      toast.success(result.message);
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <ActionModal open={open} onClose={onClose} type="update" title="Update Province" onSubmit={handleSubmit} loading={loadingCrud} >
      <div className="grid gap-4">
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="name">Nama Provinsi</Label>
          <Input id="name" name="name" placeholder="Nama Provinsi" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-2" htmlFor="description">Deskripsi</Label>
          <Input id="description" name="description" placeholder="Nama Provinsi" value={form.description} onChange={handleChange} />
        </div>
      </div>
    </ActionModal>
  );
}