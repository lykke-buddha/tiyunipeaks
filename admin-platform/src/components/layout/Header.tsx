import { Menu, Search, Bell, ChevronRight } from 'lucide-react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4 lg:hidden">
                <button onClick={onMenuClick} className="text-gray-500 hover:text-gray-900">
                    <Menu width={20} className="stroke-[1.5]" />
                </button>
                <span className="text-sm font-medium tracking-tight">TIYNUI PEAKS</span>
            </div>

            <div className="hidden items-center gap-2 text-sm text-gray-500 lg:flex">
                <span className="hover:text-gray-900 cursor-pointer transition-colors">Dashboard</span>
                <ChevronRight width={14} className="stroke-[1.5] text-gray-300" />
                <span className="text-gray-900 font-medium">Overview</span>
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden sm:block">
                    <Search width={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 stroke-[1.5]" />
                    <input
                        type="text"
                        placeholder="Search users, transactions..."
                        className="h-9 w-64 rounded-md border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-300 focus:bg-white transition-all"
                    />
                </div>

                {/* Notifications */}
                <button className="relative text-gray-400 hover:text-gray-600">
                    <Bell width={18} className="stroke-[1.5]" />
                    <span className="absolute right-0.5 top-0 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
            </div>
        </header>
    );
}
