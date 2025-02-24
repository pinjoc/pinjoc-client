import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Collection = {
	id: number;
	asset: string;
	apy: number;
	borrowed: string;
	maturity: string;
	colleteral: string;
};

export const columnBorrowOrder: ColumnDef<Collection>[] = [
	{
		accessorKey: "id",
		header: "#",
		cell: ({ row }) => (
			<div className="w-[40px] text-gray-400 font-extralight">
				{row.getValue("id")}
			</div>
		),
	},
	{
		accessorKey: "asset",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Asset
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="text-white font-extralight">
					{row.getValue("asset")}
				</div>
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
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Maturity
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="text-white font-extralight">
					{row.getValue("maturity")}
				</div>
			</div>
		),
	},
	{
		accessorKey: "apy",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent font-extralight hover:text-white"
				>
					APY
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("apy"));
			return <div className="font-extralight">{amount.toFixed(2)} %</div>;
		},
	},
	{
		accessorKey: "borrowed",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Borrowed
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const borrowed = Number.parseFloat(row.getValue("borrowed"));
			return <div className="font-extralight">{borrowed}k</div>;
		},
	},
	{
		accessorKey: "colleteral",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Colleteral
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const colleteral = Number.parseFloat(row.getValue("colleteral"));
			return <div className="font-extralight">{colleteral}k</div>;
		},
	},
	{
		accessorKey: "action",
		header: () => {
			return <p className="text-center">Action</p>;
		},
		cell: () => {
			return (
				<div className="w-52 space-x-2">
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						View Market
					</Button>
					<Button variant={"destructive"} className="cursor-pointer">
						Cancel
					</Button>
				</div>
			);
		},
	},
];
