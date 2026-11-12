import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getBillList } from '../api';
import type { Bill } from '../types';
import BillsHeader from '../components/BillsHeader';
import BillsContent from '../components/BillsContent';

export default function BillsPage() {
  useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    const loadBills = async () => {
      setLoading(true);
      try {
        const data = await getBillList();
        if (active) setBills(data);
      } catch (err) {
        if (active) setBills([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadBills();
    return () => {
      active = false;
    };
  }, []);

  const totalDue = bills
    .filter((b) => b.status === 'unpaid' || b.status === 'overdue')
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);

  return (
    <div className="ds-stack-lg">
      <BillsHeader totalDue={totalDue} />
      <BillsContent bills={bills} loading={loading} />
    </div>
  );
}