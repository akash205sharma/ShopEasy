"use client"
import { useSession} from 'next-auth/react'
import NotLoggedInPage from '@/components/NotLoggedInPage';
import AdminSidebar from "@/components/AdminSidebar";

export default function Layout({ children }) {
    const { data: session } = useSession();
    
    return (
        <div className="flex gap-2 p-2">
            <AdminSidebar/>
            {!session ? <NotLoggedInPage /> : children}
        </div>
    );
}

