'use client';
import React from 'react';
import BaseButton from "@/components/baseButton"; 
import IconHome from "@/../public/icone_home.svg";
import "./style.css";

function HistoryPage() {
  const renderTableRow = () => (
    <tr className="table-row">
      <td className="border px-4 py-2">KNR Example</td>
      <td className="border px-4 py-2">
        <table className="w-full bg-white">
          <thead>
            <tr className="table-header">
              <th className="border px-2 py-1 text-left">ZP1</th>
              <th className="border px-2 py-1 text-left">ZP2</th>
              <th className="border px-2 py-1 text-left">ZP3</th>
              <th className="border px-2 py-1 text-left">ZP4</th>
              <th className="border px-2 py-1 text-left">ZP5</th>
              <th className="border px-2 py-1 text-left">ZP6</th>
              <th className="border px-2 py-1 text-left">ZP7</th>
              <th className="border px-2 py-1 text-left">ROD</th>
              <th className="border px-2 py-1 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 text-left">10</td>
              <td className="border px-2 py-1 text-left">15</td>
              <td className="border px-2 py-1 text-left">20</td>
              <td className="border px-2 py-1 text-left">12</td>
              <td className="border px-2 py-1 text-left">18</td>
              <td className="border px-2 py-1 text-left">14</td>
              <td className="border px-2 py-1 text-left">11</td>
              <td className="border px-2 py-1 text-left">22</td>
              <td className="border px-2 py-1 text-left">122</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td className="border px-4 py-2">Predição Example</td>
      <td className="border px-4 py-2">Status Example</td>
    </tr>
  );

  const homeClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with Home Icon and Title */}
      <div className="flex items-center mb-4">
        <BaseButton text="Home" icon={IconHome} onClick={homeClick} className="button-gray" />
        <a href="/analysis" className="ml-4 text-gray-700 font-semibold text-lg">Análise</a>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200">
          <thead>
            <tr className="table-header">
              <th className="border px-4 py-2 text-left">KNR</th>
              <th className="border px-4 py-2 text-left">Tempo</th>
              <th className="border px-4 py-2 text-left">Predição</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRow()}
            {renderTableRow()}
            {/* Adicione mais linhas conforme necessário */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;