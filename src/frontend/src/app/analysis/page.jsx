"use client";
import React from 'react';
import BaseButton from "@/components/baseButton"; 
import IconHome from "@/../public/icone_home.svg";
import "./style.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";


function AnalysisPage() {

  const zones = [
    { name: "ZP1", pintura: 80, amassados: 50, painel: 20 },
    { name: "ZP2", pintura: 70, amassados: 60, painel: 30 },
    { name: "ZP3", pintura: 85, amassados: 40, painel: 25 },
    { name: "ZP4", pintura: 60, amassados: 75, painel: 45 },
    { name: "ZP5", pintura: 90, amassados: 55, painel: 35 },
    { name: "ZP6", pintura: 95, amassados: 65, painel: 50 },
    { name: "ZP7", pintura: 50, amassados: 70, painel: 30 },
    { name: "ROD", pintura: 65, amassados: 80, painel: 55 },
  ];
  const homeClick = () => {
    window.location.href = '/';
  };
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
        <div className="text-sm bg-white p-2 rounded shadow-md align-right">
          precisão do modelo: 93%
        </div>
        </nav>
      </header>
      
      <h1 className="text-xl font-semibold mb-4">Recorrência de falhas:</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <div key={zone.name} className="bg-gray-300 p-4 rounded">
            <h2 className="font-semibold mb-2">{zone.name}</h2>
            <ul className="text-red-500">
              <li>Pintura</li>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${zone.pintura}%` }}></div>
              </div>
              <li>Amassados</li>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${zone.amassados}%` }}></div>
              </div>
              <li>Painel</li>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${zone.painel}%` }}></div>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalysisPage;
