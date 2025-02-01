// /src/app/org/[orgid]/page.tsx
"use client";

import { useOrg } from "@/context/OrgContext";

export default function Page() {
  const { selectedOrg } = useOrg();

  return (
    <div>
      {selectedOrg?.id}
      {selectedOrg?.name}
      {selectedOrg?.role}
    </div>
  );
}
