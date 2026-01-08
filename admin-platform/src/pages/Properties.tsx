import { Plus, Download, Filter } from 'lucide-react';
import { PlotsTable } from '../components/dashboard/PlotsTable';
import { useData } from '../context/DataContext';

export function Properties() {
    const { plots } = useData();

    const handleExport = () => {
        // Create CSV content
        const headers = ['Plot Number', 'Size (Ha)', 'Price/Ha', 'Final Value', 'Status', 'Buyer Name', 'Deposit', 'Balance'];
        const csvContent = [
            headers.join(','),
            ...plots.map(plot => [
                plot.plotNumber,
                plot.size,
                plot.pricePerHa,
                plot.finalValue,
                plot.status,
                `"${plot.buyerName || ''}"`,
                plot.deposit || 0,
                plot.balance || 0
            ].join(','))
        ].join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `tiyuni_plots_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAddPlot = () => {
        alert("Add Plot feature coming soon! (Use 'New Sale' to assign existing plots)");
    };

    const handleFilterClick = () => {
        alert("Advanced filtering options would open here.");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Properties & Plots</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your land inventory and plot status.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleFilterClick}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <Filter width={14} />
                        Filter
                    </button>
                    <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <Download width={14} />
                        Export
                    </button>
                    <button
                        onClick={handleAddPlot}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
                    >
                        <Plus width={14} />
                        <span className="hidden sm:inline">Add Plot</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </div>
            </div>

            <PlotsTable />
        </div>
    );
}
