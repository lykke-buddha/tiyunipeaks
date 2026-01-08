const fs = require('fs');
const path = require('path');

// Update filename to the one user uploaded: 'TIYUNI PEAKS-2-1.csv'
const csvPath = path.join(__dirname, 'TIYUNI PEAKS-2-1.csv');
const tsPath = path.join(__dirname, 'src/data/plots.ts');

const fileContent = fs.readFileSync(csvPath, 'utf8');
const lines = fileContent.split('\n').filter(l => l.trim());

const plots = [];

lines.forEach((line, index) => {
    if (index === 0) return; // Header

    // Handle potential totals rows at the end which might start with commas or be empty
    if (!line.match(/^[A-Z]/) && !line.match(/^"[A-Z]/)) {
        // If line doesn't start with a letter (or quoted letter) like G001 or K001, it's widely likely a footer/junk line
        return;
    }

    const parts = [];
    let current = '';
    let inQuotes = false;

    // Custom CSV parser for this format: "123,456.00" numbers
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            parts.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current.trim());

    if (parts.length < 5) return;

    const plotNumber = parts[0];
    // Double check plotNumber is valid
    if (!/^[A-Z][0-9]+/.test(plotNumber)) return;

    const size = parseFloat(parts[1] || '0');
    // Remove quotes, spaces, and commas for number parsing
    const removeFmt = (str) => (str || '0').replace(/["\s,]/g, '');

    const pricePerHa = parseFloat(removeFmt(parts[2]));
    const finalValue = parseFloat(removeFmt(parts[3]));

    // Buyer is index 4
    let cleanBuyer = (parts[4] || '').replace(/^["']|["']$/g, '').trim();
    if (cleanBuyer === ',') cleanBuyer = ''; // Handle weird parsing artifacts if any

    const deposit = parseFloat(removeFmt(parts[5]));
    const balance = parseFloat(removeFmt(parts[6]));

    let status = 'Available';
    if (cleanBuyer) {
        if (balance <= 100) {
            status = 'Sold';
        } else {
            status = 'Reserved';
        }
    }

    plots.push({
        id: (index).toString(),
        plotNumber,
        size,
        pricePerHa,
        finalValue,
        buyerName: cleanBuyer || null,
        deposit,
        balance,
        status
    });
});

const tsContent = `export interface Plot {
    id: string;
    plotNumber: string;
    size: number;
    pricePerHa: number;
    finalValue: number;
    buyerName: string | null;
    deposit: number;
    balance: number;
    status: 'Available' | 'Sold' | 'Reserved';
}

export const plotsData: Plot[] = ${JSON.stringify(plots, null, 4)};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MK', {
        style: 'currency',
        currency: 'MWK',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount).replace('MWK', 'MK');
};
`;

fs.writeFileSync(tsPath, tsContent);
console.log(`Generated ${plots.length} plots in ${tsPath}`);
