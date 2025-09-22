interface CardHeaderProps {
  customerName: string;
}

export default function CardHeader({ customerName }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
      <h3 className="text-lg font-bold">{customerName} 고객님</h3>
    </div>
  );
}
