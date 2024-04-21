import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } },
) {
    const { productIds } = await req.json()

    if (!productIds || productIds.length === 0) {
        return new NextResponse("No products provided", { status: 400 })
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    const line_items = Stripe.Checkout.SessionCreateParams.LineItem[]=[]
}