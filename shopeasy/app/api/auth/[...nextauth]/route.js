import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import User from "@/models/user";
import { signOut } from "next-auth/react";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";

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
    
    secret: process.env.NEXTAUTH_SECRET,

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
                        const dummypassword = "";
                        const hashedpassword = await bcrypt.hash(dummypassword, 5);
                        const newUser = new User({
                            email: user.email,
                            name: user.name,
                            password: hashedpassword,
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
        // now session will return all the variables of that session
        async session({ session }) {
            await connect();
            const dbUser = await User.findOne({ email: session.user.email });
            session.user.id = dbUser.id
            session.user.email = dbUser.email
            session.user.name = dbUser.name
            session.user.profilepic = dbUser.profilepic
            session.user.username = dbUser.username
            session.user.phone = dbUser.phone
            session.user.address = dbUser.address
            session.user.dateOfBirth = dbUser.dateOfBirth
            session.user.isAdmin = dbUser.isAdmin
            // session.user = dbUser;     // it will return whole user profile
            return session;
        }

    },


})

//56:58 sigma video 
export { authOptions as GET, authOptions as POST }

