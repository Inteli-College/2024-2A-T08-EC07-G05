'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/ui/data-table';
import Link from "next/link";

function TrainModelPage() {
  const [modelsData, setModelsData] = useState([]);
  const [modelMetric, setModelMetric] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const modelsColumns = [
    {
      accessorKey: "date",
      header: "Data",
    },
    {
      accessorKey: "carQuantity",
      header: "Quantidade de Carros",
      cell: ({ cell }) => {
        const carQuantity = cell.getValue();
        return carQuantity ? `${carQuantity} carros` : '-';
      }
    },
    {
      accessorKey: "name",
      header: "Nome do Modelo",
    },
  ];

  useEffect(() => {
    const mockData = [
      { date: "2024-09-01", carQuantity: 5, name: "Modelo 1" },
      { date: "2024-09-02", carQuantity: 10, name: "Modelo 2" },
    ];
    setModelsData(mockData);
    setModelMetric(92.5);
  }, []);

  const handleNewModel = () => {
    alert('Novo modelo será criado!');
  };

  const paginatedData = modelsData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header>
        <nav className="flex flex-start items-center p-4 gap-4">
          <Link href="/history">
            Histórico de Modelos
          </Link>
          <Link href="/addData">
            Adicionar Dados
          </Link>
          <Link href="/trainModel">
            Treinar Modelo
          </Link>
        </nav>
        <div className="absolute top-4 right-4">
          <Button className='bg-blue-500 hover:bg-blue-600 text-white' onClick={handleNewModel}>
            Criar Novo Modelo
          </Button>
        </div>
      </header>

      <div className="my-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Métrica do Modelo Atual</h2>
        <div className="bg-gray-200 p-6 text-center rounded-lg">
          <p className="text-xl">Precisão: <span className="font-semibold">{modelMetric}%</span></p>
        </div>
      </div>

      <div className="my-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Modelos Criados</h2>
        <DataTable columns={modelsColumns} data={paginatedData} />
      </div>
    </div>
  );
}

export default TrainModelPage;
