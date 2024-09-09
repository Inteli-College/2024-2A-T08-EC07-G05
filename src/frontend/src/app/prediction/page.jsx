'use client';
import { useState } from 'react';
import { columns } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import BaseCard from '@/components/baseCard';
import { Button,
  Input, 
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text
} from '@chakra-ui/react'

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

    const responseJson = await response.json();
    console.log(responseJson);

    responseJson['KNR'] = inputValue;
    responseJson['model'] = 'It-Cross';

    console.log("Resultado da predição: " + responseJson['prediction']);

    setData([responseJson]);
    setShowTable(true);

    // Atualiza o estado com base na predição
    if (responseJson['prediction'] == 1) {
      setPredictionTextOutput("Suscetível a teste");
      setCardColor('bg-red-600');  // Define a cor verde para resultado positivo
    } else {
      setPredictionTextOutput("NÃO suscetível a teste");
      setCardColor('bg-green-600');  // Define a cor vermelha para resultado negativo
    }
  };

  const homeClick = () => {
    window.location.href = '/';
  };

  const validateInput = (e) => { 
    const regex = /^\d{4}-\d{7}$/;
    return regex.test(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (isSubmitted) {
      setIsError(false);
      setIsSubmitted(false);  // Reset submission status when user edits
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-10">
      <div className="w-full flex space-x-4 mb-6">
        <Button colorScheme='blue' onClick={homeClick}>
          <img src="/icone_home.svg" className='w-5'></img>
        </Button>
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
          <Button colorScheme='blue' type="submit">OK</Button>
          </HStack>
          {isError && (<FormErrorMessage>Formato inválido. Insira o KNR no formato 0000-0000000</FormErrorMessage>)}
          </FormControl>
        </form>
      </div>

      {showTable && data && <DataTable columns={columns} data={data} />}

      {showTable && data && (
        <div className="flex justify-center items-center mt-6">
          <Card align='center'>
            <CardHeader>
              <Heading size='md'> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Button colorScheme='blue'>View here</Button>
            </CardFooter>
          </Card>
          <BaseCard text={predictionTextOutput} color={cardColor} />  {/* Passa a cor como prop */}
        </div>
      )}
    </main>
  );
}
