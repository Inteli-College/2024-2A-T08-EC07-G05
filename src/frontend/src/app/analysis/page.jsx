"use client";
import React, {useEffect, useState} from 'react';
import "./style.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingPage from "../../components/loadingBar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {failTypes} from "../../components/failTypes";

function AnalysisPage() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0);

  const homeClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect( () => {
    fetch(`http://${window.location.hostname}:8000/getStats`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setProgress(100);
      })
  }, []);

  if (isLoading) return <LoadingPage progress={progress} />;
  if (!data) return <p>No profile data</p>;
  console.log(data);
  console.log("failtypes:", failTypes);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
            <header>
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
            <Link 
          href="/data">
            Dados do Modelo</Link>
            <Link 
          href="/models">
            Treino de Modelos</Link>
        <div className="text-sm bg-white p-2 rounded shadow-md align-right">
          precisão do modelo: 93%
        </div>
        </nav>
      </header>
      
      <h1 className="text-xl font-semibold mb-4">Recorrência de falhas:</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        { Object.keys(data).map((key, index) => {
        const totalFailures = Object.entries(data[key]).reduce((acc, [subKey, value]) => {
          const parsedValue = parseInt(value) || 0;
          return acc + parsedValue;
        }, 0);
        return(
          <Card key={index}>
            <CardHeader>
              <CardTitle>{key}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li></li>
                <div>
                  <div>
                  {Object.entries(data[key]).map(([subKey, value], subIndex) => (
                    <div>
                      <li key={subIndex}>
                        {failTypes[subKey] || subKey}: {value}
                      </li>
                    <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${(value * 100)/totalFailures}%`}}></div>
                    </div>
                  </div>
                  ))}
                  </div>
                </div>
              </ul>
            </CardContent>
            <CardFooter>
              <p>total de falhas: {totalFailures}</p>
            </CardFooter>
          </Card>)})
          }
      </div>
    </div>
  );
}

export default AnalysisPage;
