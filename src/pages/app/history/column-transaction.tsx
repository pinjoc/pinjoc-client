import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type TransactionType = "Lend" | "Borrow" | "Buy" | "Sell";
type TransactionStatus = "Pending" | "Success" | "Failed";

export type Collection = {
	id: number;
	type: TransactionType;
	orderType: string;
	asset: string;
	amount: number;
	status: TransactionStatus;
	date: string;
};

export const columnTransactions: ColumnDef<Collection>[] = [
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
		accessorKey: "type",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="text-white font-extralight">{row.getValue("type")}</div>
			</div>
		),
	},
	{
		accessorKey: "orderType",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent font-extralight hover:text-white"
				>
					Order Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="font-extralight">{row.getValue("orderType")}</div>;
		},
	},
	{
		accessorKey: "amount",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Amount
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("amount"));
			return <div className="font-extralight">{amount.toFixed(2)}</div>;
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="font-extralight">{row.getValue("status")}</div>;
		},
	},
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Time
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="font-extralight">{row.getValue("date")}</div>;
		},
	},
];
