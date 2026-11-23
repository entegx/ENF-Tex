import { useState } from 'react';
import type { LinkItem } from '@/types';
import { getFaviconUrl, getInitials } from '@/lib/utils';
import { ExternalLink, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface LinkCardProps {
  link: LinkItem;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export default function LinkCard({ link, canMoveUp, canMoveDown, onEdit, onDelete, onMove }: LinkCardProps) {
  const [imgError, setImgError] = useState(false);
  const favicon = getFaviconUrl(link.url);
  const imageSrc = link.imageUrl && !imgError ? link.imageUrl : favicon;
  const initials = getInitials(link.title);

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all duration-200">
      {/* Image area - square-ish */}
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-square bg-slate-50 flex items-center justify-center overflow-hidden"
      >
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={link.title}
            className="w-full h-full object-contain p-4"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
            {initials}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>

      {/* Info area */}
      <div className="p-3 flex-1 flex flex-col">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-semibold text-slate-800 leading-tight hover:text-emerald-700 transition-colors line-clamp-2 mb-0.5"
          title={link.title}
        >
          {link.title}
        </a>
        {link.description && (
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{link.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="px-2 pb-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onMove('up')}
            disabled={!canMoveUp}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Mover arriba"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={!canMoveDown}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Mover abajo"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={onEdit}
            className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
            title="Editar"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
