import { useState } from 'react';
import type { FolderItem } from '@/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import LinkCard from './LinkCard';
import LinkModal from './LinkModal';
import {
  Folder,
  ChevronDown,
  Pencil,
  Trash2,
  ChevronUp,
  Plus,
} from 'lucide-react';

interface FolderSectionProps {
  folder: FolderItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  onAddLink: (data: { title: string; url: string; description: string; imageUrl: string }) => void;
  onEditLink: (linkId: string, data: { title: string; url: string; description: string; imageUrl: string }) => void;
  onDeleteLink: (linkId: string) => void;
  onMoveLink: (linkId: string, direction: 'up' | 'down') => void;
}

export default function FolderSection({
  folder,
  canMoveUp,
  canMoveDown,
  onToggle,
  onEdit,
  onDelete,
  onMove,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onMoveLink,
}: FolderSectionProps) {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);

  const handleEditLink = (linkId: string) => {
    setEditingLink(linkId);
    setLinkModalOpen(true);
  };

  const handleSaveLink = (data: { title: string; url: string; description: string; imageUrl: string }) => {
    if (editingLink) {
      onEditLink(editingLink, data);
      setEditingLink(null);
    } else {
      onAddLink(data);
    }
  };

  const editingLinkData = editingLink
    ? folder.links.find((l) => l.id === editingLink) || null
    : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <Collapsible open={folder.isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left group">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Folder className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">{folder.name}</h3>
              <p className="text-xs text-slate-400">{folder.links.length} enlace{folder.links.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); onMove('up'); }}
                disabled={!canMoveUp}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Mover arriba"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onMove('down'); }}
                disabled={!canMoveDown}
                className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Mover abajo"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600"
                title="Editar nombre"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500"
                title="Eliminar carpeta"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${folder.isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-1">
            {folder.links.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                <p>Esta carpeta está vacía.</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLinkModalOpen(true)}
                  className="mt-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Añadir el primer enlace
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {folder.links.map((link, idx) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < folder.links.length - 1}
                      onEdit={() => handleEditLink(link.id)}
                      onDelete={() => onDeleteLink(link.id)}
                      onMove={(dir) => onMoveLink(link.id, dir)}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLinkModalOpen(true)}
                    className="gap-1.5 text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                  >
                    <Plus className="w-4 h-4" />
                    Añadir enlace
                  </Button>
                </div>
              </>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <LinkModal
        open={linkModalOpen}
        onOpenChange={(open) => {
          setLinkModalOpen(open);
          if (!open) setEditingLink(null);
        }}
        folderName={folder.name}
        initialData={editingLinkData}
        onSave={handleSaveLink}
      />
    </div>
  );
}
