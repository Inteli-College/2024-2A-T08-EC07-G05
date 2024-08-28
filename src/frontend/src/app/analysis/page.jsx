import React from 'react';
import BaseButton from "@/components/baseButton"; 
import IconHome from "@/../public/icone_home.svg";
// import styles from "style.css"

function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with Home and Back buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {/* Home Button using BaseButton component */}
          <BaseButton text="Home" icon={IconHome} />
          <button className="bg-gray-300 p-2 rounded-full">
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
          </button>
        </div>
        <div className="text-sm bg-white p-2 rounded shadow-md">
          precisão do modelo: 93%
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mb-4">Recorrência de falhas:</h1>

      {/* Grid for ZP blocks */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* ZP1 Block */}
        <div className="bg-gray-300 p-4 rounded border-4 border-blue-400">
          <h2 className="font-semibold mb-2">ZP1</h2>
          <ul className="text-red-500">
            <li>Pintura</li>
            <li>Amassados</li>
            <li>Painel</li>
            <li>--</li>
          </ul>
        </div>

        {/* Other ZP Blocks */}
        {['ZP2', 'ZP3', 'ZP4', 'ZP5', 'ZP6', 'ZP7', 'ROD'].map((zone) => (
          <div key={zone} className="bg-gray-300 p-4 rounded">
            <h2 className="font-semibold mb-2">{zone}</h2>
            <ul className="text-red-500">
              <li>Pintura</li>
              <li>Amassados</li>
              <li>Painel</li>
              <li>--</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalysisPage;