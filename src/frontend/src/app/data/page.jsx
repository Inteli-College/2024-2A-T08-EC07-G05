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

function DataPage() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hook
  const [datasets, setDatasets] = useState([
    { nome: "Dataset 1", data: "2024-09-23", quantidade_de_carros: 10 },
    { nome: "Dataset 2", data: "2024-09-24", quantidade_de_carros: 20 },
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

  return (
    <main className="flex flex-col min-h-screen">
      {/* Page heading */}
      <header>
        <NavBar />
      </header>
      <Heading as="h1" size="lg" color="blue.600" mb={6}>
        Página de Dados
      </Heading>

      {/* Card showing dataset count */}
      <Card p={4} mb={6} shadow="md">
        <Heading as="h2" size="md" mb={2}>
          Total de Dados Adicionados
        </Heading>
        <Text fontSize="4xl" fontWeight="bold" color="blue.600">
          {datasets.length}
        </Text>
      </Card>

      {/* Table listing datasets */}
      <TableContainer mb={6}>
        <Table variant="simple">
          <Thead bg="blue.600">
            <Tr>
              <Th color="white">Nome</Th>
              <Th color="white">Data</Th>
              <Th color="white">Quantidade de Carros</Th>
            </Tr>
          </Thead>
          <Tbody>
            {datasets.length > 0 ? (
              datasets.map((dataset, index) => (
                <Tr key={index}>
                  <Td>{dataset.nome}</Td>
                  <Td>{dataset.data}</Td>
                  <Td>{dataset.quantidade_de_carros}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3} textAlign="center">
                  Nenhum conjunto de dados disponível
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Button container with proper spacing */}
      <Stack direction="row" spacing={4} justify="left" mb={6}>
        {/* Button to open modal for file upload */}
        <Button colorScheme="blue" onClick={onOpen}>
          Enviar Arquivos
        </Button>

        {/* Button to go to /models page */}
        <Button
          colorScheme="blue"
          onClick={() => (window.location.href = "/models")}
        >
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
  );
}

export default DataPage;
