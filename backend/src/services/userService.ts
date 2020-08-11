import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import { IUserClient } from '../common/models/user/IUserClient';
import { fromUserToUserClient, fromUserToUserWithWorkspaces } from '../common/mappers/user';
import { IEditStatus } from '../common/models/user/IEditStatus';

export const getUsers = async () => {
  const users = await getCustomRepository(UserRepository).getAll();
  const clientUsers = users.map(user => fromUserToUserClient(user));
  return clientUsers;
};

export const getUserById = async (id: string) => {
  const user = await getCustomRepository(UserRepository).getById(id);
  return fromUserToUserWithWorkspaces(user);
};

export const deleteUser = async (id: string): Promise<void> => {
  await getCustomRepository(UserRepository).deleteUser(id);
};

export const editProfile = async (user: IUserClient) => {
  const editUser = await getCustomRepository(UserRepository).editUser(user.id, user);
  return fromUserToUserClient(editUser);
};

export const editStatus = async ({ id, status }: IEditStatus) => {
  const newStatus = await getCustomRepository(UserRepository).editStatus(id, status);
  return newStatus;
};
