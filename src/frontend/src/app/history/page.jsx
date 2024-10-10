'use client';
import React, { useEffect, useState } from 'react';
import LoadingPage from "../../components/loadingBar";
import ReactPaginate from 'react-paginate';
import { DataTable } from '@/components/ui/data-table';
import NavBar from '@/components/navBar';


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
      accessorKey: "ZP5_MIN",
      header: "ZP5",
      cell: ({cell}) => {
        return cell.getValue().toFixed(3);
      }
    },
    {
      accessorKey: "ZP5A_MIN",
      header: "ZP5A",
      cell: ({cell}) => {
        return cell.getValue().toFixed(3);
      }
    },
    {
      accessorKey: "ZP61_MIN",
      header: "ZP61",
      cell: ({cell}) => {
        return cell.getValue().toFixed(3);
      }
    },
    {
      accessorKey: "ZP6_ZP62_MIN",
      header: "ZP6 / ZP62",
      cell: ({cell}) => {
        return cell.getValue().toFixed(3);
      }
    },
    {
      accessorKey: "CAB_MIN",
      header: "CAB",
      cell: ({cell}) => {
        return cell.getValue().toFixed(3);
      }
    },
    {
      accessorKey: "OUTPUT_MODELO",
      header: "Predição (há falha?)",
      cell: ({cell}) => {
        if (cell.OUTPUT_MODELO === 1) {
          return "Sim";
        }
        else {
          if (cell.OUTPUT_MODELO === 0) {
            return "Não";
          }
        return "-";
        }
    },
    }
  
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 10; 
          return prev;
        });
      }, 500); 

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect( () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_AWS}/getHistory`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data);
        setLoading(false);
        setProgress(100);
      })
  }, [])

  if (isLoading) return <LoadingPage progress={progress} />;
  if (!data) return <p>No profile data</p>;
  const paginatedData = Array.isArray(data) ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];
  console.log(data)

  return (
    <main className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>
      <div className="min-h-screen p-4">
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
    </main>
  );
}

export default HistoryPage;