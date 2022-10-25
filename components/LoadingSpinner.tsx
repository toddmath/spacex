import cn from "classnames"
import { VscLoading } from "react-icons/vsc"

const Loader: React.FC<{ className?: string; wrapperClassName?: string }> = ({
  className,
  wrapperClassName,
}) => (
  <div className={cn(wrapperClassName, "flex items-center justify-center")}>
    <VscLoading
      title='loading spinner'
      className={cn(className, "text-current w-8 h-8 animate-spin")}
    />
  </div>
)

export default Loader
