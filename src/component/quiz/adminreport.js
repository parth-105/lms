"use client"
import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from "@/components/ui/button";

function AdminReports() {
  const [reportsData, setReportsData] = React.useState([]);
 
  const [filters, setFilters] = React.useState({
    examName: "",
    userName: "",
  });


  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(10)
  const [paginatedResults, setPaginatedResults] = React.useState([])


  useEffect(() => {
    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    setPaginatedResults(reportsData?.slice(indexOfFirstResult, indexOfLastResult))
  }, [currentPage,reportsData, resultsPerPage])

  const totalPages = Math.ceil(reportsData?.length / resultsPerPage)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }



  

  const getData = async (tempFilters) => {
    try {

    const response = await axios.post("/api/report/get-all-reports" , tempFilters)
   
      if (response.data.success) {
        setReportsData(response.data.data);
      } else {
        message.error(response.data.message);
      }

    } catch (error) {
    ;
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, []);

  return (
    <div className="flex  flex-col mt-1 " >
      
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <Button
          className="transition-transform hover:scale-105"
          onClick={() => {
            setFilters({
              examName: "",
              userName: "",
            });
            getData({
              examName: "",
              userName: "",
            });
          }}
        >
          Clear 
        </Button>
        <Button className="transition-transform hover:scale-105" onClick={() => getData(filters)}>
          Search
        </Button>
      </div>
      {/* <Table columns={columns} dataSource={reportsData} className="mt-2" /> */}
      <Card className="w-full max-w-4xl mt-3 h-80 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Exam Results </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption className=" fixed bottom-14 right-[26rem] ">A summary of exam results  </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Exam Name</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total Marks</TableHead>
              <TableHead className="text-right">Passing Marks</TableHead>
              <TableHead className="text-right">Obtained Marks</TableHead>
              <TableHead className="text-center">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {paginatedResults.filter((_, index) => index % 2 === 0).map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{record.exam ? record.exam.name : 'N/A'}</TableCell>

                <TableCell className="font-medium">{record?.user?.name }</TableCell>

                <TableCell>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</TableCell>
                <TableCell className="text-right">{record.exam? record.exam.totalMarks:"n/a"}</TableCell>
                <TableCell className="text-right">{record.exam? record.exam.passingMarks:"n/a"}</TableCell>
                <TableCell className="text-right">{record.result?record.result.correctAnswers.length:"n/a"}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      record?.result.correctAnswers.length >= record.exam?.passingMarks
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.result?record.result.verdict:"n/a"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className=" fixed  w-[65%]  bottom-0 ">
          <div className="flex   items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            className=" cursor-pointer transition-transform hover:scale-105"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            className=" cursor-pointer transition-transform hover:scale-105"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </Button>
          </div>
        </div>

      </CardContent>
    </Card>
    </div>
  );
}

export default AdminReports;
