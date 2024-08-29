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
    console.log(inputValue);  // Aqui você pode usar o valor do input
    const response = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      body: JSON.stringify({
        knr: inputValue  // Certifique-se de que o campo `knr` é o que a API espera
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'  // Define o cabeçalho para JSON
      }
    });

    if (!response.ok) {
      console.error("Erro na requisição:", response.statusText);
      return;
    }

    const jsonData = await response;
    console.log(jsonData);
    //setData([jsonData[0]]);  // Armazena apenas o primeiro resultado no estado (note que é um array)
    //setShowTable(true);  // Mostra a tabela
  };

  // Função de callback para capturar o valor do input
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
      <p>oi tudo bem</p>
    </main>
  );
}
