type ToastType = "success" | "error";

type ShowFn = (message: string, type?: ToastType) => void;

let showFn: ShowFn | null = null;

export const registerToast = (fn: ShowFn) => {
  showFn = fn;
};

export const unregisterToast = () => {
  showFn = null;
};

export const showToast = (message: string, type: ToastType = "error") => {
  if (showFn) {
    showFn(message, type);
  } else {
    // Fallback to console when UI not mounted yet
    // eslint-disable-next-line no-console
    console[type === "error" ? "error" : "log"](message);
  }
};

export default {
  registerToast,
  unregisterToast,
  showToast,
};
