"use client";

import React, { useState } from "react";
import NavBar from "@/components/navBar";
import {
  Box,
  Text,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { DataTable } from "@/components/ui/data-table";

function DataPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [datasets] = useState([
    { datasetName: "Dataset 1", date: "2024-09-23", numberOfRows: 10 },
    { datasetName: "Dataset 2", date: "2024-09-24", numberOfRows: 20 },
  ]);
  const [files, setFiles] = useState({ falhas: null, resultados: null, status: null });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (event, fileType) => {
    setFiles({ ...files, [fileType]: event.target.files ? event.target.files[0] : null });
  };

  const handleFileUpload = () => {
    if (files.falhas && files.resultados && files.status) {
      setIsSubmitted(true);
      onClose();
    }
  };

  const isDisabled = !(files.falhas && files.resultados && files.status);

  const dataInfoColumns = [
    { accessorKey: "datasetName", header: "Nome do dataset" },
    { accessorKey: "date", header: "Data" },
    { accessorKey: "numberOfRows", header: "Quantidade de carros" },
  ];

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="flex flex-col min-h-screen p-4">

        <div className="p-4 shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Datasets utilizados</h2>
          <DataTable columns={dataInfoColumns} data={datasets} />
          <br />
          <h3 className="font-bold">Total de datasets: {datasets.length}</h3>
          <p>A lista de datasets acima refere-se aos novos datasets carregados para retreinamento do modelo preditivo.</p>
        </div>

        <div className="py-4" style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "10px" }}>
          <Button
            backgroundColor="#3B82F6"
            color="white"
            _hover={{ backgroundColor: "#2563EB" }}
            fontSize="lg"
            onClick={onOpen}
          >
            Enviar novos datasets
          </Button>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Envie os Arquivos</ModalHeader>
            <ModalBody>
              <Box mb={4}>
                <Text>Arquivo de Falhas:</Text>
                <Input type="file" accept=".xlsx, .xls" onChange={(event) => handleFileChange(event, "falhas")} />
              </Box>
              <Box mb={4}>
                <Text>Arquivo de Resultados:</Text>
                <Input type="file" accept=".xlsx, .xls" onChange={(event) => handleFileChange(event, "resultados")} />
              </Box>
              <Box mb={4}>
                <Text>Arquivo de Status:</Text>
                <Input type="file" accept=".xlsx, .xls" onChange={(event) => handleFileChange(event, "status")} />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                backgroundColor="#3B82F6"
                color="white"
                _hover={{ backgroundColor: "#2563EB" }}
                fontSize="sm"
                onClick={handleFileUpload}
                isDisabled={isDisabled}
                mr={3}
              >
                Enviar Arquivos
              </Button>
              <Button variant="ghost" onClick={onClose} fontSize="sm">
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

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