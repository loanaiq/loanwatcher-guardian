import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, AlertTriangle } from "lucide-react";
import { customerSegments } from "@/data/customerData";

const formatIndianCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const ComplianceTable = () => {
  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle>Customer Compliance Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border-2 border-gray-300">
          <TableHeader>
            <TableRow className="bg-muted border-b-2 border-gray-300">
              <TableHead className="font-semibold text-gray-700">Customer</TableHead>
              <TableHead className="font-semibold text-gray-700">Compliance Level</TableHead>
              <TableHead className="font-semibold text-gray-700">Risk Level</TableHead>
              <TableHead className="font-semibold text-gray-700">Utilization Rate</TableHead>
              <TableHead className="font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-200">
            {customerSegments.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{customer.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${
                    customer.compliance === "High" 
                      ? "bg-green-50 text-green-800 border-green-200" 
                      : customer.compliance === "Medium"
                      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}>
                    {customer.compliance}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${
                    customer.risk === "Low" 
                      ? "bg-green-50 text-green-800 border-green-200" 
                      : customer.risk === "Medium"
                      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}>
                    {customer.risk}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{customer.utilizationRate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {customer.name} - Transaction Analysis
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-6">
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Debit Transactions</h3>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Year</TableHead>
                                      <TableHead>Month</TableHead>
                                      <TableHead>Amount</TableHead>
                                      <TableHead>Category</TableHead>
                                      <TableHead>Payment Method</TableHead>
                                      <TableHead>Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {customer.transactions.debit.map((transaction, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.year}</TableCell>
                                        <TableCell>{transaction.month}</TableCell>
                                        <TableCell>{formatIndianCurrency(transaction.amount)}</TableCell>
                                        <TableCell>{transaction.category}</TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className={
                                            transaction.paymentMethod === "Cash" 
                                              ? "bg-orange-50 text-orange-800 border-orange-200"
                                              : transaction.paymentMethod === "RTGS" || transaction.paymentMethod === "NEFT"
                                              ? "bg-blue-50 text-blue-800 border-blue-200"
                                              : "bg-purple-50 text-purple-800 border-purple-200"
                                          }>
                                            {transaction.paymentMethod}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          {transaction.flag ? (
                                            <div className="flex items-center text-destructive gap-1">
                                              <AlertTriangle className="h-4 w-4" />
                                              <span>Flagged</span>
                                            </div>
                                          ) : (
                                            <span className="text-green-600">Normal</span>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Credit Transactions</h3>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Year</TableHead>
                                      <TableHead>Month</TableHead>
                                      <TableHead>Amount</TableHead>
                                      <TableHead>Category</TableHead>
                                      <TableHead>Payment Method</TableHead>
                                      <TableHead>Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {customer.transactions.credit.map((transaction, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.year}</TableCell>
                                        <TableCell>{transaction.month}</TableCell>
                                        <TableCell>{formatIndianCurrency(transaction.amount)}</TableCell>
                                        <TableCell>{transaction.category}</TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className={
                                            transaction.paymentMethod === "Cash" 
                                              ? "bg-orange-50 text-orange-800 border-orange-200"
                                              : transaction.paymentMethod === "RTGS" || transaction.paymentMethod === "NEFT"
                                              ? "bg-blue-50 text-blue-800 border-blue-200"
                                              : "bg-purple-50 text-purple-800 border-purple-200"
                                          }>
                                            {transaction.paymentMethod}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          {transaction.flag ? (
                                            <div className="flex items-center text-destructive gap-1">
                                              <AlertTriangle className="h-4 w-4" />
                                              <span>Flagged</span>
                                            </div>
                                          ) : (
                                            <span className="text-green-600">Normal</span>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ComplianceTable;
