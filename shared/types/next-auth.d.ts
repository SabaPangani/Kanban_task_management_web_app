import { DefaultUser } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: AdapterUser & {
      id?: string;
      name: string;
      email: string;
    };
  }
  interface User extends DefaultUser {
    id?: string;
    name: string;
    email: string;
  }
}

