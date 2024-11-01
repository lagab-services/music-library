import Link from "next/link"
import ForgotPasswordForm from '@/components/forms/forgot-password-form';

const ForgotPassword = () => {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">

                    <h1 className="text-2xl font-semibold tracking-tight">
                        Forgot Password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your registered email and
                        we will send you a link to reset your password.
                    </p>
                </div>
                <ForgotPasswordForm/>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?
                    <Link
                        href="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Sign up
                    </Link>.
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;