import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Collection = {
	id: number;
	asset: string;
	apy: number;
	maturity: string;
	supplied: string;
	earned: string;
};

export const columnLend: ColumnDef<Collection>[] = [
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
		accessorKey: "supplied",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Supplied
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const supplied = Number.parseFloat(row.getValue("supplied"));
			return <div className="font-extralight">{supplied}</div>;
		},
	},
	{
		accessorKey: "earned",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Earned
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const earned = Number.parseFloat(row.getValue("earned"));
			return <div className="font-extralight">{earned}</div>;
		},
	},
	{
		accessorKey: "action",
		header: () => {
			return <p>Action</p>;
		},
		cell: () => {
			return (
				<div className="w-32 space-x-2">
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						Withdraw
					</Button>
				</div>
			);
		},
	},
];
