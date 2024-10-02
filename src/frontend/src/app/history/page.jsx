'use client';
import React, { useEffect, useState } from 'react';
import "./style.css";
import LoadingPage from "../../components/loadingBar";
import ReactPaginate from 'react-paginate';
import {Button } from "@/components/ui/button";
import { DataTable } from '@/components/ui/data-table';
import Link from "next/link";


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
      header: () => <div className="text-center">Tempo</div>,
      columns: [
        {
          accessorKey: "HALLE_TIMES.ZP5",
          header: "ZP5",
          cell: ({cell}) => {
            return cell.getValue("ZP5") === undefined ? "-" : cell.getValue("ZP5");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ZP5A",
          header: "ZP5A",
          cell: ({cell}) => {
            return cell.getValue("ZP5A") === undefined ? "-" : cell.getValue("ZP5A");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ZP61",
          header: "ZP61",
          cell: ({cell}) => {
            return cell.getValue("ZP61") === undefined ? "-" : cell.getValue("ZP61");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ZP6 || HALLE_TIMES.ZP62",
          header: "ZP6/ZP62",
          cell: ({cell}) => {
            return cell.getValue("ZP6") === undefined ? (cell.getValue("ZP6") === undefined ? "-" : cell.getValue("ZP5")) : cell.getValue("ZP6");
          }
        },
        {
          accessorKey: "HALLE_TIMES.CAB",
          header: "CAB",
          cell: ({cell}) => {
            return cell.getValue("CAB") === undefined ? "-" : cell.getValue("CAB");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ZP7",
          header: "ZP7",
          cell: ({cell}) => {
            return cell.getValue("ZP7") === undefined ? "-" : cell.getValue("ZP7");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ROD",
          header: "ROD",
          cell: ({cell}) => {
            return cell.getValue("ROD") === undefined ? "-" : cell.getValue("ROD");
          }
        },
        {
          accessorKey: "HALLE_TIMES.AGUA",
          header: "AGUA",
          cell: ({cell}) => {
            return cell.getValue("AGUA") === undefined ? "-" : cell.getValue("AGUA");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ZP8",
          header: "ZP8",
          cell: ({cell}) => {
            return cell.getValue("ZP8") === undefined ? "-" : cell.getValue("ZP8");
          }
        },
        {
          accessorKey: "HALLE_TIMES.ESPC",
          header: "ESPC",
          cell: ({cell}) => {
            return cell.getValue("ESPC") === undefined ? "-" : cell.getValue("ESPC");
          }
        },
        {
          header: "Total",
          cell: ({ cell }) => {
            const fields = ["ZP5", "ZP5A", "ZP61", "ZP6", "CAB", "ZP7", "ROD", "AGUA", "ZP8", "ESPC"];
            
            const total = fields.reduce((acc, field) => {
              const value = parseFloat(cell.getValue(field)) || 0;
              return acc + value;
            }, 0);
        
            return total.toFixed(2);
          },
        },
      ],
      id: "tempo",

    },
    {
      accessorKey: "OUTPUT_MODELO",
      header: "Predição (há falha?)",
      cell: ({cell}) => {
        return cell.getValue("OUTPUT_MODELO") === null ? "-" : (cell.getValue("OUTPUT_MODELO") === true ? "Sim" : "Não");
      },
    },
    {
      accessorKey: "RESULTADO_TESTE",
      header: "Resultado teste (há falha?)",
      cell: ({cell}) => {
        return cell.getValue("RESULTADO_TESTE") === null ? "-" : (cell.getValue("RESULTADO_TESTE") === true ? "Sim" : "Não");
      },
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
    fetch(`http://${window.location.hostname}:3000/getHistory`)
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
      <header>
        <nav className="flex flex-start items-center p-4 gap-4">
        <Button className='bg-blue-500 hover:bg-blue-600 text-white' onClick={homeClick}>
          <img src="/icone_home.svg" className='w-5'></img>
        </Button>
          <Link 
          href="/history">
            Histórico de registros</Link>
            <Link 
          href="/prediction">
            Predição de falhas</Link>
            <Link 
          href="/analysis">
            Análise de falhas</Link>
            <Link 
          href="/data">
            Dados do Modelo</Link>
            <Link 
          href="/models">
            Treino de Modelos</Link>
        </nav>
      </header>
      <div>
        <DataTable columns={historyColumns} data={paginatedData} />
        <ReactPaginate
          className='flex justify-center gap-4'
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil(data.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}

export default HistoryPage;