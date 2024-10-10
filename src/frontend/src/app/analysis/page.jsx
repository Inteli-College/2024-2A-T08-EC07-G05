"use client";
import React, { useEffect, useState } from 'react';
import LoadingPage from "../../components/loadingBar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { failTypes } from "../../components/failTypes";
import NavBar from '@/components/navBar';

function AnalysisPage() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_AWS}/getStats`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setProgress(100);
      });
  }, []);

  if (isLoading) return <LoadingPage progress={progress} />;
  if (!data) return <p>No profile data</p>;

  const carCount = data[1]

  const stationFailures = Object.entries(data[0]).filter(([key]) => key.startsWith("QTD_HALLE_"));

  var failTypeFailures = Object.entries(data[0]).filter(([key]) => key.startsWith("QTD_SGROUP_"));
  failTypeFailures = failTypeFailures.map(([key, value]) => {
    if (key.endsWith("-2")) {
      const newKey = key.replace("-2", "2");
      const existingEntry = failTypeFailures.find(([k]) => k === newKey);
      if (existingEntry) {
        existingEntry[1] = (parseInt(existingEntry[1]) + parseInt(value)).toString();
        return null;
      } else {
        return [newKey, value];
      }
    }
    return [key, value];
  }).filter(Boolean);

  const totalFailuresByType = failTypeFailures.reduce((acc, [, value]) => acc + parseInt(value), 0);
  const totalFailuresByStation = stationFailures.reduce((acc, [, value]) => acc + parseInt(value), 0);

    const getBarColor = (percentage) => {
      if (percentage < 5) return "bg-green-500"; 
      if (percentage >= 5 && percentage <= 30) return "bg-yellow-500";
      return "bg-red-500";
    };

  console.log(data);
  console.log("failtypes:", failTypes);

  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <header>
        <NavBar />
      </header>

      <div className="min-h-screen p-2 flex flex-col space-y-6 w-full">
        <div className="flex justify-between items-start w-full">
          {/* Título alinhado à esquerda */}
          <h1 className="text-2xl font-semibold mb-4 text-left">Recorrência de falhas:</h1>

          {/* Card menor no canto direito */}
          <Card className="bg-white shadow-md rounded max-w-sm p-4">
            Total de carros registrados: {carCount}
          </Card>
        </div>

        {/* Card para Falhas por Estação */}
        <div className="w-full">
          <Card className="bg-white shadow-md rounded p-4 w-full">
            <CardHeader>
              <CardTitle>Falhas por Halle</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none p-0">
                {stationFailures.map(([key, value], index) => {
                  const percentageOfType = (parseInt(value) / totalFailuresByStation) * 100;
                  return (
                    <li key={index} className="mb-4">
                      <div className="text-sm">{`${key.split("_")[2]}`}: {value}</div>
                      <div className="relative w-full h-4 bg-gray-200 rounded overflow-hidden">
                        {/* Marcadores */}
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gray-400"></div>
                        <div className="absolute top-0 left-1/2 w-px h-full bg-gray-400"></div>
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gray-400"></div>

                        {/* Barra de progresso */}
                        <div
                          className={`h-full ${getBarColor(percentageOfType)} rounded transition-all duration-300 ease-in-out max-w-full`}
                          style={{ width: `${Math.min(percentageOfType, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            <CardFooter>
              <p>Total de falhas: {totalFailuresByStation}</p>
            </CardFooter>
          </Card>
        </div>

        {/* Card para Falhas por Tipo */}
        <div className="w-full">
          <Card className="bg-white shadow-md rounded p-4 w-full">
            <CardHeader>
              <CardTitle>Falhas por Tipo de Falha</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none p-0">
                {failTypeFailures.map(([key, value], index) => {
                  const percentageOfType = (parseInt(value) / totalFailuresByType) * 100;
                  return (
                    <li key={index} className="mb-4">
                      {/* Aplicar failTypes para mostrar o nome da falha correspondente */}
                      <div className="text-sm">{failTypes[key] || `${key.split("_")[2]}`}: {value}</div>
                      <div className="relative w-full h-4 bg-gray-200 rounded overflow-hidden">
                        {/* Marcadores */}
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gray-400"></div>
                        <div className="absolute top-0 left-1/2 w-px h-full bg-gray-400"></div>
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gray-400"></div>

                        {/* Barra de progresso */}
                        <div
                          className={`h-full ${getBarColor(percentageOfType)} rounded transition-all duration-300 ease-in-out max-w-full`}
                          style={{ width: `${Math.min(percentageOfType, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            <CardFooter>
              <p>Total de falhas: {totalFailuresByType}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default AnalysisPage;
