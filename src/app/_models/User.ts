import {Role} from './Role';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  phNumber: string;
  email: string;

  constructor(phNumber: string, email: string, role: Role) {
    this.phNumber= phNumber;
    this.email= email;
    this.role= role;
  }
}
