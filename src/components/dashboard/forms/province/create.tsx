"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useProvinceStore } from "@/stores/provinceStore";
import { createProvinceRequest } from "@/requests/province/create";
import { ActionModal } from "@/components/dashboard/dialogs/action-modal";

interface CreateProvinceModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateProvinceModal({ open, onClose }: CreateProvinceModalProps) {
  const { loadingCrud } = useProvinceStore();

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const result = await createProvinceRequest(form);

    if (result.success) {
      toast.success(result.message);
      onClose();
      setForm({ name: "", description: "" }); 
    } else {
      toast.error(result.message);
    }
  };

  return (
    <ActionModal open={open} onClose={onClose} type="create" title="Tambah Provinsi" onSubmit={handleSubmit} loading={loadingCrud}>
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