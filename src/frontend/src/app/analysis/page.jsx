import React from 'react';
import BaseButton from "@/components/baseButton"; 
import IconHome from "@/../public/icone_home.svg";
import "./style.css";

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <BaseButton text="Home" icon={IconHome} className="button-gray" />
          <a href="/history" className="bg-gray-300 p-2 rounded-full flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Voltar</span>
          </a>
        </div>
        <div className="text-sm bg-white p-2 rounded shadow-md">
          precisão do modelo: 93%
        </div>
      </div>
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
