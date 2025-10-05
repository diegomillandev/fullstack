import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

type Transaction = {
  id: number | string;
  date: string; // ISO
  concept: string;
  amount: number;
  userId: string;
  type: "INCOME" | "EXPENSE" | string;
};

function aggregateByDay(transactions: Transaction[]) {
  const map: Record<string, { date: string; income: number; expense: number }> =
    {};

  transactions.forEach((t) => {
    const day = new Date(t.date).toISOString().slice(0, 10);
    if (!map[day]) map[day] = { date: day, income: 0, expense: 0 };
    if (t.type === "INCOME") map[day].income += t.amount;
    else map[day].expense += t.amount;
  });

  // convertir a array ordenado por fecha
  return Object.values(map).sort((a, b) => (a.date < b.date ? -1 : 1));
}
export function exportToCSV(data: Transaction[]) {
  const header = ["ID", "Fecha", "Concepto", "Tipo", "Monto", "Usuario"];
  const rows = data.map((t) => [
    t.id,
    new Date(t.date).toLocaleString(),
    t.concept,
    t.type,
    t.amount,
    t.userId,
  ]);

  // Unir todo como texto CSV
  const csvContent = [header, ...rows].map((r) => r.join(",")).join("\n");

  // Crear un archivo Blob y descargarlo
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "transacciones.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
export const Reports = () => {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/transactions?user_id=${session?.user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          toast.error("Error fetching transactions");
          return;
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("💥 Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getTransaction();
  }, [session]);

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "INCOME") acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const net = totals.income - totals.expense;
  const byDay = aggregateByDay(transactions);

  const barData = byDay.map((d) => ({
    day: d.date,
    Income: +d.income.toFixed(2),
    Expense: +d.expense.toFixed(2),
  }));
  const pieData = [
    { name: "Income", value: +totals.income.toFixed(2) },
    { name: "Expense", value: +totals.expense.toFixed(2) },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transaction Report</h1>
        <div className="flex gap-2">
          <Button onClick={() => exportToCSV(transactions)}>Export CSV</Button>
          <Button>Refresh</Button>
        </div>
      </div>
      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $
                  {totals.income.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Sum of all INCOME type transactions
                </div>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardHeader>
                <CardTitle>Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $
                  {totals.expense.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Sum of all EXPENSE type transactions
                </div>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardHeader>
                <CardTitle>Net Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${net.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Income - Expenses
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses per Day</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                  >
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Income" stackId="a" />
                    <Bar dataKey="Expense" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composition (Total)</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead className="text-left uppercase text-xs text-muted-foreground">
                    <tr>
                      <th className="px-2 py-2">ID</th>
                      <th className="px-2 py-2">Date</th>
                      <th className="px-2 py-2">Concept</th>
                      <th className="px-2 py-2">Type</th>
                      <th className="px-2 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-b">
                        <td className="px-2 py-3">{t.id}</td>
                        <td className="px-2 py-3">
                          {new Date(t.date).toLocaleString()}
                        </td>
                        <td className="px-2 py-3">{t.concept}</td>
                        <td className="px-2 py-3">{t.type}</td>
                        <td className="px-2 py-3 text-right">
                          $
                          {t.amount.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
