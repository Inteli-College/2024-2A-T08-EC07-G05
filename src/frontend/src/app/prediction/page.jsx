'use client';

import { useState } from 'react';
import BaseButton from "@/components/baseButton";
import InputBar from "@/components/inputBar";
import IconHome from "@/../public/icone_home.svg";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function PredictionPage() {
  const [data, setData] = useState(null);  // Estado para armazenar os dados
  const [showTable, setShowTable] = useState(false);  // Estado para controlar a visibilidade da tabela

  const handleButtonClick = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonData = await response.json();

    console.log(jsonData[0]);
    setData([jsonData[0]]);  // Armazena apenas o primeiro resultado no estado (note que é um array)
    setShowTable(true);  // Mostra a tabela
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-10">
      <div className="h-12 w-full flex justify-evenly mb-6">
        <BaseButton icon={IconHome} />
        <InputBar />
        <BaseButton text='Ok' onClick={handleButtonClick} />
      </div>
      {showTable && data && <DataTable columns={columns} data={data} />}  {/* Renderiza a tabela se showTable for true */}
      <p>oi tudo bem</p>
    </main>
  );
}
