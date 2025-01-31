import "next-auth";
import { Membership } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string;
      image: string | null;
      memberships: Array<
        Membership & {
          organisation: Organisation;
          role: Role & {
            permissions: Array<{
              permission: Permission;
            }>;
          };
        }
      >;
    };
  }
}
