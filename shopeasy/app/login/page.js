"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Page = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const { data: session } = useSession()  //important thing

    if (session) {
        // shfit to dashboard directly
        router.push('/');
    }
    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/");
        }

    }, [session, router])


    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!isValidEmail(email)) {
            console.log("email", email);

            setError("Not Valid Email");
            return;
        }
        if (!password || password.length < 8) {
            setError("Password is not valid");
            return;
        }

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

    }

    // Otherwise show login page
    return (
        <div className='bg-banner bg-contain h-[calc(100vh-120px)] w-[100vw]  ' >

            <div className=' z-50 pt-8 pl-9 pr-9 h-[75vh] w-[30vw]   flex flex-col gap-4 m-auto absolute top-[55vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md rounded-xl shadow-lg transition-all duration-300 hover:bg-white/40 hover:backdrop-blur-lg hover:shadow-2xl 
              ring-1 ring-white/20 hover:ring-white/40 ring-offset-4 ring-offset-transparent'>
                <Link href={"/"}><button className=' absolute top-5 right-6 transform hover:scale-110  transition-all duration-300 rounded-full w-6 text-[15px]' > <img src="/left-arrow.png" alt="" /> </button> </Link>
                <h1 className='text-2xl font-sans font-bold'>Sign in To Your Account</h1>
                <h6 className='text-sm'> Don&apos;t have an account? <Link className='text-blue-500 hover:underline' href="/signup">Sign up.</Link></h6>

                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <div className='text-[15px] flex flex-col gap-3'>
                        <div className=' flex flex-col gap-1'>
                            <label htmlFor="Email">Email:</label>
                            <input className='focus-visible:border-blue-500 bg-[#b5e4b7a1] placeholder:text-black/40 p-3 align-middle rounded-md border active:border-blue-700' type="text" name='Email' placeholder='Buy@samosa.com' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="Password">Password:</label>
                            <input className='bg-[#b5e4b7a1] p-3 align-middle rounded-md border placeholder:text-black/40 active:border-blue-700 ' type="Password" name='Password' placeholder='Enter your password' />
                        </div>
                    </div>

                    {/* <span className='flex items-center gap-7 text-gray-500'>
                        <span className='border border-gray-500 w-48 h-0 text-center'></span>  or <span className='border border-gray-500 w-48 h-0 text-center'></span>
                    </span> */}
                     <button type='submit' className=' text-white  active:bg-blue-500 bg-green-500 w-[25vw] mt-3 p-3 text-center rounded-xl  font-bold transition-all duration-300 ease-in-out transform hover:bg-green-600  hover:shadow-lg relative left-0.5'>Sign in to your account?</button>
                    <div className="flex justify-between text-sm text-gray-300 ">
                        <span className='pt-4 pl-2'> <a className='hover:underline text-green-500' href="">Forgot password?</a></span>
                        <span className='pt-4 pr-2 text-green-500'><input className='text-green-500 fill-green-500 pt-4' type="checkbox" /> &nbsp; Remember me </span>
                    </div>
                   
                <div className='flex flex-col items-center justify-center mt-7'>
                    
                        <p className='text-black/70 font-serif text-sm'>or you can Sign In with</p>
                    <div className="flex gap-5 justify-center mt-4 items-center ">
                        
                        <button className=' transition-all duration-300 ease-in-out transform hover: hover:scale-110'><img  width={30} src="/google.png" alt="" /></button>
                        <button className=' transition-all duration-300 ease-in-out transform hover: hover:scale-110'><img width={30} src="/facebook.png" alt="" /></button>
                        <button className=' transition-all duration-300 ease-in-out transform hover: hover:scale-110'><img width={30} src="/linkedin.png" alt="" /></button>
                        {/* <button className=' transition-all duration-300 ease-in-out transform hover: hover:scale-110'><img className='bg-white rounded-full' width={30} src="/apple.png" alt="" /></button> */}
                        <button  className=' transition-all duration-300 ease-in-out transform hover: hover:scale-110'onClick={() => { signIn("github") }} ><img width={30} src="/github.png" alt="" /></button>
                        {/* <button className=' transition-all duration-300 ease-in-out transform hover: hover:scale-110'><img width={30} src="/twitter.png" alt="" /></button> */}
                    </div>
                </div>


                 
                    <p className='text-red-500 mt-5' >{error && error}</p>
                </form>
            </div>
        </div>
    )
}

export default Page



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