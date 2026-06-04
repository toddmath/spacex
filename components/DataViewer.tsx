import type { FC } from "react"
import cn from "classnames"

type DataViewerProps = {
  data: Record<string, unknown> | unknown[]
  className?: string
}

const DataViewer: FC<DataViewerProps> = ({ data, className }) => (
  <section
    className={cn(
      className,
      "mx-auto w-full mt-14 mockup-code container lg:max-w-5xl"
    )}
  >
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  </section>
)

export default DataViewer
