'use client';
import React, { useEffect, useState } from 'react';
import "./style.css";
import LoadingPage from "../../components/loadingBar";
import { Button, Table, Thead, Tbody, Tr, Th, Td, Box, TableContainer } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

function HistoryPage() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  
  const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };
  
  
  const historyColumns = [
    {
      accessorKey: "KNR",
      header: "KNR",
    },
    {
      groupKey: "HALLE_TIMES",
      columns: [
        {
          accessorKey: "HALLE_TIMES.ZP5",
          header: "ZP5",
        },
        {
          accessorKey: "HALLE_TIMES.ZP5A",
          header: "ZP5A",
        },
        {
          accessorKey: "HALLE_TIMES.ZP61",
          header: "ZP61",
        },
        {
          accessorKey: "HALLE_TIMES.ZP6 || HALLE_TIMES.ZP62",
          header: "ZP6/ZP62",
        },
        {
          accessorKey: "HALLE_TIMES.CAB",
          header: "CAB",
        },
        {
          accessorKey: "HALLE_TIMES.ZP7",
          header: "ZP7",
        },
        {
          accessorKey: "HALLE_TIMES.ROD",
          header: "ROD",
        },
        {
          accessorKey: "HALLE_TIMES.AGUA",
          header: "AGUA",
        },
        {
          accessorKey: "HALLE_TIMES.ZP8",
          header: "ZP8",
        },
        {
          accessorKey: "HALLE_TIMES.ESPC",
          header: "ESPC",
        },
        {
          accessorKey: "HALLE_TIMES.Total",
          header: "Total",
        },
      ],
      header: "Tempo",
    },
    {
      accessorKey: "OUTPUT_MODELO",
      header: "Predição (há falha?)",
    },
    {
      accessorKey: "RESULTADO_TESTE",
      header: "Resultado teste (há falha?)",
    },
  ];

  const homeClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 10; // Simula o progresso até 90%
          return prev;
        });
      }, 500); // Aumenta o progresso a cada 500ms

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect( () => {
    fetch('http://127.0.0.1:8000/getHistory')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setProgress(100);
      })
  }, [])

  if (isLoading) return <LoadingPage progress={progress} />;
  if (!data) return <p>No profile data</p>;
  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  console.log(data)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with Home Icon and Title */}
      <div className="flex items-center mb-4">
      <Button colorScheme='blue' onClick={homeClick}>
          <img src="/icone_home.svg" className='w-5'></img>
        </Button>
        <a href="/analysis" className="ml-4 text-gray-700 font-semibold text-lg">Análise</a>
      </div>

      {/* Main Table */}
      <div>
      <Box p={4}>
        <TableContainer>
          <Table variant="striped" size="md" colorScheme='blue' width="100%">
            <Thead>
              <Tr colSpan={14} className='text-wrap justify-center'>
                <Th>KNR</Th>
                <Th colSpan={11}>Tempo</Th>
                <Th>Predição (há falha?)</Th>
                <Th>Resultado teste (há falha?)</Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th whiteSpace="normal" maxWidth="100px">ZP5</Th>
                <Th whiteSpace="normal" maxWidth="100px">ZP5A</Th>
                <Th whiteSpace="normal" maxWidth="100px">ZP61</Th>
                <Th whiteSpace="normal" maxWidth="100px">ZP6/ZP62</Th>
                <Th whiteSpace="normal" maxWidth="100px">CAB</Th>
                <Th whiteSpace="normal" maxWidth="100px">ZP7</Th>
                <Th whiteSpace="normal" maxWidth="100px">ROD</Th>
                <Th whiteSpace="normal" maxWidth="100px">AGUA</Th>
                <Th whiteSpace="normal" maxWidth="100px">ZP8</Th>
                <Th whiteSpace="normal" maxWidth="100px">ESPC</Th>
                <Th>Total</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.map((row) => (
                <Tr key={row.KNR}>
                  <Td>{row.KNR}</Td>
                {['ZP5', 'ZP51', 'ZP6', 'ZP62', 'CAB', 'ZP7', 'ROD', 'AGUA', 'ZP8', 'ESPC'].map((col) => (
                  <Td 
                  whiteSpace="normal" maxWidth="100px"
                  key={col}>{row.HALLE_TIMES[col] !== undefined ? row.HALLE_TIMES[col] : '-'}</Td>
                ))}
                <Td>-</Td>
                  <Td>{row.OUTPUT_MODELO === null ? "-" : (row.OUTPUT_MODELO ? "S" : "N")}</Td>
                  <Td>{row.RESULTADO_TESTE === null ? "-" : (row.RESULTADO_TESTE ? "S" : "N")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Paginador */}
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próximo'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(data.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          className='flex justify-center mt-4 gap-2' 
        />
      </Box>

      </div>
    </div>
  );
}

export default HistoryPage;