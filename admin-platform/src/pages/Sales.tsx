import { useState } from 'react';
import { Calendar, Plus, Banknote } from 'lucide-react';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { SalesChart } from '../components/dashboard/SalesChart';
import { formatCurrency } from '../data/plots';
import { useData } from '../context/DataContext';
import { NewSaleModal } from '../components/modals/NewSaleModal';
import { PaymentModal } from '../components/modals/PaymentModal';

export function Sales() {
    const { plots } = useData();
    const [dateFilter, setDateFilter] = useState<'all' | 'month'>('all');
    const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const totalSales = plots.filter(p => p.status === 'Sold').reduce((sum, p) => sum + p.finalValue, 0);
    const totalReserved = plots.filter(p => p.status === 'Reserved').reduce((sum, p) => sum + p.finalValue, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Sales Overview</h1>
                    <p className="mt-1 text-sm text-gray-500">Track revenue and transaction history.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setDateFilter(prev => prev === 'month' ? 'all' : 'month')}
                        className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors ${dateFilter === 'month'
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <Calendar width={14} />
                        This Month
                    </button>
                    <button
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all"
                    >
                        <Banknote width={14} />
                        Record Payment
                    </button>
                    <button
                        onClick={() => setIsSaleModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
                    >
                        <Plus width={14} />
                        New Sale
                    </button>
                </div>
            </div>

            <NewSaleModal
                isOpen={isSaleModalOpen}
                onClose={() => setIsSaleModalOpen(false)}
            />

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Total Confirmed Sales</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(totalSales)}</p>
                    <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }}></div>
                    </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Reserved Value (Pending)</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(totalReserved)}</p>
                    <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-orange-500" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <SalesChart />
                <div className="lg:col-span-1">
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
