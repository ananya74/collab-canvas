"use client";

import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { EmptyOrg } from "./_components/empty-org";
import BoardList from "./_components/board-list";

const DashboardPage = () => {
  
  


  const { organization } = useOrganization();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const favorites = searchParams.get("favorites") || "";


  return (
    <div className="flex-1 h-[calc(100%-80px)]">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={{
            search,
            favorites,
          }}
        />
      )}
    </div>
  );
};

export default DashboardPage;
