import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/User';

const users: User[] = [];

export const getUsers = (): User[] => users;

export const registerUser = (email: string, password: string, controlNumber?: string, name?: string, companyId: string): User => {
  const user: User = {
    id: uuidv4(),
    email,
    password,
    controlNumber,
    name,
    companyId
  };
  users.push(user);
  return user;
};

export const createCompany = (name: string): Company => {
  const company: Company = {
    id: uuidv4(),
    name,
    documents: [],
    videos: [],
    images: []
  };
  companies.push(company);
  return company;
};
