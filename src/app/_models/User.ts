import {Role} from './Role';

export class User {
  userid: number;
  firstName: string;
  lastName: string;
  role: Role;
  phNumber: string;
  email: string;
  status: string;
  password: string;

  constructor(phNumber: string, email: string, role: Role) {
    this.phNumber = phNumber;
    this.email = email;
    this.role = role;
  }
}
