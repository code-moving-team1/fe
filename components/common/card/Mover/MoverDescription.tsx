interface MoverDescriptionProps {
  description: string;
  className?: string;
}

export default function MoverDescription({
  description,
  className = "",
}: MoverDescriptionProps) {
  return <p className={`text-sm text-gray-500 ${className}`}>{description}</p>;
}
