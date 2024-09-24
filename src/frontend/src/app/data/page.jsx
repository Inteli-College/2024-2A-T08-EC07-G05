"use client";  // Add this line at the top

import React, { useState } from "react";
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
} from "@chakra-ui/react";

function DataPage() {
  const [datasets, setDatasets] = useState([
    { nome: "Dataset 1", data: "2024-09-23" },
    { nome: "Dataset 2", data: "2024-09-24" },
  ]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileUpload = () => {
    if (file) {
      console.log("File uploaded:", file.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <Box minH="100vh" p={6} bg="gray.100">
      {/* Page heading */}
      <Heading as="h1" size="lg" color="blue.600" mb={6}>
        Página de Dados
      </Heading>

      {/* Card showing dataset count */}
      <Card p={4} mb={6} shadow="md">
        <Heading as="h2" size="md" mb={2}>
          Total de Conjuntos de Dados
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
            </Tr>
          </Thead>
          <Tbody>
            {datasets.length > 0 ? (
              datasets.map((dataset, index) => (
                <Tr key={index}>
                  <Td>{dataset.nome}</Td>
                  <Td>{dataset.data}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={2} textAlign="center">
                  Nenhum conjunto de dados disponível
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* File upload section */}
      <Card p={4} mb={6} shadow="md">
        <Heading as="h2" size="md" mb={2}>
          Envie um Arquivo Excel
        </Heading>
        <Input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          mb={4}
        />
        <Button colorScheme="blue" onClick={handleFileUpload}>
          Enviar Arquivo
        </Button>
      </Card>

      {/* Button to go to /models page */}
      <Button
        colorScheme="blue"
        onClick={() => (window.location.href = "/models")}
      >
        Ir para Modelos
      </Button>
    </Box>
  );
}

export default DataPage;