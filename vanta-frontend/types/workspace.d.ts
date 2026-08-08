export interface Workspace {
  id: string;
  title: string;
  description: string;
  logo: string;
  members: number;
  activeTasks: number;
  admin: boolean;
}
