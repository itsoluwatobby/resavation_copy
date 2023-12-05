import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import axiosAuth from "../../lib/authAxios";

export default function RequestOTP({ email }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRequestOTP = async () => {
        setIsLoading(true);

        try {
            const res = await axiosAuth.post(`/request-otp`, JSON.stringify({ email }));
            toast.success(`${res?.data?.message}`);
            router.push(`/verification_code?email=${email}`);
        } catch (error) {
            let errorMessage = error?.response?.data?.message;
            toast.error(`${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleRequestOTP}
            disabled={isLoading}
            className={`${isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-600 active:bg-blue-700'
                } p-2 px-4 transition-all capitalize text-white rounded-md`}
        >
            {isLoading ? 'Sending OTP...' : 'Request OTP'}
        </button>
    );
}
