import { useState, useEffect } from 'react';
import type { LinkItem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getFaviconUrl } from '@/lib/utils';
import { Link2, ImagePlus } from 'lucide-react';

interface LinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderName: string;
  initialData?: LinkItem | null;
  onSave: (data: { title: string; url: string; description: string; imageUrl: string }) => void;
}

export default function LinkModal({ open, onOpenChange, folderName, initialData, onSave }: LinkModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.title);
        setUrl(initialData.url);
        setDescription(initialData.description || '');
        setImageUrl(initialData.imageUrl || '');
      } else {
        setTitle('');
        setUrl('');
        setDescription('');
        setImageUrl('');
      }
      setError('');
    }
  }, [open, initialData]);

  const handleSave = () => {
    if (!title.trim() || !url.trim()) {
      setError('El título y la URL son obligatorios.');
      return;
    }
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }
    onSave({
      title: title.trim(),
      url: finalUrl,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    });
    onOpenChange(false);
  };

  const previewImage = imageUrl || getFaviconUrl(url);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-emerald-600" />
            {initialData ? 'Editar enlace' : 'Añadir enlace'}
            <span className="text-sm font-normal text-slate-400">— {folderName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="link-title">Título *</Label>
            <Input
              id="link-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Medscape"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="link-url">URL *</Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="link-desc">Descripción</Label>
            <Textarea
              id="link-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción del portal..."
              rows={2}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="link-img" className="flex items-center gap-1.5">
              <ImagePlus className="w-3.5 h-3.5" />
              URL de imagen (opcional)
            </Label>
            <Input
              id="link-img"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://ejemplo.com/logo.png"
            />
            <p className="text-xs text-slate-400">Si no pones nada, se usará el favicon del sitio automáticamente.</p>
          </div>

          {previewImage && url && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <img
                src={previewImage}
                alt="preview"
                className="w-10 h-10 object-contain rounded bg-white border border-slate-200"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-xs text-slate-500">Vista previa</span>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
            {initialData ? 'Guardar cambios' : 'Añadir enlace'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
