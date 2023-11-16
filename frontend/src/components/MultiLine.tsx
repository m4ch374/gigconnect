const MultiLine: React.FC<{ text: string; className?: string }> = ({
  // eslint-disable-next-line react/prop-types
  text,
  // eslint-disable-next-line react/prop-types
  className = "",
}) => {
  return (
    <>
      {/* eslint-disable-next-line react/prop-types */}
      {text.split("\n").map((i, k) => (
        <p className={className} key={k}>
          {i}
        </p>
      ))}
    </>
  )
}

export default MultiLine
