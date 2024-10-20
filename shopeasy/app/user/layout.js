"use client"
import UserSidebar from "@/components/UserSidebar";
import { useSession} from 'next-auth/react'
import NotLoggedInPage from '@/components/NotLoggedInPage';

export default function Layout({ children }) {
    const { data: session } = useSession();
    
    return (
        <div className="flex gap-2 p-2">
            <UserSidebar/>
            {/* {children} */}
            {!session ? <NotLoggedInPage /> : children}
        </div>
    );
}



