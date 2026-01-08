import { useState } from 'react';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { formatCurrency } from '../../data/plots';
import { useData } from '../../context/DataContext';
import { PlotDetailsModal } from '../modals/PlotDetailsModal';

export function PlotsTable() {
    const { plots } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Sold' | 'Reserved'>('All');
    const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);

    const itemsPerPage = 8;

    // Filter logic
    const filteredPlots = plots.filter(plot => {
        const matchesSearch = plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (plot.buyerName && plot.buyerName.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'All' || plot.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredPlots.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPlots = filteredPlots.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-64">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                        placeholder="Search plots or buyers..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on search
                        }}
                    />
                </div>

                <div className="flex gap-2">
                    {['All', 'Available', 'Sold', 'Reserved'].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setStatusFilter(status as any);
                                setCurrentPage(1);
                            }}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${statusFilter === status
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium cursor-pointer hover:bg-gray-100">
                                    <div className="flex items-center gap-1">
                                        Plot Number <ArrowUpDown width={14} />
                                    </div>
                                </th>
                                <th className="px-6 py-3 font-medium">Size (Ha)</th>
                                <th className="px-6 py-3 font-medium">Price / Ha</th>
                                <th className="px-6 py-3 font-medium">Final Value</th>
                                <th className="px-6 py-3 font-medium">Buyer's Name</th>
                                <th className="px-6 py-3 font-medium">Deposit</th>
                                <th className="px-6 py-3 font-medium">Balance</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedPlots.map((plot) => (
                                <tr key={plot.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{plot.plotNumber}</td>
                                    <td className="px-6 py-4 text-gray-600">{plot.size.toFixed(4)}</td>
                                    <td className="px-6 py-4 text-gray-600">{formatCurrency(plot.pricePerHa)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(plot.finalValue)}</td>
                                    <td className="px-6 py-4 text-gray-600">{plot.buyerName || '-'}</td>
                                    <td className="px-6 py-4 text-gray-600">{formatCurrency(plot.deposit)}</td>
                                    <td className="px-6 py-4 text-gray-600">{formatCurrency(plot.balance)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${plot.status === 'Available' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' :
                                            plot.status === 'Sold' ? 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10' :
                                                'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                                            }`}>
                                            {plot.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedPlotId(plot.id)}
                                            className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
                                            title="View Details"
                                        >
                                            <Eye width={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedPlots.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                                        No plots found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{filteredPlots.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredPlots.length)}</span> of <span className="font-medium">{filteredPlots.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Logic to show a window of pages could go here, for now just show first 5 or logic around current
                                    let p = i + 1;
                                    if (totalPages > 5 && currentPage > 3) {
                                        p = currentPage - 2 + i;
                                        if (p > totalPages) p = i + 1 + (totalPages - 5);
                                    }

                                    // Simplification: Just show valid pages if total < 10
                                    // Re-rendering page numbers:
                                    const pageNum = i + 1; // Basic placeholder logic
                                    return (
                                        <button
                                            key={pageNum} // Key needs to be unique if we do dynamic logic
                                            onClick={() => setCurrentPage(pageNum)}
                                            // This is a temporary simple pagination list, ideally we'd implement full logic
                                            className="hidden" // Hiding the loop for a moment to use simple Prev/Next + Text first to be safe
                                        />
                                    );
                                })}

                                {/* Simple Page X of Y Display for Robustness */}
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* Plot Details Modal */}
            <PlotDetailsModal
                isOpen={!!selectedPlotId}
                onClose={() => setSelectedPlotId(null)}
                plotId={selectedPlotId}
            />
        </div>
    );
}
