import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ProviderColumn } from "./components/columns"
import { ProvidersClient } from "./components/client";

const ProvidersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const providers = await prismadb.provider.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: ProviderColumn[] = providers.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProvidersClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default ProvidersPage;