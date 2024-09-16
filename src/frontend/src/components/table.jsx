import React, { useMemo, useState  } from 'react';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const TableComponent = ({ data }) => {
    // Define as colunas da tabela
    const columnHelper = createColumnHelper();

    // Define as colunas, incluindo a coluna "Endereço" com colunas filhas
    const columns = useMemo(
      () => [
        columnHelper.accessor('KNR', {
          header: 'KNR',
          id: 'KNR',
        }),
        columnHelper.group({
          id: 'tempo',
          header: () => (
            <span className="col-span-3 text-center">Tempo</span> // Cabeçalho da coluna pai centralizado
          ),
          columns: [
            columnHelper.accessor('HALLE_TIMES.ZP5', {
              header: 'ZP5',
            }),
            columnHelper.accessor('HALLE_TIMES.ZP5A', {
              header: 'ZP5A',
            }),
            columnHelper.accessor('HALLE_TIMES.ZP61', {
              header: 'ZP61',
            }),
            columnHelper.accessor('HALLE_TIMES.ZP6 || HALLE_TIMES.ZP62', {
              header: 'ZP6/ZP62',
            }),
            columnHelper.accessor('HALLE_TIMES.CAB', {
              header: 'CAB',
            }),
            columnHelper.accessor('HALLE_TIMES.ZP7', {
              header: 'ZP7',
            }),
            columnHelper.accessor('HALLE_TIMES.ROD', {
              header: 'ROD',
            }),
            columnHelper.accessor('HALLE_TIMES.AGUA', {
              header: 'AGUA',
            }),
            columnHelper.accessor('HALLE_TIMES.ZP8', {
              header: 'ZP8',
            }),
            columnHelper.accessor('HALLE_TIMES.ESPC', {
              header: 'ESPC',
            }),
            columnHelper.accessor('HALLE_TIMES.Total', {
              header: 'Total',
            }),
          ],
        }),
        columnHelper.accessor('OUTPUT_MODELO', {
          header: 'Predição (há falha?)',
          id: 'predicao',
        }),
        columnHelper.accessor('RESULTADO_TESTE', {
          header: 'Resultado teste (há falha?)',
          id: 'resultado',
        }),
      ],
      []
    );
  
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });
  
    const table = useReactTable({
      data,
      columns,
      pageCount: Math.ceil(data.length / pagination.pageSize),
      state: { pagination },
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    return (
      <div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {table.getFlatHeaders().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan} // Ajusta o `colSpan` para colunas agrupadas
                    className={`py-2 px-4 border-b border-gray-300 ${header.colSpan > 1 ? 'text-center' : ''}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
                {table.getFlatHeaders().length > headerGroup.headers.length ? ( // Adiciona uma célula vazia para colunas filhas
                  <th className="py-2 px-4 border-b border-gray-300"></th>
                ) : null
                }
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-2 px-4 border-b border-gray-300">
                    {/* Renderiza a célula apenas para colunas filhas */}
                    {cell.column.id === 'name' || cell.column.id === 'age' ? (
                      null
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="flex justify-between items-center mt-4">
          <div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-gray-300 rounded bg-gray-200 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="ml-2 px-3 py-1 border border-gray-300 rounded bg-gray-200 disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
          <span>
            Página{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </strong>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded"
          >
            {[5, 10, 20].map(size => (
              <option key={size} value={size}>
                Mostrar {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default TableComponent;