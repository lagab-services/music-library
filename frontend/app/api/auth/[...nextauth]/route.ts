import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {label: "email", type: "text", placeholder: "john.doe@example.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // Communiquer avec l'API AdonisJS pour vérifier les informations d'identification
                const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })

                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            },
        })
    ],
    session: {
        strategy: 'jwt', // Utilisation de JWT pour la gestion des sessions

    },
    jwt: {
        maxAge: 60 * 60,
    },
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {

            if (account !== null && account.provider === 'google') {
                try {
                    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/google', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            accessToken: account.access_token,
                        }),
                    })
                    const data = await res.json()
                    if (res.ok) {
                        user.name = data.user.fullName
                        user.token = {token: data.token.token}
                        return true
                    } else {
                        console.error('Error registering user in the backend:', data)
                        return false
                    }
                } catch (error) {
                    console.error('Error during session callback', error)
                    return false;
                }
            }
            return true;
        },
        // Callback JWT to manipulate token
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.fullName || user.name; // Handle name variations
                token.email = user.email;
                token.accessToken = user.token?.token; // Save access token
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.accessToken = token.accessToken; // Include backend access token
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}