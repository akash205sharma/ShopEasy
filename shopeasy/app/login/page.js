"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const page = () => {

    const { data: session } = useSession()  //important thing

    if (session) {
        // shfit to dashboard directly

        const router = useRouter()
        router.push('/') 
    }

    // Otherwise show login page

    return (
        <div className='bg-banner bg-contain h-[calc(100vh-120px)] w-[100vw]  ' >

            <div className=' z-50 p-8 h-[70vh] w-[550px] border border-green-400 bg-[#fdfeff] flex flex-col gap-4 m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Link href={"/"}><button className=' absolute top-7 right-7 border border-black rounded-full w-6 text-[15px]' > <img src="/left-arrow.png" alt="" /> </button> </Link>
                <h1 className='text-2xl font-sans font-bold'>Sign in To Your Account</h1>
                <h6 className='text-sm'>Open Your Account in seconds. Don't have an account? <a className='text-blue-500 hover:underline' href="">Sign up.</a></h6>
                <div className='text-[15px] flex gap-3'>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="Email">Email</label>
                        <input className='focus-visible:border-blue-500 bg-[#b5e4b7a1]  p-3 align-middle rounded-lg border active:border-blue-700' type="text" name='Email' id='Email' placeholder='Buy@samosa.com' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="Password">Password</label>
                        <input className='bg-[#b5e4b7a1] p-3 align-middle rounded-lg border active:border-blue-700' type="Password" name='Password' id='Password' placeholder='••••••••' />
                    </div>
                </div>

                <span className='flex items-center gap-7 text-gray-500'>
                    <span className='border border-gray-500 w-48 h-0 text-center'></span>  or <span className='border border-gray-500 w-48 h-0 text-center'></span>
                </span>
                <button className="hover:bg-green-500 hover:text-white active:bg-green-400 active:font-bold border text-black  border-black p-2.5 rounded-md justify-center flex gap-2"><img width={21} src="/google.png" alt="" />Sign in with Google</button>
                <div className="flex gap-2 justify-center m-2">
                    <button><img width={30} src="/facebook.png" alt="" /></button>
                    <button><img width={30} src="/linkedin.png" alt="" /></button>
                    <button ><img className='bg-white rounded-full' width={30} src="/apple.png" alt="" /></button>
                    <button onClick={() => { signIn("github") }} ><img width={30} src="/github.png" alt="" /></button>
                    <button><img width={30} src="/twitter.png" alt="" /></button>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                    <span className='text-green-500'><input className='text-green-500 fill-green-500' type="checkbox" /> &nbsp; Remember me </span>
                    <span> <a className='hover:underline text-green-500' href="">Forgot password?</a></span>
                </div>
                <button className='hover:border border-black text-white hover:bg-green-600 active:bg-green-500 bg-green-500 p-3 text-center rounded-md font-bold'>Sign in to your account?</button>
            </div>
        </div>
    )
}

export default page



/*
Login steps
1. npm i next-auth
2. make  /components/SessionWrapper.js Use client
3. Wrap the body in layout by using sessionWraper
4. "use client" import { useSession ,signIn,signOut } from 'next-auth/react' in login page and navbar {where we need to know authentiction}
    const { data: session }= useSession()
    if (session) {
        return (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
      }
5. Make github Oauth application and put GITHUB_ID AND GITHUB_SECRET into .env.local file
6. Make app/api/auth/[...nextauth]/route.js

                           <- Signed ->


*/