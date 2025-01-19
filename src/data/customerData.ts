export const customerSegments = [
  { 
    id: 1, 
    name: "Bharat Technologies Solutions", 
    compliance: "High", 
    risk: "Low", 
    utilizationRate: "92%",
    behavioralScore: "Good",
    patterns: {
      loanMisuse: "No patterns detected",
      fraudRisk: "Low",
      fundDiversion: "None",
      alerts: 0
    },
    transactions: {
      debit: [
        { 
          date: "2024-03-01", 
          amount: 5000000,
          category: "Equipment", 
          paymentMethod: "RTGS",
          flag: false,
          year: 2024,
          month: "March"
        },
        { 
          date: "2024-03-10", 
          amount: 2000000,
          category: "Operations", 
          paymentMethod: "NEFT",
          flag: false,
          year: 2024,
          month: "March"
        },
      ],
      credit: [
        { 
          date: "2024-03-05", 
          amount: 3000000,
          category: "Repayment", 
          paymentMethod: "Cheque",
          flag: false,
          year: 2024,
          month: "March"
        }
      ]
    }
  },
  { 
    id: 2, 
    name: "IndiaGrowth Enterprises", 
    compliance: "Medium", 
    risk: "Medium", 
    utilizationRate: "78%",
    behavioralScore: "Needs Monitoring",
    patterns: {
      loanMisuse: "Occasional personal use detected",
      fraudRisk: "Medium",
      fundDiversion: "Some instances",
      alerts: 3
    },
    transactions: {
      debit: [
        { 
          date: "2024-02-02", 
          amount: 4000000,
          category: "Inventory", 
          paymentMethod: "Cash",
          flag: true,
          year: 2024,
          month: "February"
        },
        { 
          date: "2024-02-12", 
          amount: 3500000,
          category: "Equipment", 
          paymentMethod: "RTGS",
          flag: false,
          year: 2024,
          month: "February"
        },
      ],
      credit: [
        { 
          date: "2024-02-07", 
          amount: 2500000,
          category: "Unknown", 
          paymentMethod: "Cheque",
          flag: true,
          year: 2024,
          month: "February"
        }
      ]
    }
  },
  { 
    id: 3, 
    name: "Desi Digital Services", 
    compliance: "Low", 
    risk: "High", 
    utilizationRate: "65%",
    behavioralScore: "Critical",
    patterns: {
      loanMisuse: "Frequent misuse detected",
      fraudRisk: "High",
      fundDiversion: "Multiple instances",
      alerts: 7
    },
    transactions: {
      debit: [
        { 
          date: "2024-01-03", 
          amount: 6000000,
          category: "Unknown", 
          paymentMethod: "Cash",
          flag: true,
          year: 2024,
          month: "January"
        },
        { 
          date: "2024-01-13", 
          amount: 1500000,
          category: "Operations", 
          paymentMethod: "NEFT",
          flag: false,
          year: 2024,
          month: "January"
        },
      ],
      credit: [
        { 
          date: "2024-01-08", 
          amount: 4500000,
          category: "Real Estate", 
          paymentMethod: "RTGS",
          flag: true,
          year: 2024,
          month: "January"
        }
      ]
    }
  },
];
