import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "@/models/user";
import { signOut } from "next-auth/react";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";


// export async function GET(request) {}

// export async function HEAD(request) {}

// export async function POST(request) {}

// export async function PUT(request) {}

// export async function DELETE(request) {}

// export async function PATCH(request) {}

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request) {}


//github sign In
export const authOptions = NextAuth({
    // Configure one or more authentication providers
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connect();
                console.log(credentials.email, credentials.password);

                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        )
                        if (isPasswordCorrect) {
                            console.log("password sahi hai");
                            return user;
                        }
                        else {
                            console.log("password galt hai");
                            return false;
                        }
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            }

        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
            // authorization:{
            //   params:{
            //     scope: 'user:email' //Ensure correct scope is requested
            //   }
            // }
        }),
        // ...add more providers here
    ],

    callbacks: {
        async signIn({ user, account }) {

            if (account?.provider == "credentials") {
                return true;
            }
            if (account?.provider == "github") {
                console.log("Connecting to the database");
                
                await connect()
                console.log("Connected to the database");
                // check if user exist in database
                try {
                    const currentUser = await User.findOne({ email: user.email })

                    // console.log("currentUser");

                    if (!currentUser) {
                        const dummypassword= "";
                        const hashedpassword = await bcrypt.hash(dummypassword , 5);
                        const newUser = new User({
                            email: user.email,
                            name:user.name,
                            password:hashedpassword,
                            isOAuthUser: "true",
                            profilepic: user.image,
                            // username: user.email.split("@")[0],
                        });
                        // user.name = newUser.username
                        // console.log(newUser)
                        await newUser.save();
                        return true;
                    }
                    return true;
                } catch (error) {
                    console.log("Error in saving user", error);
                    return false;
                }
            }

        },

        //     async session({ session, User, token }) {
        //         // const dbUser = await User.findOne({ email: session.user.email });
        //         // session.user.name = dbUser.name;
        //         return session;
        //     }

    },


})

//56:58 sigma video 
export { authOptions as GET, authOptions as POST }