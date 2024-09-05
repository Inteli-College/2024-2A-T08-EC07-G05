'use client';
import React, { useEffect } from 'react';
import BaseButton from "@/components/baseButton"; 
import IconHome from "@/../public/icone_home.svg";
import "./style.css";
import { useState } from 'react';


function HistoryPage() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const renderTableRow = (data) => (
    console.log("data:", data),
    <tr className="table-row">
      <td className="border px-4 py-2">
        <table className="w-full bg-white">
          <thead>
            <tr className="table-header">
              <th className="border px-2 py-1 text-left">ZP5</th>
              <th className="border px-2 py-1 text-left">ZP5A</th>
              <th className="border px-2 py-1 text-left">ZP61</th>
              <th className="border px-2 py-1 text-left">ZP6 / ZP62</th>
              <th className="border px-2 py-1 text-left">CAB</th>
              <th className="border px-2 py-1 text-left">ZP7</th>
              <th className="border px-2 py-1 text-left">ROD</th>
              <th className="border px-2 py-1 text-left">AGUA</th>
              <th className="border px-2 py-1 text-left">ZP8</th>
              <th className="border px-2 py-1 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 text-left"></td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
              <td className="border px-2 py-1 text-left">mock</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );

  const homeClick = () => {
    window.location.href = '/';
  };

  useEffect( () => {
    fetch('http://127.0.0.1:8000/getHistory')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  console.log(data)

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
              <th className="border px-4 py-2 text-left">Resultado do teste</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="border px-4 py-2">{item.KNR}</td>
                <td className="border px-4 py-2">{renderTableRow(item.HALLE_TIMES)}</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;