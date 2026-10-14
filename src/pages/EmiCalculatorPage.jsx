import React, { useState } from 'react';
import { Calculator, Percent, Calendar, DollarSign, CheckCircle2, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmiCalculatorPage = () => {
  const { openCallbackModal } = useApp();
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span>Financial Planning Suite</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
          Home Loan <span className="gold-gradient-text">EMI Calculator</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Calculate your monthly outflow, total interest payable, and eligibility across SBI, HDFC & ICICI banks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* INPUT SLIDERS */}
        <div className="lg:col-span-7 glass-panel-gold rounded-3xl p-8 border border-amber-500/30 space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Principal Loan Amount</span>
              <span className="text-amber-300 text-base font-mono">₹ {(loanAmount / 100000).toFixed(1)} Lakh</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Interest Rate (% p.a)</span>
              <span className="text-amber-300 text-base font-mono">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="7"
              max="13"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Loan Tenure</span>
              <span className="text-amber-300 text-base font-mono">{tenureYears} Years ({n} Months)</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* OUTPUT SUMMARY CARD */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-white/10 space-y-6 text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">Monthly Instalment</span>
          <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono gold-gradient-text">
            ₹ {emi.toLocaleString()}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="glass-panel p-4 rounded-2xl">
              <span className="text-[10px] text-slate-400 block">Total Interest Payable</span>
              <span className="text-sm font-bold text-amber-300 font-mono">₹ {(totalInterest / 100000).toFixed(2)} Lakh</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl">
              <span className="text-[10px] text-slate-400 block">Total Amount Payable</span>
              <span className="text-sm font-bold text-white font-mono">₹ {(totalPayment / 100000).toFixed(2)} Lakh</span>
            </div>
          </div>

          <button
            onClick={() => openCallbackModal({ title: 'Pre-Approved Home Loan Assistance' })}
            className="w-full py-3.5 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Apply Pre-Approved Home Loan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
