import { toast } from "react-toastify";

export function useToastMessage() {
  const ToastMessage = (
    type: "info" | "success" | "warning" | "error" | "default",
    message: string
  ) => {
    toast(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      type,
    });
  };

  return { ToastMessage };
}
