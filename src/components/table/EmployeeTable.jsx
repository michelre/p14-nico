import { useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

import "./table.css";

const EmployeeTable = ({employees}) => {


    // Vérifier si employees existe
    const isEmpty = !employees || employees.length === 0;

    //etat de pagination
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    //etat de la recherche
    const [globalFilter, setGlobalFilter] = useState("")
    const [sorting, setSorting] = useState([
        {
            id: 'firstName',
        },
        {
            id: 'lastName',
        }
    ])

    // Créer les colonnes
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor("firstName", {
            header: "First Name",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
            enableSortingRemoval: false
        }),
        columnHelper.accessor("lastName", {
            header: "Last Name",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
            enableSortingRemoval: false
        }),
        columnHelper.accessor("dateOfBirth", {
            header: "Date of Birth",
            cell: (info) => {
                return new Intl.DateTimeFormat('fr-FR').format(new Date(info.getValue()))
            },
            sortingFn: 'datetime',

        }),
        columnHelper.accessor("startDate", {
            header: "Start Date",
            cell: (info) => {
                return new Intl.DateTimeFormat('fr-FR').format(new Date(info.getValue()))
            },
            sortingFn: 'datetime',

        }),
        columnHelper.accessor("street", {
            header: "Street",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("city", {
            header: "City",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("state", {
            header: "State",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("zipCode", {
            header: "Zip Code",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor("department", {
            header: "Department",
            cell: (info) => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
    ];

    // Créer le tableau
    const table = useReactTable({
        data: employees || [],
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        globalFilterFn: "includesString",
        state: {
            pagination,
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        enableSortingRemoval: false
    })
    // Calcul du nombre total de pages disponibles 
    const totalPages = table.getPageCount();

    return (
        <div className="p-2">            
            <div className="containerFilter">
                <div className="containerSelect">
                    <span>Show</span>
                    <select
                        className="select-show"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 25, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    <span>entries</span>
                </div>

                <div className="containerSearch">
                    <span>Search: </span>
                    <input
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>
            {/* Tableau des employes */}
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="sortable">
                                        {header.isPlaceholder ? null : (
                                            <div className="th-content">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <span className="sort-icons">
                                                    <span className={`triangle up ${header.column.getIsSorted() === "asc" ? "active" : ""}`}></span>
                                                    <span className={`triangle down ${header.column.getIsSorted() === "desc" ? "active" : ""}`}></span>
                                                </span>
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {isEmpty && 
                    <tr>                        
                        <td colSpan={table.getHeaderGroups()[0].headers.length}>Aucun employé trouvé!</td>
                    </tr>}                       
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-between items-center gap-2 py-4">


                <span className="flex items-center gap-1">
                    <div>Showing <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong> entries</div>
                </span>
                <span className="flex items-center gap-1">
                    <button className="pagination-btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </button>

                    {/* Affichage dynamique des numéros de pages */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            id="pagination-number"
                            key={index}
                            onClick={() => table.setPageIndex(index)}
                            className={index === pagination.pageIndex ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button className="pagination-btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </button>

                </span>
            </div>

        </div>
    );

};

export default EmployeeTable;