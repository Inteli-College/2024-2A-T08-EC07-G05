'use client';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/navBar';
import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/ui/data-table';
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, Loader, Save, Database, BarChart } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const currentModelId = process.env.NEXT_PUBLIC_MODEL_ID;

  const steps = [
    { label: 'Carregando Dados', icon: <Database /> },
    { label: 'Separando Treino/Teste', icon: <BarChart /> },
    { label: 'Treinando Modelo', icon: <Loader /> },
    { label: 'Avaliando Modelo', icon: <CheckCircle /> },
    { label: 'Salvando Modelo', icon: <Save /> },
  ];

  function TrainModelPage() {
    const [modelsData, setModelsData] = useState([]);
    const [modelMetric, setModelMetric] = useState(null);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [progress, setProgress] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [openComparison, setOpenComparison] = useState(false);
    const [openTraining, setOpenTraining] = useState(false);
    const [modelId, setModelId] = useState(null);

    const modelA = {
      id: 1,
      name: 'Modelo A',
      accuracy: 92.5,
      precision: 85,
    };

    const modelB = {
      id: '14710397-894b-40f1-90d1-9ddb748a6f6c',
      name: 'Modelo B',
      accuracy: 93.5,
      precision: 86,
    };
    

    useEffect(() => {
      let eventSource;

      if (openTraining) {
        eventSource = new EventSource(`http://${window.location.hostname}:3000/new_model`);

        eventSource.onmessage = function (event) {
          console.log("Evento topissimo recebido:", event.data);
  
          if (event.data.trim().includes('Modelo Salvo!')) {
            console.log("Pipeline concluída!");
            setCompleted(true);
            setOpenTraining(false);
            setOpenComparison(true);
            // setTimeout(() => {
              
            //   toast.success("Pipeline realizada com sucesso!", {
            //       autoClose: 5000,
            //       position: "top-right",
            //   });
            // }, 1000);
            eventSource.close();
          }

          if (event.data.includes('Id do modelo')) {
            const modelId = event.data.split(":")[1].trim();
            console.log("Id do modelo:", modelId);
            setModelId(modelId);
          }

          setProgress((prevProgress) => [...prevProgress, event.data]);

        };

        eventSource.onerror = function (error) {
          console.error("SSE connection error", error);
          eventSource.close();
        };

        return () => {
          if (eventSource) {
            eventSource.close();
            console.log("Conexão SSE fechada.");
          }
        };
      }

      // return () => {
      //   if (eventSource) eventSource.close();
      // };
    }, [openTraining]);

    const isStepCompleted = (index) => index < progress.length;

    const handleDiscardModel = () => {
      fetch(`http://${window.location.hostname}:3000/deleteModel/?ID_MODELO=${modelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.info("Modelo descartado com sucesso!", {
        autoClose: 5000,
        position: "top-right",
      });
      console.log("Modelo descartado com sucesso!");
      setOpenComparison(false);
    };
  
    const handleSaveModel = () => {
      toast.success("Modelo atualizado com sucesso!", {
        autoClose: 5000,
        position: "top-right",
      });
      setOpenComparison(false);
      console.log("Modelo atualizado com sucesso!");
    };

    const modelsColumns = [
      {
        accessorKey: "DATA_TREINO",
        header: "Data",
        cell: ({ cell }) => {
          const date = cell.getValue();
          const formattedDate = new Date(date).toLocaleDateString();
          return formattedDate;}
      },
      // {
      //   accessorKey: "carQuantity",
      //   header: "Quantidade de Carros",
      //   cell: ({ cell }) => {
      //     const carQuantity = cell.getValue();
      //     return carQuantity ? `${carQuantity} carros` : '-';
      //   }
      // },
      {
        accessorKey: "ID_MODELO",
        header: "Nome do Modelo",

      },
    ];

    useEffect(() => {
      // Fetch all models
      fetch(`http://${window.location.hostname}:3000/getModels`)
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => new Date(b.DATA_TREINO) - new Date(a.DATA_TREINO));
          setModelsData(data);
          console.log("id modelo atual:", currentModelId);

          if (data.length > 0) {
        fetch(`http://${window.location.hostname}:3000/getModel/${currentModelId}`)
          .then((res) => res.json())
          .then((modelData) => {
            setModelMetric(modelData.metric);
            console.log("Modelo atual:", modelData);
          });
          }
        });
      const mockData = [
        { date: "2024-09-01", carQuantity: 5, name: "Modelo 1" },
        { date: "2024-09-02", carQuantity: 10, name: "Modelo 2" },
      ];
      setModelsData(mockData);
      setModelMetric(92.5);
    }, []);

    const paginatedData = modelsData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header>
      <NavBar />
      <div className="absolute top-4 right-4">
          <Dialog open={openTraining} onOpenChange={setOpenTraining}>
          <DialogTrigger asChild>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={() => {
                setProgress([]);
                setCompleted(false);
                setOpenTraining(true);
              }}
            >
              Iniciar Pipeline
            </button>
          </DialogTrigger>

          <DialogContent className="bg-white p-6 rounded-lg shadow-md">
            <DialogHeader>
              <DialogTitle className="flex items-center" >Pipeline de treinamento do modelo</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${isStepCompleted(index) ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}
                  >
                    {isStepCompleted(index) ? <CheckCircle className="w-6 h-6" /> : step.icon}
                  </div>
                  <span className="text-sm text-gray-700">{step.label}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
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

      {/* Modal de comparação de métricas */}
      <Dialog open={openComparison} onOpenChange={setOpenComparison}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle>Comparação de Métricas de Modelos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Modelo antigo</h3>
              <p>Id do modelo: <span className="font-semibold">{modelA.id}</span></p>
              <p>Acurácia: <span className="font-semibold">{modelA.accuracy}%</span></p>
              <p>Precisão: <span className="font-semibold">{modelA.precision}%</span></p>
            </div>
            <div>
              <h3 className="font-semibold">Modelo Novo</h3>
              <p>Id do modelo: <span className="font-semibold">{modelB.id}</span></p>
              <p>Acurácia: <span className="font-semibold">{modelB.accuracy}%</span></p>
              <p>Precisão: <span className="font-semibold">{modelB.precision}%</span></p>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="destructive" onClick={handleDiscardModel}>
              Descartar
            </Button>
            <Button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            onClick={handleSaveModel}>
              Salvar Modelo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default TrainModelPage;
