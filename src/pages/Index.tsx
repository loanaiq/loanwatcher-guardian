import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample data with Indian Rupee values
const loanData = [
  { month: 'Jan', disbursed: 10000000, utilized: 8000000 },
  { month: 'Feb', disbursed: 15000000, utilized: 12000000 },
  { month: 'Mar', disbursed: 20000000, utilized: 18000000 },
  { month: 'Apr', disbursed: 18000000, utilized: 17000000 },
  { month: 'May', disbursed: 22000000, utilized: 19000000 },
];

const customerSegments = [
  { 
    id: 1, 
    name: "ABC Corp", 
    compliance: "High", 
    risk: "Low", 
    utilizationRate: "92%",
    transactions: [
      { 
        date: "2024-03-01", 
        amount: 5000000, 
        type: "debit",
        category: "Equipment", 
        paymentMethod: "RTGS",
        flag: false 
      },
      { 
        date: "2024-03-05", 
        amount: 3000000, 
        type: "credit",
        category: "Repayment", 
        paymentMethod: "Cheque",
        flag: true 
      },
      { 
        date: "2024-03-10", 
        amount: 2000000, 
        type: "debit",
        category: "Operations", 
        paymentMethod: "NEFT",
        flag: false 
      },
    ]
  },
  { 
    id: 2, 
    name: "XYZ Ltd", 
    compliance: "Medium", 
    risk: "Medium", 
    utilizationRate: "78%",
    transactions: [
      { 
        date: "2024-03-02", 
        amount: 4000000, 
        type: "debit",
        category: "Inventory", 
        paymentMethod: "Cash",
        flag: false 
      },
      { 
        date: "2024-03-07", 
        amount: 2500000, 
        type: "credit",
        category: "Unknown", 
        paymentMethod: "Cheque",
        flag: true 
      },
      { 
        date: "2024-03-12", 
        amount: 3500000, 
        type: "debit",
        category: "Equipment", 
        paymentMethod: "RTGS",
        flag: false 
      },
    ]
  },
  { 
    id: 3, 
    name: "123 Industries", 
    compliance: "Low", 
    risk: "High", 
    utilizationRate: "65%",
    transactions: [
      { 
        date: "2024-03-03", 
        amount: 6000000, 
        type: "debit",
        category: "Unknown", 
        paymentMethod: "Cash",
        flag: true 
      },
      { 
        date: "2024-03-08", 
        amount: 4500000, 
        type: "credit",
        category: "Real Estate", 
        paymentMethod: "RTGS",
        flag: true 
      },
      { 
        date: "2024-03-13", 
        amount: 1500000, 
        type: "debit",
        category: "Operations", 
        paymentMethod: "NEFT",
        flag: false 
      },
    ]
  },
];

const formatIndianCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const Index = () => {
  console.log("Rendering loan monitoring dashboard");
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Loan Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Disbursement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatIndianCurrency(85000000)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Average across all accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Medium</div>
            <p className="text-xs text-muted-foreground">Based on current patterns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Loan Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="utilization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="utilization">Utilization Patterns</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="utilization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Disbursement vs Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{
                disbursed: { color: "#1a365d" },
                utilized: { color: "#059669" }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loanData}>
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(Number(value) / 10000000).toFixed(1)}Cr`} />
                    <ChartTooltip formatter={(value: number) => formatIndianCurrency(value)} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="disbursed" 
                      stroke="#1a365d" 
                      name="Disbursed Amount" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="utilized" 
                      stroke="#059669" 
                      name="Utilized Amount" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Compliance Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Compliance Level</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Utilization Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerSegments.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.compliance === "High" 
                            ? "bg-success/20 text-success" 
                            : customer.compliance === "Medium"
                            ? "bg-warning/20 text-warning"
                            : "bg-destructive/20 text-destructive"
                        }`}>
                          {customer.compliance}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.risk === "Low" 
                            ? "bg-success/20 text-success" 
                            : customer.risk === "Medium"
                            ? "bg-warning/20 text-warning"
                            : "bg-destructive/20 text-destructive"
                        }`}>
                          {customer.risk}
                        </span>
                      </TableCell>
                      <TableCell>{customer.utilizationRate}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {customer.name} - Transaction Analysis
                              </DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {customer.transactions.map((transaction, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{transaction.date}</TableCell>
                                      <TableCell>
                                        <Badge variant={transaction.type === "credit" ? "success" : "default"}>
                                          {transaction.type.toUpperCase()}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>{formatIndianCurrency(transaction.amount)}</TableCell>
                                      <TableCell>{transaction.category}</TableCell>
                                      <TableCell>
                                        <Badge variant="outline">
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
                                          <span className="text-success">Normal</span>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;