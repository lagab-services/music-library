'use client'
import * as React from "react"
import {useState} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import {useForm} from "react-hook-form"

import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {LoaderCircle} from "lucide-react"
import {useToast} from '@/hooks/use-toast';
import {signIn} from 'next-auth/react';
import Google from '@/components/svg/google';
import {PasswordInput} from '@/components/ui/password-input';
import {userAuthSchema} from '@/lib/validations/auth';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type FormData = z.infer<typeof userAuthSchema>

const UserAuthForm = ({className, ...props}: UserAuthFormProps) => {
    const form = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const {toast} = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)

    const [password, setPassword] = useState("")

    async function onSubmit(data: FormData) {

        setIsLoading(true)
        const signInResult = await signIn('credentials', {
            redirect: false,
            email: data.email.toLowerCase(),
            password: data.password,
        });

        setIsLoading(false)

        if (signInResult?.ok) {
            router.push(redirect)
            return toast({
                description: "You are successfully logged in",
            })

        }

        return toast({
            title: "Something went wrong.",
            description: "Your sign in request failed. Please try again.",
            variant: "destructive",
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email..."
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field}
                                        />
                                    </FormControl>
                                    <FormDescription/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} className="ml-auto w-full" type="submit">
                            {isLoading && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
                </div>
            </div>
            <button
                type="button"
                className={cn(buttonVariants({variant: "outline"}))}
                onClick={() => {
                    setIsGoogleLoading(true)
                    signIn("google", {callbackUrl: redirect})
                }}
                disabled={isLoading || isGoogleLoading}
            >
                {isGoogleLoading ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                    <Google className="mr-2 h-4 w-4"/>
                )}{" "}
                Google
            </button>
        </div>)
};


export default UserAuthForm;