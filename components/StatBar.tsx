interface StatBarProps {
  label: string;
  value: number;
}

function getBarColor(value: number): string {
  if (value >= 120) return "bg-green-500";
  if (value >= 80) return "bg-blue-500";
  if (value >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

export default function StatBar({ label, value }: StatBarProps) {
  const widthPercent = Math.min(100, Math.round((value / 180) * 100));

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="capitalize text-slate-700">{label.replace("-", " ")}</span>
        <span className="font-semibold text-slate-900">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${getBarColor(value)}`} style={{ width: `${widthPercent}%` }} />
      </div>
    </div>
  );
}
