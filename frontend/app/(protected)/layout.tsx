'use client'
import {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    const {data: session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            // redirect to login page if user are not authenticated
            router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
        }
    }, [status, router])

    if (status === 'authenticated') {
        // if user authenticated we show the content  Si l'utilisateur est authentifié, afficher le contenu
        return <>{children}</>
    }

    // return null if user are not authenticated
    return null
};

export default ProtectedLayout;