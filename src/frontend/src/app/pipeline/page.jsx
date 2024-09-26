"use client";
import React, {useEffect, useState} from 'react';
import { Button } from "@/components/ui/button";

function AnalysisPage() {
  const [progress, setProgress] = useState([]);

  const pipelineClick = () => {
    useEffect(() => {
      const eventSource = new EventSource(`http://${window.location.hostname}:3000/trainingPipeline`);
  
      eventSource.onmessage = function (event) {
        setProgress((prevProgress) => [...prevProgress, event.data]);
      };
  
      eventSource.onerror = function () {
        console.error("Erro na conexão SSE");
        eventSource.close();
      };
  
      return () => {
        eventSource.close();
      };
    }, []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
            {/* <header>
        <nav className="flex flex-start items-center p-4 gap-4">
        <Button className='bg-blue-500 hover:bg-blue-600 text-white' onClick={homeClick}>
          <img src="/icone_home.svg" className='w-5'></img>
        </Button>
          <Link 
          href="/history">
            Histórico de registros</Link>
            <Link 
          href="/prediction">
            Predição de falhas</Link>
            <Link 
          href="/analysis">
            Análise de falhas</Link>
        <div className="text-sm bg-white p-2 rounded shadow-md align-right">
          precisão do modelo: 93%
        </div>
        </nav>
      </header> */}

      <Button className='bg-blue-500 hover:bg-blue-600 text-white' onClick={pipelineClick}>
        Teste pipeline
      </Button>
      <ul>
        {progress.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisPage;
