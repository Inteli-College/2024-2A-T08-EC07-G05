import React from 'react';

function HealthPage() {

  const health = [
    { name: "Backend", health: "unhealth" },
    { name: "Frontend", health: "health" },
    { name: "Data_Lake", health: "unhealth" },
    { name: "Banco_De_Dados", health: "health" },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-4xl text-center">Tabela com o status dos serviços da aplicação:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Service name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {health.map((service, index) => (
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {service.name}
                        </th>
                        <td className={`px-6 py-4 ${service.health === "health" ? "text-green-600" : "text-red-600"}`}>
                            {service.health}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default HealthPage;
