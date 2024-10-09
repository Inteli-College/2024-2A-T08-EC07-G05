"use client";  // Make sure it's at the top


import React, { useState } from "react";
import NavBar from "@/components/navBar";

import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Card,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { DataTable } from "@/components/ui/data-table";

function DataPage() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hook
  const [datasets, setDatasets] = useState([
    { datasetName: "Dataset 1", date: "2024-09-23", numberOfRows: 10 },
    { datasetName: "Dataset 2", date: "2024-09-24", numberOfRows: 20 },
  ]);
  
  const [files, setFiles] = useState({ falhas: null, resultados: null, status: null });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if files are uploaded successfully
  
  const handleFileChange = (event, fileType) => {
    setFiles({ ...files, [fileType]: event.target.files ? event.target.files[0] : null });
  };
  
  const handleFileUpload = () => {
    if (files.falhas && files.resultados && files.status) {
      console.log("Falhas:", files.falhas.name);
      console.log("Resultados:", files.resultados.name);
      console.log("Status:", files.status.name);
      
      // Simulate a successful file upload
      setIsSubmitted(true); // Show confirmation
      onClose(); // Close modal after upload
    } else {
      console.log("Not all files selected");
    }
  };
  
  // Check if all files are selected
  const isDisabled = !(files.falhas && files.resultados && files.status);
  
  const dataInfoColumns = [
    {
      accessorKey: "datasetName",
      header: "Nome do dataset",
    },
    {
      accessorKey: "date",
      header: "Data",
    },
    {
      accessorKey: "numberOfRows",
      header: "Quantidade de carros",
    },
  ]

  return (
    <>
    {/* Page heading */}
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col min-h-screen p-4">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Dados inseridos no modelo</h2>
          <DataTable columns={dataInfoColumns} data={datasets}></DataTable>
        </div>

      <br />

      {/* Button container with proper spacing */}
      <Stack direction="row" spacing={4} justify="left" mb={6}>
        {/* Button to open modal for file upload */}
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={onOpen}>
          Enviar Arquivos
        </Button>

        {/* Button to go to /models page */}
        <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => (window.location.href = "/models")}>
          Novo Modelo
        </Button>
      </Stack>

      {/* Modal for file uploads */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Envie os Arquivos</ModalHeader>
          <ModalBody>
            <Box mb={4}>
              <Text>Arquivo de Falhas:</Text>
              <Input
                type="file"
                accept=".xlsx, .xls"
                onChange={(event) => handleFileChange(event, "falhas")}
                />
            </Box>
            <Box mb={4}>
              <Text>Arquivo de Resultados:</Text>
              <Input
                type="file"
                accept=".xlsx, .xls"
                onChange={(event) => handleFileChange(event, "resultados")}
              />
            </Box>
            <Box mb={4}>
              <Text>Arquivo de Status:</Text>
              <Input
                type="file"
                accept=".xlsx, .xls"
                onChange={(event) => handleFileChange(event, "status")}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleFileUpload} isDisabled={isDisabled} mr={3}>
              Enviar Arquivos
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Show confirmation after successful upload */}
      {isSubmitted && (
        <Alert status="success" variant="solid" mt={6}>
          <AlertIcon />
          <AlertTitle>Arquivos enviados com sucesso!</AlertTitle>
          <AlertDescription>Todos os arquivos foram enviados corretamente.</AlertDescription>
        </Alert>
      )}
    </main>
    </>
  );
}

export default DataPage;
