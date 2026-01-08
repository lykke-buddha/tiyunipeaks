import { LayoutDashboard, Map, Users, Banknote, BarChart3, CreditCard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navigation = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Properties & Plots', href: '/properties', icon: Map },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Sales', href: '/sales', icon: Banknote },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    // { name: 'Deeds', href: '/deeds', icon: Scroll },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const projects = [
    { name: 'Sunset Valley', color: 'bg-emerald-500', href: '#' },
    { name: 'Highland Reserve', color: 'bg-blue-500', href: '#' },
    { name: 'Lakeview Estate', color: 'bg-amber-500', href: '#' },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-14 items-center border-b border-gray-100 px-6">
                    <div className="flex items-center gap-2 text-gray-900">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900 text-white">
                            <span className="text-xs font-medium tracking-tighter">T</span>
                        </div>
                        <span className="text-sm font-medium tracking-tight">TIYNUI<span className="text-gray-400">PEAKS</span></span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-0.5 px-3">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    clsx(
                                        'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-gray-50 text-gray-900 shadow-sm ring-1 ring-gray-200'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon
                                            className={clsx(
                                                'mr-3 w-[18px] stroke-[1.5]',
                                                isActive ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-400 group-hover:text-gray-700'
                                            )}
                                        />
                                        {item.name}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-8 px-6">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">Projects</h3>
                        <ul className="mt-3 space-y-2">
                            {projects.map((project) => (
                                <li key={project.name}>
                                    <a href={project.href} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
                                        <span className={clsx('h-1.5 w-1.5 rounded-full', project.color)}></span>
                                        {project.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 p-4">
                    <a href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900"></div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                    </a>
                </div>
            </aside>
        </>
    );
}
