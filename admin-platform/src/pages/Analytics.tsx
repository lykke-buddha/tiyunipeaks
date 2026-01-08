import { BarChart3, TrendingUp, Map } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { plotsData, formatCurrency } from '../data/plots';

export function Analytics() {
    // Calculate some analytics
    const totalPlots = plotsData.length;
    const availablePlots = plotsData.filter(p => p.status === 'Available').length;
    const soldPlots = plotsData.filter(p => p.status === 'Sold').length;
    const reservedPlots = plotsData.filter(p => p.status === 'Reserved').length;

    // Size stats
    const totalArea = plotsData.reduce((sum, p) => sum + p.size, 0);
    const avgPlotSize = totalArea / totalPlots;

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Analytics</h1>
                    <p className="mt-1 text-sm text-gray-500">Deep dive into performance metrics and inventory data.</p>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Conversion Rate"
                    value={`${((soldPlots / totalPlots) * 100).toFixed(1)}%`}
                    trend="steady"
                    trendLabel="sold vs total"
                    icon={TrendingUp}
                    iconColor="text-emerald-500"
                />
                <StatsCard
                    title="Total Land Area"
                    value={`${totalArea.toFixed(1)} Ha`}
                    trend="100%"
                    trendLabel="managed land"
                    icon={Map}
                    iconColor="text-blue-500"
                />
                <StatsCard
                    title="Avg. Plot Size"
                    value={`${avgPlotSize.toFixed(3)} Ha`}
                    trend="Standard"
                    trendLabel="average"
                    icon={Map}
                    iconColor="text-violet-500"
                />
                <StatsCard
                    title="Total Value"
                    value={formatCurrency(plotsData.reduce((sum, p) => sum + p.finalValue, 0))}
                    trend="Est."
                    trendLabel="Gross Development Value"
                    icon={BarChart3}
                    iconColor="text-orange-500"
                />
            </div>

            <div className="grid gap-6">
                <SalesChart />
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Available</p>
                    <p className="text-3xl font-semibold text-blue-600 mt-2">{availablePlots}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Sold</p>
                    <p className="text-3xl font-semibold text-emerald-600 mt-2">{soldPlots}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Reserved</p>
                    <p className="text-3xl font-semibold text-orange-600 mt-2">{reservedPlots}</p>
                </div>
            </div>
        </div>
    );
}
