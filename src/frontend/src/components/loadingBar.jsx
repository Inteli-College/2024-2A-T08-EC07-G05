// components/LoadingPage.js

import { Box, Text, Image } from "@chakra-ui/react";

export default function LoadingPage({ progress }) {
  return (
    <Box className="relative w-full h-screen bg-white flex flex-col justify-center items-center">
      {/* Barra cinza de progresso (não carregada) */}
      <Box className="relative w-4/5 h-10 bg-gray-300 rounded-full overflow-hidden">
        {/* Estrada (formada conforme o carregamento) */}
        <Box
          className="absolute top-0 left-0 h-full bg-gray-500 transition-all duration-100"
          style={{ width: `${progress}%` }} // Estrada de cor mais clara
        >
          {/* Faixa central da estrada (tracejada) */}
          <Box
            className="absolute top-1/2 transform -translate-y-1/2 w-full h-1"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, yellow 0%, yellow 30%, transparent 30%, transparent 60%)",
              backgroundSize: "40px 100%", // Traços amarelos com espaçamento
            }}
          ></Box>
        </Box>

        {/* Carro posicionado em cima da barra de progresso */}
        <Image
          src="/car.png" // Caminho para a imagem do carro
          alt="Carro"
          boxSize="50px" // Tamanho da imagem do carro
          className="absolute transform -translate-y-1/2 transition-all duration-100 ease-linear"
          style={{ left: `calc(${progress}% - 25px)`, top: "50%" }} // Centralizando verticalmente
        />
      </Box>

      {/* Texto de carregamento */}
      <Text mt={4} fontSize="lg" fontWeight="bold" color="gray-700">
        {progress}% Carregando...
      </Text>
    </Box>
  );
}