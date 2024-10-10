'use client';
import { useState } from 'react';
import { columns } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import BaseCard from '@/components/baseCard';
import {
  Input, 
  FormControl,
  FormErrorMessage,
  HStack
} from '@chakra-ui/react'
import {Button} from "@/components/ui/button";
import NavBar from '@/components/navBar';


export default function PredictionPage() {
  const [data, setData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [predictionTextOutput, setPredictionTextOutput] = useState('');
  const [cardColor, setCardColor] = useState('bg-blue-500');
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitPrediction = async (event) => {
    console.log("Valor de KNR inserido: " + inputValue);
    event.preventDefault();
    const isValid = validateInput();
    setIsSubmitted(true);
    if (!isValid) {
      setIsError(true);
      return;
    }

    setIsError(false);
    console.log(`URL: ${process.env.NEXT_PUBLIC_BACKEND_AWS}/predict`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_AWS}/predict`, {
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
      alert("Erro na requisição. Tente novamente.");
      return;
    }

    const responseJson = await response.json();
    console.log(responseJson);

    responseJson['KNR'] = inputValue;
    responseJson['model'] = 'It-Cross';

    console.log("Resultado da predição: " + responseJson['prediction']);

    setData([responseJson]);
    setInputValue('');
    setShowTable(true);


    if (responseJson['prediction'] == 1) {
      setPredictionTextOutput("Teste Longo");
      setCardColor('bg-red-600');
    } else {
      setPredictionTextOutput("Teste curto");
      setCardColor('bg-green-600');
    }
  };

  const validateInput = (e) => { 
    const regex = /^\d{4}-\d{7}$/;
    return regex.test(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (isSubmitted) {
      setIsError(false);
      setIsSubmitted(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <header>
        <NavBar />
      </header>
      <div className="w-full flex space-x-4 px-10 mb-6">
        <form onSubmit={submitPrediction} className='flex flex-start space-x-4 w-full'>
          <FormControl isInvalid={isError} className="flex flex-col w-200" >
          <HStack spacing={2}>
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Insira o KNR no formato 0000-0000000"  
              required
              className='w-100'
            />
          <Button className='bg-blue-500 hover:bg-blue-600 text-white' type="submit">OK</Button>
          </HStack>
          {isError && (<FormErrorMessage>Formato inválido. Insira o KNR no formato 0000-0000000</FormErrorMessage>)}
          </FormControl>
        </form>
      </div>

      {showTable && data && <DataTable columns={columns} data={data} />}

      {showTable && data && (
        <div className="flex justify-center items-center mt-6">
          <BaseCard text={predictionTextOutput} color={cardColor} />  {/* Passa a cor como prop */}
        </div>
      )}
    </main>
  );
}
