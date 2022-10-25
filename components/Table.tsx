import cn from "classnames"

type TableProps = {
  heads: string[]
  data: string[][]
  className?: string
  layout?: "fixed" | "auto"
}

const Table: React.FC<TableProps> = ({
  heads,
  data,
  className,
  layout = "auto",
}) => {
  return (
    <table
      className={cn(className, {
        "table-auto": layout === "auto",
        "table-fixed": layout === "fixed",
      })}
    >
      <thead>
        <tr>
          {heads.map(head => (
            <th key={head}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={`row-${heads[i]}`}>
            {row.map(cell => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
