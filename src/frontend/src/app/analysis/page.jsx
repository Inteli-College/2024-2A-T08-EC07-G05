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
    fetch(`http://${window.location.hostname}:3000/getStats`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setProgress(100);
      });
  }, []);

  if (isLoading) return <LoadingPage progress={progress} />;
  if (!data) return <p>No profile data</p>;

  console.log(data);
  console.log("failtypes:", failTypes);

  return (
    <main>
      <header>
        <NavBar />
      </header>
      <div className="min-h-screen p-4">
        <h1 className="text-xl font-semibold mb-4">Recorrência de falhas:</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(data).map((key, index) => {
            const totalFailures = Object.entries(data[key]).reduce((acc, [subKey, value]) => {
              const parsedValue = parseInt(value) || 0;
              return acc + parsedValue;
            }, 0);

            return (
              <Card key={index} className="bg-white shadow-md rounded p-4">
                <CardHeader>
                  <CardTitle>{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-none p-0">
                    {Object.entries(data[key]).map(([subKey, value], subIndex) => (
                      <li key={subIndex} className="mb-2">
                        <div className="text-sm">{failTypes[subKey] || subKey}: {value}</div>
                        <div className="w-full h-4 bg-red-200 rounded">
                          <div
                            className="h-full bg-red-500 rounded transition-all duration-300 ease-in-out"
                            style={{ width: `${(value * 100) / totalFailures}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <p>Total de falhas: {totalFailures}</p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default AnalysisPage;
