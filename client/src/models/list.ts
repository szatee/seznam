import { IItem } from './item';

export interface IList {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  items?: IItem[];
}
