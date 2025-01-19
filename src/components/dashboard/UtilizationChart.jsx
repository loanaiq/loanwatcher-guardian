import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

/**
 * Formats a number as Indian currency
 * @param {number} value - The number to format
 * @returns {string} Formatted currency string
 */
const formatIndianCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * @typedef {Object} LoanData
 * @property {string} month - The month of the data point
 * @property {number} disbursed - Amount disbursed
 * @property {number} utilized - Amount utilized
 */

/** @type {LoanData[]} */
const loanData = [
  { month: 'Jan 2024', disbursed: 10000000, utilized: 8000000 },
  { month: 'Feb 2024', disbursed: 15000000, utilized: 12000000 },
  { month: 'Mar 2024', disbursed: 20000000, utilized: 18000000 },
  { month: 'Apr 2024', disbursed: 18000000, utilized: 17000000 },
  { month: 'May 2024', disbursed: 22000000, utilized: 19000000 },
];

/**
 * Chart component showing loan utilization patterns
 * @returns {JSX.Element} The rendered chart
 */
const UtilizationChart = () => {
  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-blue-900">Loan Disbursement vs Utilization (2024)</CardTitle>
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
              <ChartTooltip formatter={(value) => formatIndianCurrency(value)} />
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
  );
};

export default UtilizationChart;