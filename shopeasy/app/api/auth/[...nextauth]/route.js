import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose";
// import User from "@/models/User";
// import Payment from "@/models/Payment";
import { signOut } from "next-auth/react";
// export async function GET(request) {}

// export async function HEAD(request) {}

// export async function POST(request) {}

// export async function PUT(request) {}

// export async function DELETE(request) {}

// export async function PATCH(request) {}

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request) {}



export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // authorization:{
      //   params:{
      //     scope: 'user:email' //Ensure correct scope is requested
      //   }
      // }
    }),
    // ...add more providers here
  ],

  // callbacks: {


  //   async signIn({ user, account, profile, email, credentials }) {
  //     try {
  //       if (account.provider === "github") {
  //         // connect to the database
  //         const User = await mongoose.connect("mongodb://localhost:3000/ShopEasy/user");
  //         // check if user exist in database
  //         const currentUser = await user.findOne({ email: email })
  //         console.log(user);

  //         if (!currentUser) {
  //           const newUser = await User.create({
  //             email: user.email,
  //             username: user.email.split("@")[0],
  //           })
  //           user.name = newUser.username
  //           console.log(newUser)
  //         }
  
  //         else {
  //           user.name = currentUser.username
  //         }
  //         return true;
  //       }
  //       else {
  //         console.log("unable to connect to github")
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
      
  //   },

  //   async session({ session, User, token }) {
  //     // const dbUser = await User.findOne({ email: session.user.email });
  //     // session.user.name = dbUser.name;
  //     return session;
  //   }

  // },

})

//56:58 sigma video 
export { authOptions as GET, authOptions as POST }