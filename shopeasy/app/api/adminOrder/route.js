import { ObjectId } from "mongodb";
import User from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {

		const searchParams = new URL(req.url).searchParams;
		const id = searchParams.get('id');

		
		await connect();

		const user = await User.findOne({ _id: new ObjectId(id) });

		if (!user) {
			return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
		}

		const orders = user.adminOrderHistory;   

		return NextResponse.json(orders);


	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch Admin orders history' }, { status: 500 });
	}

}