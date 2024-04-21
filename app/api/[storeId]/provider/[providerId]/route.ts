import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { providerId: string } }
) {
  try {
    if (!params.providerId) {
      return new NextResponse("Provider id is required", { status: 400 });
    }

    const provider = await prismadb.provider.findUnique({
      where: {
        id: params.providerId
      }
    });
  
    return NextResponse.json(provider);
  } catch (error) {
    console.log('[PROVIDER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { providerId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.providerId) {
      return new NextResponse("Provider id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const provider = await prismadb.provider.delete({
      where: {
        id: params.providerId
      }
    });
  
    return NextResponse.json(provider);
  } catch (error) {
    console.log('[PROVIDER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { providerId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }


    if (!params.providerId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const provider = await prismadb.provider.update({
      where: {
        id: params.providerId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(provider);
  } catch (error) {
    console.log('[PROVIDER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};