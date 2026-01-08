import { User } from 'lucide-react';
import { formatCurrency } from '../../data/plots';
import { useData } from '../../context/DataContext';

export function RecentTransactions() {
    const { plots } = useData();

    const soldPlots = plots
        .filter(p => (p.status === 'Sold' || p.status === 'Reserved') && p.buyerName)
        .sort((a, b) => {
            const dateA = a.soldDate ? new Date(a.soldDate).getTime() : 0;
            const dateB = b.soldDate ? new Date(b.soldDate).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 5); // Show last 5 sales

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Recent Sales</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>

            <div className="space-y-6">
                {soldPlots.map((plot) => (
                    <div key={plot.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <User width={16} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{plot.buyerName}</p>
                                <p className="text-xs text-gray-500">Plot {plot.plotNumber} • {plot.size.toFixed(4)} Ha</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{formatCurrency(plot.finalValue)}</p>
                            <p className="text-xs text-emerald-600">{plot.status}</p>
                        </div>
                    </div>
                ))}
                {soldPlots.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No recent sales found.</p>
                )}
            </div>
        </div>
    );
}
