import { useState } from 'react';
import { Search, Scroll, ShieldCheck, Printer, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DeedGenerator } from '../components/documents/DeedGenerator';

export function Deeds() {
    const { plots } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDeedPlotId, setSelectedDeedPlotId] = useState<string | null>(null);

    // Filter only Sold plots for Deeds
    const deedPlots = plots.filter(plot => {
        const matchesSearch =
            plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (plot.buyerName && plot.buyerName.toLowerCase().includes(searchTerm.toLowerCase()));

        // In this system, 'Sold' implies fully committed, but strictly a Deed should be for fully paid.
        // We'll check status 'Sold'. Optional: check balance <= 0 if we want to be strict.
        return plot.status === 'Sold' && matchesSearch;
    });

    const selectedPlot = plots.find(p => p.id === selectedDeedPlotId);

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Title Deeds Registry</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and view official digital title deeds for sold properties.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by plot number or owner..."
                        className="w-full rounded-md border border-gray-200 pl-9 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Deed ID</th>
                                <th className="px-6 py-4 font-medium">Plot Number</th>
                                <th className="px-6 py-4 font-medium">Owner</th>
                                <th className="px-6 py-4 font-medium">Date Issued</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {deedPlots.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex justify-center mb-4">
                                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Scroll className="h-6 w-6 text-gray-400" />
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-900">No deeds found</p>
                                        <p className="mt-1">Sold plots will appear here automatically.</p>
                                    </td>
                                </tr>
                            ) : (
                                deedPlots.map((plot) => (
                                    <tr key={plot.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            AG-DEED-{new Date().getFullYear()}-{plot.plotNumber}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{plot.plotNumber}</td>
                                        <td className="px-6 py-4 text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-medium">
                                                    {plot.buyerName?.charAt(0)}
                                                </div>
                                                {plot.buyerName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {plot.soldDate ? new Date(plot.soldDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
                                                <ShieldCheck width={12} />
                                                Active Title
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedDeedPlotId(plot.id)}
                                                    className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                                    title="View Deed"
                                                >
                                                    <Eye width={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedDeedPlotId(plot.id);
                                                        // In a real app, this might trigger print directly, but opening modal is safer for now
                                                        // effectively "View to Print"
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                                    title="Print"
                                                >
                                                    <Printer width={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Deed Modal */}
            {selectedPlot && selectedPlot.buyerName && (
                <DeedGenerator
                    buyerName={selectedPlot.buyerName}
                    plotNumber={selectedPlot.plotNumber}
                    size={selectedPlot.size}
                    value={selectedPlot.finalValue}
                    date={selectedPlot.soldDate || new Date().toISOString()}
                    onClose={() => setSelectedDeedPlotId(null)}
                />
            )}
        </div>
    );
}
