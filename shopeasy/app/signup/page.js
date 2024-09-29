"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const page = () => {
    const [error, setError] = useState("")
    const { data: session } = useSession()  //important thing
    const router = useRouter()

    if (session) {
        // shfit to dashboard directly
        router.push('/');
    }


    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!isValidEmail(email)) {
            setError("Not Valid Email");
            return;
        }
        if (!password || password.length < 8) {
            setError("Password is not valid");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            // console.log(res);

            if (res.status === 400) {

//login in sign up page

                const res = await signIn("credentials", {
                    redirect: false,
                    email,
                    password
                })

                if (res?.error) {
                    setError("Invalid User Name or Password");
                    console.log(res.error);

                    if (res?.url) router.push("/");
                }
                else {
                    setError("");
                }

//login in sign up page


                // setError("This email is already registered");

            }
            else if (res.status === 200) {
                console.log("User is Registerd successfully");
                setError("");
                router.push("/")
            }

        } catch (error) {
            setError("Error , Try again ")
            console.log(error.message);
        }

    }


    // Otherwise show login page
    return (
        <div className='bg-banner bg-contain h-[calc(100vh-120px)] w-[100vw]  ' >

            <div className=' z-50 p-8 h-[70vh] w-[550px] border border-green-400 bg-[#fdfeff] flex flex-col gap-4 m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Link href={"/"}><button className=' absolute top-7 right-7 border border-black rounded-full w-6 text-[15px]' > <img src="/left-arrow.png" alt="" /> </button> </Link>
                <h1 className='text-2xl font-sans font-bold'>Create New Account</h1>
                <h6 className='text-sm'>Open Your Account in seconds. Already have an account? <Link className='text-blue-500 hover:underline' href="/login">Log in</Link></h6>
                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <div className='text-[15px] flex gap-3'>
                        <div className=' flex flex-col gap-1'>
                            <label htmlFor="Email">Email</label>
                            <input className='focus-visible:border-blue-500 bg-[#b5e4b7a1]  p-3 align-middle rounded-lg border active:border-blue-700' type="text" name='Email' placeholder='Buy@samosa.com' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="Password">Password</label>
                            <input className='bg-[#b5e4b7a1] p-3 align-middle rounded-lg border active:border-blue-700' type="Password" name='Password' placeholder='••••••••' />
                        </div>
                    </div>

                    <span className='flex items-center gap-7 text-gray-500'>
                        <span className='border border-gray-500 w-48 h-0 text-center'></span>  or <span className='border border-gray-500 w-48 h-0 text-center'></span>
                    </span>
                    <button className="hover:bg-green-500 hover:text-white active:bg-green-400 active:font-bold border text-black  border-black p-2.5 rounded-md justify-center flex gap-2"><img width={21} src="/google.png" alt="" />Sign Up with Google</button>
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
                    <button type='submit' className='hover:border border-black text-white hover:bg-green-600 active:bg-green-500 bg-green-500 p-3 text-center rounded-md font-bold'>Sign up to your account?</button>
                    <p className='text-red-500' >{error && error}</p>
                </form>
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