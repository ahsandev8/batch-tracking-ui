import React, { useCallback, useEffect, useState } from "react";
import Toast from "./Toast";
import { registerToast, unregisterToast } from "../../utils/toastService";

interface ToastItem {
  id: string;
  message: string;
  type: "error" | "success";
}

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: "error" | "success" = "error") => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);

    setToasts((prev) => [...prev, { id, message, type }]);

    // auto remove after 4s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    registerToast(show);

    return () => unregisterToast();
  }, [show]);

  const handleClose = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {children}

      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => handleClose(t.id)} />
      ))}
    </>
  );
};

export default ToastProvider;
