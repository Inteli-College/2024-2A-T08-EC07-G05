"use client";
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Loader, Save, Database, BarChart } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PipelineProgressModal() {
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [open, setOpen] = useState(false); 

  const steps = [
    { label: 'Carregando Dados', icon: <Database /> },
    { label: 'Separando Treino/Teste', icon: <BarChart /> },
    { label: 'Treinando Modelo', icon: <Loader /> },
    { label: 'Avaliando Modelo', icon: <CheckCircle /> },
    { label: 'Salvando Modelo', icon: <Save /> },
  ];

  useEffect(() => {
    let eventSource;

    if (open) {
      eventSource = new EventSource(`http://${window.location.hostname}:3000/new_model`);

      eventSource.onmessage = function (event) {
        console.log("Evento recebido:", event.data);
        if (event.data.trim().includes('Modelo Salvo!')) {
          console.log("Pipeline concluída!");
          setCompleted(true);
          setTimeout(() => {
            setOpen(false);
            toast.success("Pipeline realizada com sucesso!", {
                autoClose: 5000,
                position: "top-right",
            });
        }, 1000);
          eventSource.close();
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

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [open]);

  const isStepCompleted = (index) => index < progress.length;

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            onClick={() => {
              setProgress([]);
              setCompleted(false);
              setOpen(true);
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
        <ToastContainer />
    </div>
  );
}