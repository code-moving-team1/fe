interface MoverMessageProps {
  message: string;
  className?: string;
}

export default function MoverMessage({
  message,
  className,
}: MoverMessageProps) {
  return (
    <p className={`text-base font-medium text-gray-800 ${className || ""}`}>
      {message}
    </p>
  );
}
