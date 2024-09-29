import User from "@/models/user";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


// Email password sign create new user
export const POST = async (request) => {

    try {
        const { email, password } = await request.json();
        await connect();

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return new NextResponse("Email is Already in use", { status: 400 });
        }

        //else

        //encode password
        const hashedpassword = await bcrypt.hash(password, 5);
        // const hashedpassword = encodeBase64( password , 5 )

        //create new user
        const newUser = new User({
            email,
            password: hashedpassword,
        })

        await newUser.save();
        return new NextResponse("User is registerd successsfully", { status: 200 })
    }

    catch (error) {
        // console.error("Registration error:", error.message); 
        console.log("Registration error:", error.message);

        return new NextResponse(`Internal Server Error: ${error.message}`, {
            status: 500,
        });

    }

}
