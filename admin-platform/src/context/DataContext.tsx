import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Plot, plotsData as initialPlots } from '../data/plots';

// --- Interfaces ---

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    role: 'Admin' | 'Sales Agent' | 'Customer';
    status: 'Active' | 'Inactive';
    registeredDate: string;
    purchasedPlots: string[]; // IDs of plots bought
    paymentIds: string[];
    notes?: string;
}

export interface Payment {
    id: string;
    plotId: string;
    userId: string;
    amount: number;
    method: 'Bank Transfer' | 'Cash' | 'Credit Card' | 'Mobile Money' | 'Check' | 'Wire Transfer' | 'Other';
    status: 'Pending' | 'Processing' | 'Completed' | 'Failed' | 'Refunded';
    type: 'Full Payment' | 'Deposit' | 'Installment';
    date: string;
    reference?: string;
    notes?: string;
}

interface DataContextType {
    plots: Plot[];
    users: User[];
    payments: Payment[];

    // Actions
    updatePlot: (plotId: string, updates: Partial<Plot>) => void;
    addUser: (user: Omit<User, 'id' | 'registeredDate' | 'purchasedPlots' | 'paymentIds'>) => void;
    updateUser: (userId: string, updates: Partial<User>) => void;
    addPayment: (payment: Omit<Payment, 'id'>) => void;
    updatePayment: (paymentId: string, updates: Partial<Payment>) => void;

    // Helpers
    getPlot: (id: string) => Plot | undefined;
    getUser: (id: string) => User | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Helpers for Persistence ---
const STORAGE_KEYS = {
    PLOTS: 'tiyuni_plots',
    USERS: 'tiyuni_users',
    PAYMENTS: 'tiyuni_payments'
};

export function DataProvider({ children }: { children: ReactNode }) {
    // Initialize state from LocalStorage or Default Data
    const [plots, setPlots] = useState<Plot[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.PLOTS);
            return saved ? JSON.parse(saved) : initialPlots;
        } catch (e) {
            console.error('Failed to parse plots from local storage', e);
            return initialPlots;
        }
    });

    const [users, setUsers] = useState<User[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.USERS);
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse users from local storage', e);
        }

        // Seed initial users from Mock Data if no local storage exists
        const buyersMap = new Map<string, User>();
        initialPlots.forEach(plot => {
            if (plot.buyerName) {
                if (!buyersMap.has(plot.buyerName)) {
                    buyersMap.set(plot.buyerName, {
                        id: `user_${Math.random().toString(36).substr(2, 9)}`,
                        name: plot.buyerName,
                        email: `${plot.buyerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                        phone: '+265 999 000 000',
                        role: 'Customer',
                        status: 'Active',
                        registeredDate: new Date().toISOString(),
                        purchasedPlots: [],
                        paymentIds: []
                    });
                }
                const buyer = buyersMap.get(plot.buyerName)!;
                buyer.purchasedPlots.push(plot.id);
            }
        });
        return Array.from(buyersMap.values());
    });

    const [payments, setPayments] = useState<Payment[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse payments from local storage', e);
            return [];
        }
    });

    // --- Persistence Effects ---
    useEffect(() => localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(plots)), [plots]);
    useEffect(() => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)), [users]);
    useEffect(() => localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments)), [payments]);


    // --- Actions ---

    const updatePlot = (plotId: string, updates: Partial<Plot>) => {
        setPlots(prev => prev.map(p => p.id === plotId ? { ...p, ...updates } : p));
    };

    const getPlot = (id: string) => plots.find(p => p.id === id);

    const addUser = (userData: Omit<User, 'id' | 'registeredDate' | 'purchasedPlots' | 'paymentIds'>) => {
        const newUser: User = {
            ...userData,
            id: `user_${Math.random().toString(36).substr(2, 9)}`,
            registeredDate: new Date().toISOString(),
            purchasedPlots: [],
            paymentIds: []
        };
        setUsers(prev => [...prev, newUser]);
    };

    const updateUser = (userId: string, updates: Partial<User>) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    };

    const getUser = (id: string) => users.find(u => u.id === id);

    const addPayment = (paymentData: Omit<Payment, 'id'>) => {
        const newPayment: Payment = {
            ...paymentData,
            id: `pay_${Math.random().toString(36).substr(2, 9)}`
        };
        setPayments(prev => [newPayment, ...prev]);

        // Link payment to user
        updateUser(paymentData.userId, {
            paymentIds: [...(getUser(paymentData.userId)?.paymentIds || []), newPayment.id]
        });
    };

    const updatePayment = (paymentId: string, updates: Partial<Payment>) => {
        setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, ...updates } : p));
    };

    return (
        <DataContext.Provider value={{
            plots, users, payments,
            updatePlot, addUser, updateUser, addPayment, updatePayment,
            getPlot, getUser
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
