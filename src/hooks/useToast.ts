import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const options: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    };

    const toastSuccess = (message: string) => {
        toast.success(message, options);
    };

    const toastInfo = (message: string) => {
        toast.info(message, options);
    };

    const toastError = (message: string) => {
        toast.error(message, options);
    };

    const toastWarning = (message: string) => {
        toast.warning(message, options);
    };

    return { toastSuccess, toastInfo, toastError, toastWarning }
}

export default useToast;