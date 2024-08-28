"use client";

import { ColumnDef } from "@tanstack/react-table";

// Definindo as colunas da tabela
export const columns = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  }
];
