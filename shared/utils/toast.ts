import { ToastOptions, TypeOptions, toast } from "react-toastify";

const TOAST_CONFIG: ToastOptions = {
  autoClose: 4000,
  position: "top-right",
};
export const DEFAULT_ERROR_TOAST_MESSAGE = "Oops! Something went wrong. Try again later.";

export function showToast(message: string, type: TypeOptions) {
  toast(message, {
    ...TOAST_CONFIG,
    type,
  });
}

export function showDefaultErrorToast() {
  showToast(DEFAULT_ERROR_TOAST_MESSAGE, "error");
}