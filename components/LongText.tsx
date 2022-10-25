type LongTextProps = {
  text: string
  maxLength?: number
  className?: string
}

const LongText: React.FC<LongTextProps> = ({ text, maxLength = 200, className }) => {
  if (text.length > maxLength) {
    return <p className={className}>{text.substring(0, maxLength)}...</p>
  }
  return <p className={className}>{text}</p>
}

export default LongText
