import cn from "classnames";
import { VscLoading } from "react-icons/vsc";

const Loader: React.FC<{ className?: string; wrapperClassName?: string }> = ({
  className,
  wrapperClassName,
}) => (
  <div
    className={cn(wrapperClassName, "grid size-full place-items-center")}
  >
    <VscLoading
      title="loading spinner"
      className={cn(className, "size-1/2 animate-spin text-base-300")}
    />
  </div>
);

export default Loader;
