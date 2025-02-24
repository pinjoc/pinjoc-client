import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Collection = {
	id: number;
	symbol: string;
	name: string;
	price: number;
};

export const columnSellBond: ColumnDef<Collection>[] = [
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
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="text-white font-extralight">{row.getValue("name")}</div>
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
			return <div className="font-extralight">{price.toFixed(2)} %</div>;
		},
	},
	{
		accessorKey: "action",
		header: () => {
			return <p>Action</p>;
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
