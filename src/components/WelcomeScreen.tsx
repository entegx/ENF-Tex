import { useState, useRef } from 'react';
import type { ProfileType } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sprout, TreePine, Trees, Upload, Stethoscope } from 'lucide-react';

interface WelcomeScreenProps {
  onSelectProfile: (profile: ProfileType) => void;
  onImport: (file: File) => Promise<boolean>;
}

const profiles: { key: ProfileType; label: string; desc: string; count: string; icon: React.ReactNode; color: string }[] = [
  {
    key: 'basic',
    label: 'Básico',
    desc: 'Lo esencial para empezar. Noticias, newsletters, guías y educación básica.',
    count: '~15 enlaces',
    icon: <Sprout className="w-8 h-8" />,
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 text-emerald-700',
  },
  {
    key: 'intermediate',
    label: 'Intermedio',
    desc: 'Más completo. Incluye revistas científicas, bases de datos y más recursos.',
    count: '~35 enlaces',
    icon: <TreePine className="w-8 h-8" />,
    color: 'bg-teal-50 border-teal-200 hover:border-teal-400 text-teal-700',
  },
  {
    key: 'advanced',
    label: 'Avanzado',
    desc: 'Todo el arsenal. Revistas de elite, vigilancia epidemiológica y recursos especializados.',
    count: '~60+ enlaces',
    icon: <Trees className="w-8 h-8" />,
    color: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400 text-cyan-700',
  },
];

export default function WelcomeScreen({ onSelectProfile, onImport }: WelcomeScreenProps) {
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10 max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mb-6">
          <Stethoscope className="w-9 h-9" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">ENF-Tex</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Tu espacio personal de recursos de salud. Elige un punto de partida y personalízalo a tu medida.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mb-8">
        {profiles.map((p) => (
          <button
            key={p.key}
            onClick={() => onSelectProfile(p.key)}
            className={`text-left rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${p.color}`}
          >
            <div className="mb-4">{p.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{p.label}</h3>
            <p className="text-sm opacity-80 mb-3 leading-snug">{p.desc}</p>
            <span className="text-xs font-medium opacity-60">{p.count}</span>
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => setShowImportDialog(true)}
        className="gap-2 text-slate-600"
      >
        <Upload className="w-4 h-4" />
        Importar configuración previa
      </Button>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar configuración</DialogTitle>
            <DialogDescription>
              Selecciona el archivo JSON de respaldo para restaurar tus enlaces y carpetas.
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
              <p className="text-sm text-red-500">El archivo no es válido. Asegúrate de que sea un JSON exportado desde esta aplicación.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
