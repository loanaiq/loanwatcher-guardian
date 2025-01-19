import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
 * Header component for the dashboard showing key metrics
 * @returns {JSX.Element} The rendered header
 */
const DashboardHeader = () => {
  console.log("Rendering Dashboard Header");
  
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center p-1">
          <img
            src="/lovable-uploads/0473091d-142b-4ba1-86f8-14a9e67da0d6.png"
            alt="Janakalyan Bank Logo"
            className="w-14 h-14 object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-primary">
          Janakalyan Bank - Loan Monitoring Dashboard
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-2 border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Disbursement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatIndianCurrency(85000000)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              Utilization Rate
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-white border-2 border-gray-300">
                    <p>Utilization Rate measures how effectively loan funds are being used:</p>
                    <ul className="list-disc ml-4 mt-1">
                      <li>Actual funds used vs. sanctioned amount</li>
                      <li>Speed of fund deployment</li>
                      <li>Purpose alignment</li>
                      <li>Seasonal variations</li>
                      <li>Industry benchmarks</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Average across all accounts</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              Risk Score
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-white border-2 border-gray-300">
                    <p>Risk Score indicates the overall lending risk based on:</p>
                    <ul className="list-disc ml-4 mt-1">
                      <li>Payment history</li>
                      <li>Fund utilization patterns</li>
                      <li>Transaction behavior</li>
                      <li>Compliance adherence</li>
                      <li>Market sector performance</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Medium</div>
            <p className="text-xs text-muted-foreground">Based on current patterns</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Loan Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardHeader;
