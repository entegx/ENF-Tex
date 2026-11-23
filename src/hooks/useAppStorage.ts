import { useState, useEffect, useCallback } from 'react';
import type { AppData, FolderItem, LinkItem, ProfileType } from '@/types';
import { PROFILES } from '@/data/profiles';

const STORAGE_KEY = 'healthlinks_data';

function loadData(): AppData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppData;
  } catch {
    return null;
  }
}

function saveData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useAppStorage() {
  const [data, setData] = useState<AppData | null>(loadData);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  const initProfile = useCallback((profile: ProfileType) => {
    const folders = JSON.parse(JSON.stringify(PROFILES[profile])) as FolderItem[];
    setData({ folders, profile });
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        folders: prev.folders.map(f =>
          f.id === folderId ? { ...f, isExpanded: !f.isExpanded } : f
        ),
      };
    });
  }, []);

  const addFolder = useCallback((name: string) => {
    setData(prev => {
      if (!prev) return prev;
      const newFolder: FolderItem = {
        id: Math.random().toString(36).substring(2, 10),
        name,
        links: [],
        isExpanded: true,
      };
      return { ...prev, folders: [...prev.folders, newFolder] };
    });
  }, []);

  const editFolder = useCallback((folderId: string, name: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        folders: prev.folders.map(f =>
          f.id === folderId ? { ...f, name } : f
        ),
      };
    });
  }, []);

  const deleteFolder = useCallback((folderId: string) => {
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, folders: prev.folders.filter(f => f.id !== folderId) };
    });
  }, []);

  const moveFolder = useCallback((folderId: string, direction: 'up' | 'down') => {
    setData(prev => {
      if (!prev) return prev;
      const idx = prev.folders.findIndex(f => f.id === folderId);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.folders.length) return prev;
      const copy = [...prev.folders];
      const [item] = copy.splice(idx, 1);
      copy.splice(newIdx, 0, item);
      return { ...prev, folders: copy };
    });
  }, []);

  const addLink = useCallback((folderId: string, link: Omit<LinkItem, 'id'>) => {
    setData(prev => {
      if (!prev) return prev;
      const newLink: LinkItem = { ...link, id: Math.random().toString(36).substring(2, 10) };
      return {
        ...prev,
        folders: prev.folders.map(f =>
          f.id === folderId ? { ...f, links: [...f.links, newLink] } : f
        ),
      };
    });
  }, []);

  const editLink = useCallback((folderId: string, linkId: string, updates: Partial<Omit<LinkItem, 'id'>>) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        folders: prev.folders.map(f =>
          f.id === folderId
            ? {
                ...f,
                links: f.links.map(l =>
                  l.id === linkId ? { ...l, ...updates } : l
                ),
              }
            : f
        ),
      };
    });
  }, []);

  const deleteLink = useCallback((folderId: string, linkId: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        folders: prev.folders.map(f =>
          f.id === folderId
            ? { ...f, links: f.links.filter(l => l.id !== linkId) }
            : f
        ),
      };
    });
  }, []);

  const moveLink = useCallback((folderId: string, linkId: string, direction: 'up' | 'down') => {
    setData(prev => {
      if (!prev) return prev;
      const folder = prev.folders.find(f => f.id === folderId);
      if (!folder) return prev;
      const idx = folder.links.findIndex(l => l.id === linkId);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= folder.links.length) return prev;
      const newLinks = [...folder.links];
      const [item] = newLinks.splice(idx, 1);
      newLinks.splice(newIdx, 0, item);
      return {
        ...prev,
        folders: prev.folders.map(f =>
          f.id === folderId ? { ...f, links: newLinks } : f
        ),
      };
    });
  }, []);

  const exportData = useCallback(() => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthlinks-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string) as AppData;
          if (imported.folders && Array.isArray(imported.folders)) {
            setData(imported);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch {
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(null);
  }, []);

  return {
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
  };
}
