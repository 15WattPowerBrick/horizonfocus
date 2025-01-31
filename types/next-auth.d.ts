import { Session } from "next-auth";

type Organisation = {
  id: string;
  name: string;
};

type Permission = string;

type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

type Membership = {
  organisation: Organisation;
  role: Role;
};

export type ExtendedUser = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  image?: string | null;
  memberships: Membership[];
};

export type ExtendedSession = Session & {
  user: ExtendedUser;
};
