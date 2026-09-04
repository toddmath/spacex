import type { FC } from "react";
import cn from "classnames";

type DataViewerProps = {
  data: Record<string, unknown> | unknown[];
  className?: string;
};

const DataViewer: FC<DataViewerProps> = ({ data, className }) => (
  <section
    className={cn(
      className,
      "mockup-code container mx-auto mt-14 w-full lg:max-w-5xl",
    )}
  >
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  </section>
);

export default DataViewer;
