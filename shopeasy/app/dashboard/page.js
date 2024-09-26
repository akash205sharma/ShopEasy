"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
const page = () => {
    const { data: session } = useSession();

    return (
        <div>
            {session ?(<>
                <div>Name  {session.user.name}</div>
                <div>Email {session.user.email }</div>
                <div onClick={() => { signOut()}} >Sign Out</div>
            </>
            ):(
                <div>Not Found</div>
            )}
        </div>
    )
}

export default page
