"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { ChevronLeft, X, Loader2, Database } from "lucide-react"

const SchemaDialog = ({ open, onOpenChange, schema }) => {
  const [selectedTable, setSelectedTable] = useState(null)

  const handleTableClick = (table) => {
    setSelectedTable(table)
  }

  const handleBack = () => {
    setSelectedTable(null)
  }

  if (!schema || !schema.tableSchema) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#363636] text-white">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Database Schema</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#363636] text-white max-w-3xl max-h-[80vh] flex flex-col [&_*::-webkit-scrollbar]:w-2 [&_*::-webkit-scrollbar-thumb]:bg-gray-600 [&_*::-webkit-scrollbar-thumb]:rounded-full [&_*::-webkit-scrollbar-track]:bg-gray-800/40">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {selectedTable ? `${selectedTable.tableName} Schema` : 'Database Schema'}
          </DialogTitle>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-white hover:bg-gray-700"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {selectedTable ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:bg-gray-700 w-fit"
              onClick={handleBack}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tables
            </Button>
            
            <div className="border border-gray-700 rounded-lg overflow-hidden flex-1">
              <div className="overflow-y-auto max-h-[calc(80vh-180px)]">
                <Table>
                  <TableHeader className="sticky top-0 z-10">
                    <TableRow className="border-b border-gray-700 bg-gray-800/50">
                      <TableCell className="text-white font-semibold py-4 px-6 border-r border-gray-700">
                        Column Name
                      </TableCell>
                      <TableCell className="text-white font-semibold py-4 px-6">
                        Data Type
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTable.columns.map((column, index) => (
                      <TableRow 
                        key={index}
                        className={`
                          border-b border-gray-700 
                          hover:bg-gray-700/50 
                          transition-colors
                          ${index === selectedTable.columns.length - 1 ? 'border-b-0' : ''}
                        `}
                      >
                        <TableCell className="py-3 px-6 text-white border-r border-gray-700">
                          {column.column_name}
                        </TableCell>
                        <TableCell className="py-3 px-6 text-white">
                          <span className="text-green-400">
                            {column.data_type}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[calc(80vh-100px)]">
            {schema.tableSchema.map((table, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-6 text-left bg-gray-800 hover:bg-gray-700 border-green-400/20 transition-colors h-auto"
                onClick={() => handleTableClick(table)}
              >
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-400/10 rounded-lg">
                      <Database className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="px-2 py-1 rounded-md bg-gray-700/50 text-xs text-green-400">
                      {table.columns.length} columns
                    </div>
                  </div>
                  <div className="text-base text-white font-medium">
                    {table.tableName}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SchemaDialog 