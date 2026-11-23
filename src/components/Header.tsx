import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Download,
  Upload,
  RotateCcw,
  Plus,
  Stethoscope,
  AlertTriangle,
} from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => Promise<boolean>;
  onReset: () => void;
  onAddFolder: () => void;
}

export default function Header({ onExport, onImport, onReset, onAddFolder }: HeaderProps) {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const ok = await onImport(file);
    if (ok) {
      setShowImportDialog(false);
      setImportError(false);
    } else {
      setImportError(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">ENF-Tex</h1>
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" onClick={onAddFolder} className="gap-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Carpeta</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onExport} className="gap-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowImportDialog(true)} className="gap-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Importar</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowResetDialog(true)} className="gap-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50">
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>

      {/* Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              ¿Reiniciar todo?
            </DialogTitle>
            <DialogDescription>
              Se borrarán todas tus carpetas y enlaces personalizados. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>Cancelar</Button>
            <Button
              variant="destructive"
              onClick={() => {
                onReset();
                setShowResetDialog(false);
              }}
            >
              Sí, reiniciar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar configuración</DialogTitle>
            <DialogDescription>
              Selecciona tu archivo JSON de respaldo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            {importError && (
              <p className="text-sm text-red-500">Archivo inválido. Usa un JSON exportado desde esta app.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
