import { useState } from 'react';
import { Download, Plus, TrendingUp, Map, Banknote, BarChart3 } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { PlotsTable } from '../components/dashboard/PlotsTable';
import { formatCurrency } from '../data/plots';
import { useData } from '../context/DataContext';
import { PaymentModal } from '../components/modals/PaymentModal';

export function Dashboard() {
    const { plots } = useData();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Real-time overview of Tiynui Peaks ecosystem.</p>
                </div>
                <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all">
                        <Download width={14} className="stroke-[1.5]" />
                        Export
                    </button>
                    {/* Add User functionality is mainly in Customers/Users page, but we can hook it up here later if modal is shared */}
                    <button className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-all">
                        <Plus width={14} className="stroke-[1.5]" />
                        Add User
                    </button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Sales Value"
                    value={formatCurrency(
                        plots
                            .filter(p => p.status === 'Sold' || p.status === 'Reserved')
                            .reduce((sum, p) => sum + p.finalValue, 0)
                    )}
                    trend={`${plots.filter(p => p.status === 'Sold' || p.status === 'Reserved').length} plots`}
                    trendLabel="sold / reserved"
                    icon={Banknote}
                    iconColor="text-emerald-500"
                />
                <StatsCard
                    title="Available Plots"
                    value={plots.filter(p => p.status === 'Available').length.toString()}
                    trend={`${((plots.filter(p => p.status === 'Available').length / plots.length) * 100).toFixed(1)}%`}
                    trendLabel="of total inventory"
                    icon={Map}
                    iconColor="text-blue-500"
                />
                <StatsCard
                    title="Potential Revenue"
                    value={formatCurrency(
                        plots
                            .filter(p => p.status === 'Available')
                            .reduce((sum, p) => sum + p.finalValue, 0)
                    )}
                    trend={`${plots.filter(p => p.status === 'Available').length} plots`}
                    trendLabel="to be sold"
                    icon={BarChart3}
                    iconColor="text-violet-500"
                />
                <StatsCard
                    title="Avg. Price / Ha"
                    value={formatCurrency(
                        plots.reduce((sum, p) => sum + p.pricePerHa, 0) / plots.length
                    )}
                    trend="Standard"
                    trendLabel="across all plots"
                    trendUp={true}
                    icon={TrendingUp}
                    iconColor="text-orange-500"
                />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <SalesChart />
                <RecentTransactions />
            </div>

            <PlotsTable />
        </div>
    );
}
