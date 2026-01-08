import { useState } from 'react';
import { Search, Filter, Download, Eye, ArrowUpRight, ArrowDownLeft, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { Payment } from '../context/DataContext';
import { formatCurrency } from '../data/plots';
import { ReceiptGenerator } from '../components/documents/ReceiptGenerator';

export function Payments() {
    const { payments, users, plots } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | Payment['status']>('All');

    // Receipt Viewer State
    const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

    // Derived Data
    const filteredPayments = payments.filter(payment => {
        const user = users.find(u => u.id === payment.userId);
        const plot = plots.find(p => p.id === payment.plotId);

        const matchesSearch =
            (user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (plot?.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (payment.reference?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

        const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;

        return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const selectedPayment = payments.find(p => p.id === selectedPaymentId);
    const receiptUser = selectedPayment ? users.find(u => u.id === selectedPayment.userId) : null;
    const receiptPlot = selectedPayment ? plots.find(p => p.id === selectedPayment.plotId) : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Payments</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and track all financial transactions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all">
                        <Download width={14} className="stroke-[1.5]" />
                        Export CSV
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all">
                        <Filter width={14} className="stroke-[1.5]" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by customer, plot, or reference..."
                        className="w-full rounded-md border border-gray-200 pl-9 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {['All', 'Completed', 'Pending', 'Failed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status as any)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${statusFilter === status
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Payments Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Plot</th>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium text-right">Amount</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPayments.map(payment => {
                                const user = users.find(u => u.id === payment.userId);
                                const plot = plots.find(p => p.id === payment.plotId);

                                return (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(payment.date).toLocaleDateString()}
                                            <div className="text-xs text-gray-400">{new Date(payment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {user?.name || 'Unknown'}
                                            <div className="text-xs text-gray-500 font-normal">{payment.method}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                                {plot?.plotNumber || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {payment.type}
                                            {payment.reference && <div className="text-xs text-gray-400 font-mono mt-0.5">{payment.reference}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${payment.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                                payment.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                                                    'bg-red-50 text-red-700'
                                                }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${payment.status === 'Completed' ? 'bg-green-500' :
                                                    payment.status === 'Pending' ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                    }`}></span>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedPaymentId(payment.id)}
                                                className="text-gray-400 hover:text-emerald-600 transition-colors p-1"
                                                title="View Receipt"
                                            >
                                                <FileText width={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredPayments.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No payments found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Receipt Modal */}
            {selectedPayment && receiptUser && receiptPlot && (
                <ReceiptGenerator
                    payment={selectedPayment}
                    user={receiptUser}
                    plot={receiptPlot}
                    onClose={() => setSelectedPaymentId(null)}
                />
            )}
        </div>
    );
}
