import type { FC } from "react";
import { toast, resolveValue, useToaster } from "react-hot-toast";

import { FiX } from "react-icons/fi";

const Notifications: FC = () => {
  const { toasts, handlers: { startPause, endPause } } = useToaster();

  return (
    <div className="absolute h-full min-h-screen w-screen p-6">
      <div
        onMouseEnter={startPause}
        onMouseLeave={endPause}
        className="toast toast-center toast-top top-16 z-50 mx-auto w-full max-w-md -translate-x-1/2 gap-2"
      >
        {toasts
          .filter((t) => t.visible)
          .map((t) => (
            <div
              key={t.id}
              className="alert alert-info shadow-lg"
              {...t.ariaProps}
            >
              <>
                {t.icon}
                <span className="w-full flex-1">
                  {resolveValue(t.message, t)}
                </span>
                <button
                  className="btn btn-circle btn-ghost btn-xs"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <FiX className="size-4 stroke-current" />
                </button>
              </>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
