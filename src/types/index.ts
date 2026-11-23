export interface LinkItem {
  id: string;
  title: string;
  url: string;
  imageUrl?: string;
  description?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  links: LinkItem[];
  isExpanded: boolean;
}

export type ProfileType = 'basic' | 'intermediate' | 'advanced' | 'custom';

export interface AppData {
  folders: FolderItem[];
  profile: ProfileType;
}
