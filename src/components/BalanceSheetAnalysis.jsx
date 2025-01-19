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

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/**
 * @returns {JSX.Element}
 */
const BalanceSheetAnalysis = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

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
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Onboarding of Business Customer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {balanceSheetData.map((data) => (
                  <SelectItem key={data.year} value={data.year.toString()}>
                    {data.year} ({data.auditStatus})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Liabilities</TableHead>
                <TableHead className="text-right">Amount (in lakhs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {balanceSheetData
                .filter((data) => data.year.toString() === selectedYear)
                .map((data) => (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">Capital</TableCell>
                      <TableCell className="text-right">{data.capital.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Unsec. Loan - Own Source</TableCell>
                      <TableCell className="text-right">{data.unsecuredLoanOwnSource.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Term Loan (existing)</TableCell>
                      <TableCell className="text-right">{data.termLoanExisting.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Installment due within one year</TableCell>
                      <TableCell className="text-right">{data.installmentDueWithinYear.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CC</TableCell>
                      <TableCell className="text-right">{data.cc.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sundry Crs</TableCell>
                      <TableCell className="text-right">{data.sundryCrs.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Other Creditors / liabilities</TableCell>
                      <TableCell className="text-right">{data.otherLiabilities.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold">TOTAL</TableCell>
                      <TableCell className="text-right font-bold">{data.total.toFixed(2)}</TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSheetAnalysis;