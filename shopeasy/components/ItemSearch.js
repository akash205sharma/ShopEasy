"use client"

import React from 'react'
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
import Link from 'next/link'


const ItemSearch = () => {
  return (


    <NavigationMenu>
      <NavigationMenuList>
        {/* item1 */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Milk And Dairies
              </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pet Food
              </NavigationMenuLink>
            </Link>
            <div onClick={() => { console.log("Touched")}}>
              {/* <Link href="/docs" legacyBehavior passHref> */}
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Clothing
              </NavigationMenuLink>
              {/* </Link> */}

            </div>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Baking material
              </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Fresh Fruits
              </NavigationMenuLink>
            </Link>

          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>


  )
}

export default ItemSearch
