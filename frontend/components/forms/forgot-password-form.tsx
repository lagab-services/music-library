'use client'
import React, {useState} from 'react';
import {cn} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {LoaderCircle} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useToast} from '@/hooks/use-toast';


const formSchema = z.object({
    email: z.string().email({message: 'Enter a valid email address'})
});

type ForgotPasswordFormValue = z.infer<typeof formSchema>;

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

const ForgotPasswordForm = ({className, ...props}: ForgotPasswordFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<ForgotPasswordFormValue>({
        resolver: zodResolver(formSchema),
    });
    const {toast} = useToast()
    const onSubmit = async (data: ForgotPasswordFormValue) => {
        setIsLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: data.email}),
        })

        setIsLoading(false)
        if (response.ok) {
            return toast({
                title: "Check your email",
                description: "We sent you a login link. Be sure to check your spam too.",
            })
        }

        return toast({
            description: 'Error, please try again.',
        })


    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Button disabled={isLoading} className="ml-auto w-full" type="submit">
                        {isLoading && (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Send Reset Link
                    </Button>
                </form>
            </Form>
        </div>);
};

export default ForgotPasswordForm;