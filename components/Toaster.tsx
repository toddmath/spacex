import type { FC } from "react";
import { toast, Toaster as HotToaster, ToastBar } from "react-hot-toast";
import { FiX } from "react-icons/fi";

const Toaster: FC = () => {
  return (
    <HotToaster
      containerStyle={{ top: "5rem" }}
      containerClassName="toast toast-top toast-center gap-4"
      gutter={16}
      position="top-center"
      toastOptions={{
        className: "alert alert-info shadow-lg",
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              <button
                className="btn text-primary-content btn-primary"
                onClick={() => toast.dismiss(t.id)}
              >
                <FiX className="size-4 stroke-current" size="1rem" />
              </button>
            </>
          )}
        </ToastBar>
      )}
    </HotToaster>
  );
};

export default Toaster;
