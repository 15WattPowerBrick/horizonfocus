// /src/app/org/[orgid]/page.tsx
"use client";

import { useOrg } from "@/context/OrgContext";

export default function Page() {
  const { selectedOrg } = useOrg();

  //   const fetchClients = async () => {
  //     if (!selectedOrg) return;

  //     const clients = await prisma.client.findMany({
  //       where: {
  //         organisationId: selectedOrg.id,
  //       },
  //     });
  //     console.log(clients);
  //   };

  return (
    <div>
      {selectedOrg?.id}
      {selectedOrg?.name}
      {selectedOrg?.role}
    </div>
  );
}
