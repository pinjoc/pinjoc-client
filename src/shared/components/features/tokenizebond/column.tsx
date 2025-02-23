import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Collection = {
	id: number;
	symbol: string;
	name: string;
	price: number;
};

export const columns: ColumnDef<Collection>[] = [
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
		accessorKey: "symbol",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Symbol
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="text-white font-extralight">
					{row.getValue("symbol")}
				</div>
			</div>
		),
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="font-extralight">{row.getValue("name")}</div>;
		},
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent font-extralight hover:text-white"
				>
					Price
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const price = Number.parseFloat(row.getValue("price"));
			return <div className="font-extralight">{price.toFixed(2)}</div>;
		},
	},
	{
		accessorKey: "action",
		header: () => {
			return <p className="text-center">Action</p>;
		},
		cell: () => {
			return (
				<div className="flex gap-3 justify-center items-center">
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						Buy
					</Button>
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						Sell
					</Button>
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						View Market
					</Button>
				</div>
			);
		},
	},
];
