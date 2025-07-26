import { toast, ToastOptions } from "react-toastify";

export const Toast = (message: string, type: string) => {
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: type === "info" ? 2000 : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "error":
      toast.error(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};
