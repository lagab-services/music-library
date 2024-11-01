import ResetPasswordForm from '@/components/forms/reset-password-form';

const ResetPassword = () => {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Reset Password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter a new password to reset your account.
                    </p>
                </div>
                <ResetPasswordForm/>
            </div>
        </div>
    );
};

export default ResetPassword;