import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ShieldAlert, TrendingUp, Activity } from "lucide-react";
import { customerSegments } from "@/data/customerData";

const BehavioralMonitoring = () => {
  return (
    <Card className="border-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-blue-900">Behavioral Monitoring & Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {customerSegments.map((customer) => (
            <Card key={customer.id} className={`border-l-4 ${
              customer.behavioralScore === "Good" 
                ? "border-l-green-500" 
                : customer.behavioralScore === "Needs Monitoring"
                ? "border-l-yellow-500"
                : "border-l-red-500"
            } p-4`}>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{customer.name}</h3>
                  <Badge variant="outline" className={`${
                    customer.behavioralScore === "Good" 
                      ? "bg-green-50 text-green-800 border-green-200" 
                      : customer.behavioralScore === "Needs Monitoring"
                      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}>
                    {customer.behavioralScore}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Loan Misuse</p>
                      <p className="text-sm text-gray-600">{customer.patterns.loanMisuse}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">Fraud Risk</p>
                      <p className="text-sm text-gray-600">{customer.patterns.fraudRisk}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium">Fund Diversion</p>
                      <p className="text-sm text-gray-600">{customer.patterns.fundDiversion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Active Alerts</p>
                      <p className="text-sm text-gray-600">{customer.patterns.alerts} alerts</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BehavioralMonitoring;