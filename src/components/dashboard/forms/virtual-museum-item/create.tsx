"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createVirtualMuseumItemRequest } from "@/requests/virtual-museum-item/create";
import { useProvinceStore } from "@/stores/provinceStore";
import { useCategoryStore } from "@/stores/categoryStore";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateVirtualMuseumItemForm() {
  const router = useRouter();

  const { provinces, fetchProvinces } = useProvinceStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [provinceId, setProvinceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [media3dUrl, setMedia3dUrl] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvinces();
    fetchCategories();
  }, [fetchProvinces, fetchCategories]);

  const handleSubmit = async () => {
    setLoading(true);

    const result = await createVirtualMuseumItemRequest({
      name,
      province_id: parseInt(provinceId),
      category_id: parseInt(categoryId),
      content,
      media_3d_url: media3dUrl || null,
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard/virtual-museum-item");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Pilih Provinsi */}
        <div>
          <label className="block text-sm font-medium mb-1">Pilih Provinsi</label>
          <Select value={provinceId} onValueChange={(val) => setProvinceId(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((prov) => (
                <SelectItem key={prov.id} value={String(prov.id)}>
                  {prov.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pilih Kategori */}
        <div>
          <label className="block text-sm font-medium mb-1">Pilih Kategori</label>
          <Select value={categoryId} onValueChange={(val) => setCategoryId(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.category_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Nama Item */}
        <div>
          <label className="block text-sm font-medium mb-1">Nama Item</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama item virtual museum"
          />
        </div>

        {/* Konten (SimpleEditor) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Konten</label>
          <div className="border rounded">
            <SimpleEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Media 3D URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Media 3D URL</label>
          <Input
            type="url"
            value={media3dUrl}
            onChange={(e) => setMedia3dUrl(e.target.value)}
            placeholder="https://example.com/model.glb"
          />
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Item"}
        </Button>
      </form>
    </div>
  );
}
