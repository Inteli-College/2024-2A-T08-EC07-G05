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
  const [inputValue, setInputValue] = useState('');  // Estado para armazenar o valor do input

  const handleButtonClick = async () => {

    console.log("Valor de KNR inserido: " + inputValue); 
    
    const response = await fetch(
      "http://127.0.0.1:8000/predict/", {
        
        method: "POST",

        body: JSON.stringify({
            knr: inputValue
          }),

        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

    if (!response.ok) {
      console.error("Erro na requisição:", response.statusText);
      return;
    }

    const tableInfo = await response.json();
    console.log(tableInfo);

    tableInfo['KNR'] = inputValue
    tableInfo['model'] = 'It-Cross'

    console.log("Resultado da predição: " + tableInfo['prediction'])

    setData([tableInfo]);  // Armazena apenas o primeiro resultado no estado (note que é um array)
    setShowTable(true);  // Mostra a tabela
  };

  // Função de callback pra pegar o input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);  // Atualiza o valor do input
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-10">

      <div className="h-12 w-full flex justify-evenly mb-6">
        <BaseButton icon={IconHome} />
        <InputBar onChange={handleInputChange} />  {/* Passa a função de callback */}
        <BaseButton text='Ok' onClick={handleButtonClick} />
      </div>

      {showTable && data && <DataTable columns={columns} data={data} />}  {/* Renderiza a tabela se showTable for true */}

      <p>oiiiiii tudo bem</p>
    </main>
  );
}
