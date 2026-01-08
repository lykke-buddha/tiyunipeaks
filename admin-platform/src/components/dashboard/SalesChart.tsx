import clsx from 'clsx';
import { formatCurrency } from '../../data/plots';
import { useData } from '../../context/DataContext';

export function SalesChart() {
    const { plots } = useData();

    const chartData = [
        {
            label: 'Sold',
            value: plots.filter(p => p.status === 'Sold').reduce((sum, p) => sum + p.finalValue, 0),
            color: 'bg-emerald-500'
        },
        {
            label: 'Reserved',
            value: plots.filter(p => p.status === 'Reserved').reduce((sum, p) => sum + p.finalValue, 0),
            color: 'bg-orange-500'
        },
        {
            label: 'Available',
            value: plots.filter(p => p.status === 'Available').reduce((sum, p) => sum + p.finalValue, 0),
            color: 'bg-blue-500'
        },
    ];

    const totalValue = chartData.reduce((sum, item) => sum + item.value, 0) || 1; // Avoid divide by zero

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-gray-900">Inventory Value</h3>
                    <p className="text-sm text-gray-500">Distribution by status</p>
                </div>
            </div>

            <div className="flex h-64 items-end gap-2 lg:gap-4">
                {chartData.map((item, index) => {
                    const heightPercentage = Math.max((item.value / totalValue) * 100, 5);
                    return (
                        <div key={index} className="group relative w-full flex flex-col justify-end gap-2 items-center">
                            <div
                                className={clsx("w-full rounded-t-sm transition-all hover:opacity-80", item.color)}
                                style={{ height: `${heightPercentage}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap z-10">
                                    {formatCurrency(item.value)}
                                </div>
                            </div>

                            <div className="text-center">
                                <span className="block text-xs font-medium text-gray-900">{item.label}</span>
                                <span className="block text-[10px] text-gray-500">{((item.value / totalValue) * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
