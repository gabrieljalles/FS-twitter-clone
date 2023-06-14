import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../input";
import Modal from "../Modal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, loginModal, registerModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await signIn('credentials', {
                email,
                password
            });

            loginModal.onClose();
        } catch (error) {

            console.log(error);

        } finally {

            setIsLoading(false);
        }
    }, [loginModal, email, password]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
                type="email"
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
                type="password"
            />
        </div>
    )

    const footerContent = (
        <div>
            <p className=" text-neutral-400 text-center mt-4">
                Don´t have an account yet?
                <span onClick={onToggle} className="text-white ml-1 font-bold cursor-pointer">Sign Up</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal