import prismadb from "@/lib/prismadb";
import { ProviderForm } from "./components/size-form";

const ProviderPage = async ({
    params
}: {
    params: { providerId: string }
}) => {
    const size = await prismadb.provider.findUnique({
        where: {
            id: params.providerId
        }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProviderForm initialData={size} />
            </div>
        </div>
    );
}
 
export default ProviderPage;