"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useVirtualMuseumItemStore } from "@/stores/virtualMuseumItemStore";
import { useProvinceStore } from "@/stores/provinceStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { updateVirtualMuseumItemRequest } from "@/requests/virtual-museum-item/update";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateVirtualMuseumItemForm() {
  const router = useRouter();
  const { id } = useParams();
  const itemId = Number(id);

  const { selectedItem, getItemById } = useVirtualMuseumItemStore();
  const { provinces, fetchProvinces } = useProvinceStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [media3dUrl, setMedia3dUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvinces();
    fetchCategories();
  }, [fetchProvinces, fetchCategories]);

  useEffect(() => {
    if (itemId) getItemById(itemId);
  }, [itemId, getItemById]);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name || "");
      setDescription(selectedItem.description || "");
      setProvinceId(String(selectedItem.province_id) || "");
      setCategoryId(String(selectedItem.category_id) || "");
      setContent(selectedItem.content || "<p></p>");
      setMedia3dUrl(selectedItem.media_3d_url || "");
    }
  }, [selectedItem]);

  const handleSubmit = async () => {
    if (!name || !provinceId || !categoryId) {
      toast.error("Semua field wajib diisi");
      return;
    }

    setLoading(true);
    const result = await updateVirtualMuseumItemRequest({
      id: itemId,
      name,
      description: description || null,
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
        <div>
          <label className="block text-sm font-medium mb-1">Nama Item</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama item virtual museum"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi singkat item virtual museum"
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Provinsi</label>
          <Select value={provinceId} onValueChange={setProvinceId}>
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

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <Select value={categoryId} onValueChange={setCategoryId}>
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Konten</label>
          <div className="border rounded">
            <SimpleEditor value={content} onChange={setContent} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Media 3D URL</label>
          <Input
            value={media3dUrl}
            onChange={(e) => setMedia3dUrl(e.target.value)}
            placeholder="https://contoh.com/model.glb"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </div>
  );
}
