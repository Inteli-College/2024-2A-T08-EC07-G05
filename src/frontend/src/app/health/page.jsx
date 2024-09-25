'use client';
import React, { useEffect, useState } from 'react';

function HealthPage() {
  const [health, setHealth] = useState([
    { name: "Backend", health: "unhealth" },
    { name: "Frontend", health: "unhealth" },
    { name: "Data_Lake", health: "unhealth" },
    { name: "Banco_De_Dados", health: "unhealth" },
  ]);

  useEffect(() => {
    // Função para realizar a requisição
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/health'); // Substitua 'SUA_URL_AQUI' pela URL da sua API
        const data = await response.json();

        // Mapeando a resposta da API para o estado de `health`

        const updatedHealth = [
          { name: "Backend", health: data.backend_connection.status },
          { name: "Frontend", health: data.frontend_connection.status },
          { name: "Data_Lake", health: data.datalake_connection.status },
          { name: "Banco_De_Dados", health: data.database_connection.status },
        ];

        console.log(updatedHealth)

        setHealth(updatedHealth); // Atualiza o estado com os novos dados
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    // Chama fetchData a cada 30 segundos
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // 30 segundos em milissegundos

    // Chama a função pela primeira vez quando o componente é montado
    fetchData();

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-4xl text-center">Healthcheck:</h1>
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
              <td className={`px-6 py-4 ${service.health === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
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
