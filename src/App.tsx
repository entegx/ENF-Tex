import { useState } from 'react';
import { useAppStorage } from '@/hooks/useAppStorage';
import WelcomeScreen from '@/components/WelcomeScreen';
import Header from '@/components/Header';
import FolderSection from '@/components/FolderSection';
import FolderModal from '@/components/FolderModal';
import type { ProfileType } from '@/types';

export default function App() {
  const {
    data,
    initProfile,
    toggleFolder,
    addFolder,
    editFolder,
    deleteFolder,
    moveFolder,
    addLink,
    editLink,
    deleteLink,
    moveLink,
    exportData,
    importData,
    resetData,
  } = useAppStorage();

  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);

  const handleSelectProfile = (profile: ProfileType) => {
    initProfile(profile);
  };

  const handleAddFolder = () => {
    setEditingFolderId(null);
    setFolderModalOpen(true);
  };

  const handleEditFolder = (folderId: string) => {
    setEditingFolderId(folderId);
    setFolderModalOpen(true);
  };

  const handleSaveFolder = (name: string) => {
    if (editingFolderId) {
      editFolder(editingFolderId, name);
    } else {
      addFolder(name);
    }
    setEditingFolderId(null);
  };

  if (!data) {
    return (
      <WelcomeScreen
        onSelectProfile={handleSelectProfile}
        onImport={importData}
      />
    );
  }

  const editingFolderName = editingFolderId
    ? data.folders.find((f) => f.id === editingFolderId)?.name || ''
    : '';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header
        onExport={exportData}
        onImport={importData}
        onReset={resetData}
        onAddFolder={handleAddFolder}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-4">
        {data.folders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-4">No tienes carpetas aún.</p>
            <button
              onClick={handleAddFolder}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Crear primera carpeta
            </button>
          </div>
        ) : (
          data.folders.map((folder, idx) => (
            <FolderSection
              key={folder.id}
              folder={folder}
              canMoveUp={idx > 0}
              canMoveDown={idx < data.folders.length - 1}
              onToggle={() => toggleFolder(folder.id)}
              onEdit={() => handleEditFolder(folder.id)}
              onDelete={() => deleteFolder(folder.id)}
              onMove={(dir) => moveFolder(folder.id, dir)}
              onAddLink={(linkData) => addLink(folder.id, linkData)}
              onEditLink={(linkId, linkData) => editLink(folder.id, linkId, linkData)}
              onDeleteLink={(linkId) => deleteLink(folder.id, linkId)}
              onMoveLink={(linkId, dir) => moveLink(folder.id, linkId, dir)}
            />
          ))
        )}
      </main>

      <footer className="py-6 text-center text-xs text-slate-400">
        <p>Soli Deo Gloria</p>
        <p className="mt-1">ENF-Tex — Espacio de Formación</p>
      </footer>

      <FolderModal
        open={folderModalOpen}
        onOpenChange={(open) => {
          setFolderModalOpen(open);
          if (!open) setEditingFolderId(null);
        }}
        initialName={editingFolderName}
        onSave={handleSaveFolder}
      />
    </div>
  );
}
