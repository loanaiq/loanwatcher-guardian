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

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Edit2, Save, X } from "lucide-react";

const BalanceSheetAnalysis = () => {
  /** @type {BalanceSheetData[]} */
  const initialData = [
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

  const [data, setData] = useState(initialData);
  const [editingRow, setEditingRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const { toast } = useToast();

  const handleEdit = (index) => {
    setEditingRow(index);
    setEditedValues(data[index]);
  };

  const handleSave = (index) => {
    const newData = [...data];
    newData[index] = {
      ...editedValues,
      total: calculateTotal(editedValues)
    };
    setData(newData);
    setEditingRow(null);
    setEditedValues({});
    
    toast({
      title: "Changes saved",
      description: "The balance sheet data has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedValues({});
  };

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setEditedValues(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateTotal = (rowData) => {
    const fields = [
      'capital',
      'unsecuredLoanOwnSource',
      'termLoanExisting',
      'installmentDueWithinYear',
      'cc',
      'sundryCrs',
      'otherLiabilities'
    ];
    return fields.reduce((sum, field) => sum + (parseFloat(rowData[field]) || 0), 0);
  };

  const renderCell = (rowIndex, field, value) => {
    if (editingRow === rowIndex && field !== 'year' && field !== 'auditStatus' && field !== 'total') {
      return (
        <Input
          type="number"
          value={editedValues[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-32"
          step="0.01"
        />
      );
    }
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

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
                {data.map((rowData, index) => (
                  <TableHead 
                    key={rowData.year} 
                    className={`text-right bg-muted font-semibold text-gray-700 text-base ${
                      index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{rowData.year} ({rowData.auditStatus})</span>
                      {editingRow === index ? (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSave(index)}
                            className="h-6 w-6"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCancel}
                            className="h-6 w-6"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(index)}
                          className="h-6 w-6"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:border-b-2 [&_tr]:border-gray-200">
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Capital</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'capital', rowData.capital)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Unsec. Loan - Own Source</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'unsecuredLoanOwnSource', rowData.unsecuredLoanOwnSource)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Term Loan (existing)</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'termLoanExisting', rowData.termLoanExisting)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Installment due within one year</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'installmentDueWithinYear', rowData.installmentDueWithinYear)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">CC</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'cc', rowData.cc)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Sundry Crs</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'sundryCrs', rowData.sundryCrs)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-gray-50 border-r-2 border-gray-300">Other Creditors / liabilities</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {renderCell(index, 'otherLiabilities', rowData.otherLiabilities)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-gray-100 border-r-2 border-gray-300">TOTAL</TableCell>
                {data.map((rowData, index) => (
                  <TableCell 
                    key={rowData.year} 
                    className={`text-right font-bold bg-gray-100 ${index !== data.length - 1 ? 'border-r-2 border-gray-300' : ''}`}
                  >
                    {rowData.total.toFixed(2)}
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
