import {DefaultSession} from "next-auth"
import {AdapterUser} from 'next-auth/src/adapters';

declare module "next-auth" {
    interface User {
        fullName: string
        token: { token: string }
            & AdapterUser
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id?: string | null
            accessToken?: string | null
        } & DefaultSession["user"]
    }


}
declare module 'next-auth/jwt' {
    interface JWT {
        id: string | null
        accessToken: string | null
            & DefaultJWT
    }
}