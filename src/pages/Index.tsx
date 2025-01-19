import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UtilizationChart from "@/components/dashboard/UtilizationChart";
import ComplianceTable from "@/components/dashboard/ComplianceTable";
import BehavioralMonitoring from "@/components/dashboard/BehavioralMonitoring";
import TransactionAnalysis from "@/components/dashboard/TransactionAnalysis";

const Index = () => {
  console.log("Rendering Janakalyan Bank loan monitoring dashboard");
  
  return (
    <div className="container mx-auto p-6 bg-background">
      <DashboardHeader />
      
      <Tabs defaultValue="utilization" className="space-y-4">
        <TabsList className="bg-card border-2 border-gray-300 p-1">
          <TabsTrigger value="utilization" className="data-[state=active]:bg-muted">
            Utilization Patterns
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-muted">
            Compliance Analysis
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-muted">
            Behavioral Monitoring
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-muted">
            Transaction Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="utilization">
          <UtilizationChart />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceTable />
        </TabsContent>

        <TabsContent value="monitoring">
          <BehavioralMonitoring />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;