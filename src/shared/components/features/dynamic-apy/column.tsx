import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Collection = {
	id: number;
	asset: string;
	maturity: number | string;
	apy: number;
	vault: string;
};

export const columns: ColumnDef<Collection>[] = [
	{
		accessorKey: "id",
		header: "#",
		cell: ({ row }) => (
			<div className="w-[40px] text-gray-400">{row.getValue("id")}</div>
		),
	},
	{
		accessorKey: "asset",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white"
				>
					Asset
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="font-medium text-white">{row.getValue("asset")}</div>
			</div>
		),
	},
	{
		accessorKey: "maturity",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white"
				>
					Maturity
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="font-medium">{row.getValue("maturity")}</div>;
		},
	},
	{
		accessorKey: "apy",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white"
				>
					APY
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("apy"));
			return <div className="font-medium">{amount.toFixed(2)} %</div>;
		},
	},
	{
		accessorKey: "vault",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white"
				>
					Vault
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
