import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-600 antialiased font-normal selection:bg-gray-200 selection:text-gray-900">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>

                <footer className="mt-auto border-t border-gray-200 bg-white px-6 py-6 lg:px-10">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-xs text-gray-400">© 2026 Tiynui Peaks. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-xs text-gray-400 hover:text-gray-900">Privacy Policy</a>
                            <a href="#" className="text-xs text-gray-400 hover:text-gray-900">Terms of Service</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
