import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { customerSegments } from "@/data/customerData";

const formatIndianCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const TransactionAnalysis = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  // Function to calculate transaction totals
  const calculateTransactionTotals = (transactions: any[]) => {
    return {
      cash: transactions
        .filter(tx => tx.paymentMethod === "Cash")
        .reduce((acc, tx) => acc + tx.amount, 0),
      rtgsNeft: transactions
        .filter(tx => ["RTGS", "NEFT"].includes(tx.paymentMethod))
        .reduce((acc, tx) => acc + tx.amount, 0),
      cheque: transactions
        .filter(tx => tx.paymentMethod === "Cheque")
        .reduce((acc, tx) => acc + tx.amount, 0)
    };
  };

  // Function to get filtered transactions
  const getFilteredTransactions = () => {
    if (!selectedCustomer) return null;
    
    let customersToProcess = selectedCustomer === "all" 
      ? customerSegments 
      : [customerSegments.find(c => c.name === selectedCustomer)].filter(Boolean);

    if (customersToProcess.length === 0) return null;

    const filterByDate = (tx: any) => {
      if (!selectedMonth || !selectedYear) return true;
      return tx.month === selectedMonth && tx.year.toString() === selectedYear;
    };

    const allTransactions = customersToProcess.reduce((acc, customer) => {
      const debitTx = customer.transactions.debit.filter(filterByDate);
      const creditTx = customer.transactions.credit.filter(filterByDate);

      return {
        debit: [...acc.debit, ...debitTx],
        credit: [...acc.credit, ...creditTx]
      };
    }, { debit: [], credit: [] });

    const debitTotals = calculateTransactionTotals(allTransactions.debit);
    const creditTotals = calculateTransactionTotals(allTransactions.credit);

    const aggregateByMethod = (transactions: any[]) => {
      return {
        cash: transactions.filter(tx => tx.paymentMethod === "Cash"),
        rtgsNeft: transactions.filter(tx => ["RTGS", "NEFT"].includes(tx.paymentMethod)),
        cheque: transactions.filter(tx => tx.paymentMethod === "Cheque")
      };
    };

    return {
      debit: {
        transactions: aggregateByMethod(allTransactions.debit),
        totals: debitTotals
      },
      credit: {
        transactions: aggregateByMethod(allTransactions.credit),
        totals: creditTotals
      }
    };
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-blue-900">Customer Transaction Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <label className="text-sm font-medium mb-2 block">Select Customer</label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  {customerSegments.map(customer => (
                    <SelectItem key={customer.id} value={customer.name}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"].map(month => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-32">
              <label className="text-sm font-medium mb-2 block">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {["2024", "2023"].map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCustomer && filteredTransactions && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Debit Transactions</h3>
                <div className="space-y-4">
                  <Card className="border-2 border-gray-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cash Transactions</CardTitle>
                      <div className="text-sm font-semibold text-orange-600">
                        Total: {formatIndianCurrency(filteredTransactions.debit.totals.cash)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table className="border-2 border-gray-300">
                        <TableHeader>
                          <TableRow className="border-b-2 border-gray-300">
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                            {selectedCustomer === "all" && <TableHead>Customer</TableHead>}
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-300/40">
                          {filteredTransactions.debit.transactions.cash.map((tx: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{formatIndianCurrency(tx.amount)}</TableCell>
                              <TableCell>{tx.category}</TableCell>
                              {selectedCustomer === "all" && 
                                <TableCell>{customerSegments.find(c => 
                                  c.transactions.debit.includes(tx))?.name}</TableCell>
                              }
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">RTGS/NEFT Transactions</CardTitle>
                      <div className="text-sm font-semibold text-blue-600">
                        Total: {formatIndianCurrency(filteredTransactions.debit.totals.rtgsNeft)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table className="border-2 border-gray-300">
                        <TableHeader>
                          <TableRow className="border-b-2 border-gray-300">
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-300/40">
                          {filteredTransactions.debit.transactions.rtgsNeft.map((tx: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{formatIndianCurrency(tx.amount)}</TableCell>
                              <TableCell>{tx.category}</TableCell>
                              <TableCell>{tx.paymentMethod}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cheque Transactions</CardTitle>
                      <div className="text-sm font-semibold text-purple-600">
                        Total: {formatIndianCurrency(filteredTransactions.debit.totals.cheque)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table className="border-2 border-gray-300">
                        <TableHeader>
                          <TableRow className="border-b-2 border-gray-300">
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-300/40">
                          {filteredTransactions.debit.transactions.cheque.map((tx: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{formatIndianCurrency(tx.amount)}</TableCell>
                              <TableCell>{tx.category}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Credit Transactions</h3>
                <div className="space-y-4">
                  <Card className="border-2 border-gray-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cash Transactions</CardTitle>
                      <div className="text-sm font-semibold text-orange-600">
                        Total: {formatIndianCurrency(filteredTransactions.credit.totals.cash)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table className="border-2 border-gray-300">
                        <TableHeader>
                          <TableRow className="border-b-2 border-gray-300">
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-300/40">
                          {filteredTransactions.credit.transactions.cash.map((tx: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{formatIndianCurrency(tx.amount)}</TableCell>
                              <TableCell>{tx.category}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">RTGS/NEFT Transactions</CardTitle>
                      <div className="text-sm font-semibold text-blue-600">
                        Total: {formatIndianCurrency(filteredTransactions.credit.totals.rtgsNeft)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table className="border-2 border-gray-300">
                        <TableHeader>
                          <TableRow className="border-b-2 border-gray-300">
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-300/40">
                          {filteredTransactions.credit.transactions.rtgsNeft.map((tx: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{formatIndianCurrency(tx.amount)}</TableCell>
                              <TableCell>{tx.category}</TableCell>
                              <TableCell>{tx.paymentMethod}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cheque Transactions</CardTitle>
                      <div className="text-sm font-semibold text-purple-600">
                        Total: {formatIndianCurrency(filteredTransactions.credit.totals.cheque)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table className="border-2 border-gray-300">
                        <TableHeader>
                          <TableRow className="border-b-2 border-gray-300">
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-300/40">
                          {filteredTransactions.credit.transactions.cheque.map((tx: any, i: number) => (
                            <TableRow key={i}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{formatIndianCurrency(tx.amount)}</TableCell>
                              <TableCell>{tx.category}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionAnalysis;
