import React from 'react';

function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with Home Icon and Title */}
      <div className="flex items-center mb-4">
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
              d="M3 12l2-2m0 0l7-7 7 7M13 5v6m6 4v6m-8 0h6a2 2 0 002-2v-5.586a1 1 0 00-.293-.707l-7-7a1 1 0 00-1.414 0l-7 7a1 1 0 00-.293.707V18a2 2 0 002 2h6z"
            />
          </svg>
        </button>
        <a href="/analysis" className="ml-4 text-gray-700 font-semibold text-lg">Análise</a>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">KNR</th>
              <th className="border px-4 py-2 text-left">Tempo</th>
              <th className="border px-4 py-2 text-left">Predição</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr>
              <td className="border px-4 py-2">KNR Example</td>
              <td className="border px-4 py-2">
                {/* Nested Table for Tempo */}
                <table className="w-full bg-white">
                  <thead>
                    <tr>
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
            {/* Add more rows as needed */}
          </tbody>
          <tbody>
            {/* Example Row */}
            <tr>
              <td className="border px-4 py-2">KNR Example</td>
              <td className="border px-4 py-2">
                {/* Nested Table for Tempo */}
                <table className="w-full bg-white">
                  <thead>
                    <tr>
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
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;