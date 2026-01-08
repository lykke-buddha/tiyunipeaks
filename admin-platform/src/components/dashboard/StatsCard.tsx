import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
    title: string;
    value: string;
    trend: string;
    trendLabel: string;
    trendUp?: boolean;
    icon: LucideIcon;
    iconColor: string; // e.g. "text-emerald-500"
}

export function StatsCard({ title, value, trend, trendLabel, trendUp = true, icon: Icon, iconColor }: StatsCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{title}</p>
                <Icon className={clsx(iconColor, "stroke-[1.5]")} width={16} />
            </div>
            <p className="mt-4 text-2xl font-medium tracking-tight text-gray-900">{value}</p>
            <div className="mt-1 flex items-center gap-2">
                <span className={clsx(
                    "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium",
                    trendUp ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                )}>
                    {trend}
                </span>
                <span className="text-xs text-gray-400">{trendLabel}</span>
            </div>
        </div>
    );
}
