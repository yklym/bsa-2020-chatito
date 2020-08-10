import { IWorkspaceResponse } from '../workspace/IWorkspaceResponse';

export interface IUserWithWorkspaces {
  id: string;
  fullName: string;
  email: string;
  displayName: string;
  imageUrl: string;
  title: string;
  workspaces: IWorkspaceResponse[];
}
