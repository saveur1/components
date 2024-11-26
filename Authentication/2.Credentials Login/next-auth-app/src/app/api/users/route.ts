"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest)=> {

    const users = await db.user.findMany({});

    return NextResponse.json({
        success: true,
        users
    })
}