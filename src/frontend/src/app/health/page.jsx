'use client';
import React, { useEffect, useState } from 'react';

function HealthPage() {
  const [health, setHealth] = useState([
    { name: "Backend", health: "unhealthy" },
    { name: "Frontend", health: "unhealthy" },
    { name: "Data lake", health: "unhealthy" },
    { name: "Banco de dados", health: "unhealthy" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HEALTH_AWS}/health`);
        const data = await response.json();

        const updatedHealth = [
          { name: "Backend", health: data.backend_connection.status, error: data.backend_connection.error },
          { name: "Frontend", health: data.frontend_connection.status, error: data.frontend_connection.error },
          { name: "Data lake", health: data.datalake_connection.status, error: data.datalake_connection.error },
          { name: "Banco de dados", health: data.database_connection.status, error: data.datalake_connection.error },
        ];

        setHealth(updatedHealth);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-center mb-6">Healthcheck</h1>
      <div className="w-full max-w-3xl p-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Serviço</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Descrição de erro</th>
            </tr>
          </thead>
          <tbody>
            {health.map((service, index) => (
              <tr key={index} className="bg-gray-100 border-b last:border-none">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {service.name}
                </th>
                <td
                  className={`px-6 py-4 ${service.health === 'healthy' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {service.health}
                </td>
                <td className="px-6 py-4">
                  {service.error ? service.error : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='px-10'>
        <div className='px-10'>
          <div className="mt-6 text-center px-10">
            Nesta página, é possível verificar o estado atual de cada serviço da aplicação It-Cross. A tabela acima exibe essa informação na coluna "STATUS", na qual "healthy" indica estabilidade e "unhealthy" indica instabilidade. Em caso de instabilidade, a coluna "DESCRIÇÃO DE ERRO" detalha o erro associado à instabilidade.
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthPage;
