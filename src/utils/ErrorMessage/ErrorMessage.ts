import toast from "react-hot-toast";

export default function errorMessage(message: string) {
    toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#333',
            color: '#fff',
        },
    });
};