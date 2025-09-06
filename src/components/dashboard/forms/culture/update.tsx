"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useCultureStore } from "@/stores/cultureStore";
import { useProvinceStore } from "@/stores/provinceStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { updateCultureRequest } from "@/requests/culture/update";

export default function UpdateCultureForm() {
  const router = useRouter();
  const { id } = useParams();
  const cultureId = Number(id);

  const { selectedCulture, getCultureById } = useCultureStore();
  const { provinces, fetchProvinces } = useProvinceStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [mediaUrl, setMediaUrl] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProvinces();
    fetchCategories();
  }, [fetchProvinces, fetchCategories]);

  useEffect(() => {
    if (cultureId) getCultureById(cultureId);
  }, [cultureId, getCultureById]);

  useEffect(() => {
    if (selectedCulture) {
      setName(selectedCulture.name || "");
      setProvinceId(String(selectedCulture.province_id) || "");
      setCategoryId(String(selectedCulture.category_id) || "");
      setContent(selectedCulture.content || "<p></p>");
      setMediaUrl(selectedCulture.media_url || "");
      setLocation(selectedCulture.location || "");
    }
  }, [selectedCulture]);

  const handleSubmit = async () => {
    if (!name || !provinceId || !categoryId) {
      toast.error("Semua field wajib diisi");
      return;
    }

    setLoading(true);
    const result = await updateCultureRequest({
      id: cultureId,
      name,
      province_id: parseInt(provinceId),
      category_id: parseInt(categoryId),
      content,
      media_url: mediaUrl || null,
      location: location || null,
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard/culture");
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
          <label className="block text-sm font-medium mb-1">Nama Budaya</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama culture"
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
          <label className="block text-sm font-medium mb-1">Media URL</label>
          <Input
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="https://contoh.com/media.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lokasi (Jika Destinasi Budaya)</label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lokasi"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </div>
  );
}
