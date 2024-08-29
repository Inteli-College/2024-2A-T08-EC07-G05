"use client";

import { ColumnDef } from "@tanstack/react-table";

// Definindo as colunas da tabela
export const columns = [
  {
    accessorKey: "KNR",
    header: "KNR",
  },
  {
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "cor",
    header: "Cor",
  }
];
