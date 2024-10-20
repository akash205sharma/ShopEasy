"use client"

import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { useSession, signIn, signOut } from 'next-auth/react'

const Myaccount = () => {
  const { data: session } = useSession()
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {session ? (<>
                {/* <div>Name  {session.user.name}</div> */}
                <div><img width={30} height={30} src={session.user.profilepic} alt="" />{session.user.name}</div>
              </>
              ) : (
                <div className='flex w-[110px] p-[-30px] h-[30px] align-bottom items-end ' >

                  {/* <Link href={"/login"} className='flex' > </Link> */}
                  <img src="user.svg" alt="" /> Account
                </div>
              )}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className='w-[125px]'>
                    My wishlist
                  </div>
                </NavigationMenuLink>
              </Link>
              {session && (<>
                <Link href={"/user/edit_profile"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <div className='w-[125px]'>
                      Update Profile
                    </div>
                  </NavigationMenuLink>
                </Link>
                <Link href={"/user/profile"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <div className='w-[125px]'>
                      Your Account
                    </div>
                  </NavigationMenuLink>
                </Link>
                <Link href={"/user/orders"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <div className='w-[125px]'>
                      Your Orders
                    </div>
                  </NavigationMenuLink>
                </Link>
              </>
              )}

              {session ? (
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div onClick={() => { signOut() }} className='w-[125px]' >Sign Out</div>
                </NavigationMenuLink>
              ) : (<>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Link className='w-[125px]' href={"/login"} >Login</Link>
                </NavigationMenuLink>
                <Link href={"/signup"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <div className='w-[125px]'>
                      Sign Up
                    </div>
                  </NavigationMenuLink>
                </Link>
              </>

              )}

            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Myaccount
