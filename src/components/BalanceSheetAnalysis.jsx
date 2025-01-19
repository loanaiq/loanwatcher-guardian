/**
 * @typedef {Object} BalanceSheetData
 * @property {number} year
 * @property {string} auditStatus
 * @property {number} capital
 * @property {number} unsecuredLoanOwnSource
 * @property {number} termLoanExisting
 * @property {number} installmentDueWithinYear
 * @property {number} cc
 * @property {number} sundryCrs
 * @property {number} otherLiabilities
 * @property {number} total
 */

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/**
 * @returns {JSX.Element}
 */
const BalanceSheetAnalysis = () => {
  /** @type {BalanceSheetData[]} */
  const balanceSheetData = [
    {
      year: 2018,
      auditStatus: 'Aud',
      capital: 980.25,
      unsecuredLoanOwnSource: 150.00,
      termLoanExisting: 750.30,
      installmentDueWithinYear: 0,
      cc: 65.00,
      sundryCrs: 550.20,
      otherLiabilities: 220.15,
      total: 2715.90
    },
    {
      year: 2019,
      auditStatus: 'Aud',
      capital: 1050.45,
      unsecuredLoanOwnSource: 175.25,
      termLoanExisting: 800.15,
      installmentDueWithinYear: 0,
      cc: 68.50,
      sundryCrs: 580.30,
      otherLiabilities: 235.20,
      total: 2909.85
    },
    {
      year: 2020,
      auditStatus: 'Aud',
      capital: 1095.80,
      unsecuredLoanOwnSource: 185.50,
      termLoanExisting: 845.25,
      installmentDueWithinYear: 0,
      cc: 70.25,
      sundryCrs: 625.45,
      otherLiabilities: 245.30,
      total: 3067.55
    },
    {
      year: 2021,
      auditStatus: 'Aud',
      capital: 1141.67,
      unsecuredLoanOwnSource: 194.12,
      termLoanExisting: 888.66,
      installmentDueWithinYear: 0,
      cc: 72.51,
      sundryCrs: 672.57,
      otherLiabilities: 254.18,
      total: 3223.71
    },
    {
      year: 2022,
      auditStatus: 'Aud',
      capital: 1208.82,
      unsecuredLoanOwnSource: 55.18,
      termLoanExisting: 848.44,
      installmentDueWithinYear: 0,
      cc: 61.89,
      sundryCrs: 585.08,
      otherLiabilities: 302.80,
      total: 3062.21
    },
    {
      year: 2023,
      auditStatus: 'Aud',
      capital: 1393.12,
      unsecuredLoanOwnSource: 69.89,
      termLoanExisting: 984.44,
      installmentDueWithinYear: 14.69,
      cc: 86.38,
      sundryCrs: 682.78,
      otherLiabilities: 350.33,
      total: 3581.63
    },
    {
      year: 2024,
      auditStatus: 'Prov',
      capital: 1741.82,
      unsecuredLoanOwnSource: 56.83,
      termLoanExisting: 1351.18,
      installmentDueWithinYear: 161.92,
      cc: 75.00,
      sundryCrs: 480.54,
      otherLiabilities: 261.11,
      total: 4128.40
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center p-1">
          <img
            src="/lovable-uploads/0473091d-142b-4ba1-86f8-14a9e67da0d6.png"
            alt="Janakalyan Bank Logo"
            className="w-14 h-14 object-contain"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Onboarding of Business Customer
        </h1>
      </div>

      <Card className="border-2 border-gray-300">
        <CardContent className="overflow-x-auto p-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2 border-gray-300">
                <TableHead className="w-[250px] bg-muted border-r-2 border-gray-300 font-semibold text-gray-700 text-base">
                  Liabilities
                </TableHead>
                {balanceSheetData.map((data, index) => (
                  <TableHead 
                    key={data.year} 
                    className={`text-right bg-muted font-semibold text-gray-700 text-base ${
                      index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''
                    }`}
                  >
                    {data.year} ({data.auditStatus})
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-200">
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Capital</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.capital.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Unsec. Loan - Own Source</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.unsecuredLoanOwnSource.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Term Loan (existing)</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.termLoanExisting.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Installment due within one year</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.installmentDueWithinYear.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">CC</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.cc.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Sundry Crs</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.sundryCrs.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Other Creditors / liabilities</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.otherLiabilities.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-gray-100 border-r-2 border-gray-300">TOTAL</TableCell>
                {balanceSheetData.map((data, index) => (
                  <TableCell 
                    key={data.year} 
                    className={`text-right font-bold bg-gray-100 ${index !== balanceSheetData.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {data.total.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSheetAnalysis;