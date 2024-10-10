'use client';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/navBar';
import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, Loader, Save, Database, BarChart } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const steps = [
    { label: 'Carregando Dados', icon: <Database /> },
    { label: 'Separando Treino/Teste', icon: <BarChart /> },
    { label: 'Treinando Modelo', icon: <Loader /> },
    { label: 'Avaliando Modelo', icon: <CheckCircle /> },
    { label: 'Salvando Modelo', icon: <Save /> },
  ];

  function TrainModelPage() {
    const [modelsData, setModelsData] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [progress, setProgress] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [openComparison, setOpenComparison] = useState(false);
    const [openTraining, setOpenTraining] = useState(false);
    const [currentModel, setCurrentModel] = useState({});
    const [newModel, setNewModel] = useState(null);
    
    useEffect(() => {
      let eventSource;

      if (openTraining) {
        try {
          eventSource = new EventSource(`http://${window.location.hostname}:3000/new_model`);

        eventSource.onmessage = function (event) {
          console.log("Evento recebido:", event.data);
  
          if (event.data.trim().includes('Modelo Salvo!')) {
            console.log("Pipeline concluída!");
            setCompleted(true);
            setOpenTraining(false);
            setOpenComparison(true);
            eventSource.close();
          }

          if (event.data.includes('Novo modelo:')) {
            const new_model_metrics = event.data.replace('Novo modelo:', '') ;
            let new_model_json = new_model_metrics.replace(/'/g, '"');
            let new_model_data = JSON.parse(new_model_json);
            setNewModel(new_model_data[0]);
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
        catch (error) {
          console.error("Erro ao conectar com o servidor:", error);
        }
      }

    }, [openTraining]);

    const isStepCompleted = (index) => index < progress.length;

    const handleDiscardModel = () => {
      fetch(`http://${window.location.hostname}:3000/deleteModel/?ID_MODELO=${newModel.ID_MODELO}`, {
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
  
    function handleSaveModel(id){
      fetch(`http://${window.location.hostname}:3000/updateCurrentModel/?ID_NOVO_MODELO=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
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
      {
        accessorKey: "URL_BUCKET",
        header: "Nome do Modelo",

      },
      {
        accessorKey: "ACURACIA",
        header: "Acurácia",
        cell: ({ cell }) => parseFloat(cell.getValue()).toFixed(3),
      },
      {
        accessorKey: "PRECISAO",
        header: "Precisão",
        cell: ({ cell }) => parseFloat(cell.getValue()).toFixed(3),
      },
      {
        accessorKey: "RECALL",
        header: "Recall",
        cell: ({ cell }) => parseFloat(cell.getValue()).toFixed(3),
      },
      {
        accessorKey: "F1",
        header: "F1 Score",
        cell: ({ cell }) => parseFloat(cell.getValue()).toFixed(3),
      },
      {
        accessorKey: "ID_MODELO",
        header: "Adicionar modelo como atual",
        cell: ({ cell }) => {
          return (
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={() => {
                setOpenComparison(true);
                setNewModel(cell.row.original);
              }}
            >
              Usar esse modelo
            </Button>
          );
        } 
      }
    ];

    useEffect(() => {
      fetch(`http://${window.location.hostname}:3000/getModels`)
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => new Date(b.DATA_TREINO) - new Date(a.DATA_TREINO));
          setModelsData(data);

          if (data.length > 0) {
        fetch(`http://${window.location.hostname}:3000/getCurrentModel`)
          .then((res) => res.json())
          .then((modelData) => {
            setCurrentModel(modelData[0]);
          });
          }
        });
    }, []);

    const paginatedData = modelsData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header>
      <NavBar />
      <div className="absolute top-16 right-8">
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
        <h2 className="text-2xl font-bold mb-4">Métricas do Modelo Atual</h2>
        <div className="bg-gray-200 p-6 text-center rounded-lg">
          <div className="text-xl space-between">
            <div><span className="font-semibold">Acurácia: </span>{parseFloat(currentModel?.ACURACIA).toFixed(3)}</div>
            <div><span className="font-semibold">Precisão: </span>{parseFloat(currentModel?.PRECISAO).toFixed(3)}</div>
            <div><span className="font-semibold">Recall: </span>{parseFloat(currentModel?.RECALL).toFixed(3)}</div>
            <div><span className="font-semibold">F1 Score: </span>{parseFloat(currentModel?.F1).toFixed(3)}</div>
            </div>
        </div>
      </div>

      <div className="my-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Modelos Criados</h2>
        <DataTable columns={modelsColumns} data={paginatedData} />
      </div>

      <Dialog open={openComparison} onOpenChange={setOpenComparison}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle>Comparação de Métricas de Modelos</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg p-2">Modelo atual</h3>
              <div><p className="font-semibold">Acurácia:</p><span >{parseFloat(currentModel?.ACURACIA).toFixed(3)}</span></div>
              <div><p className="font-semibold">Precisão:</p><span >{parseFloat(currentModel?.PRECISAO).toFixed(3)}</span></div>
              <div><p className="font-semibold">Recall:</p><span >{parseFloat(currentModel?.RECALL).toFixed(3)}</span></div>
              <div><p className="font-semibold">F1 Score:</p><span >{parseFloat(currentModel?.F1).toFixed(3)}</span></div>
              <div><p className="font-semibold">Data de treinamento:</p><span >{new Date(currentModel?.DATA_TREINO).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</span></div>
              </div>
            <div className="gap-2">
              <h3 className="font-semibold text-lg p-2">Modelo Novo</h3>
              <div><p className="font-semibold">Acurácia:</p><span >{parseFloat(newModel?.ACURACIA).toFixed(3)}</span></div>
              <div><p className="font-semibold">Precisão:</p><span >{parseFloat(newModel?.PRECISAO).toFixed(3)}</span></div>
              <div><p className="font-semibold">Recall:</p><span >{parseFloat(newModel?.RECALL).toFixed(3)}</span></div>
              <div><p className="font-semibold">F1 Score:</p><span >{parseFloat(newModel?.F1).toFixed(3)}</span></div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="secondary" onClick={() => setOpenComparison(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDiscardModel}>
              Descartar
            </Button>
            <Button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            onClick={()=> handleSaveModel(newModel.ID_MODELO)}>
              Salvar e atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default TrainModelPage;
