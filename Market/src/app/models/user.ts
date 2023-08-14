import { Role } from "./role";

export interface User {
  _id: string;
  username: string;
  email: string;
  // statusUser: string;
  // statusCompte:string;
  password: string;
  roles: Role[];

}
export class User {
}
