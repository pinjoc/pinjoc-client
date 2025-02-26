import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvailableTokens } from "@/types";
import { Link } from "react-router-dom";
import { AvatarCollapse } from "@/components/ui/avatar-collapse";

export const columns: ColumnDef<AvailableTokens>[] = [
	{
		accessorKey: "id",
		header: "#",
		cell: ({ row }) => (
			<div className="w-[40px] text-gray-400 font-extralight">
				{row.index + 1}
			</div>
		),
	},
	{
		accessorKey: "DebtTokenSymbol",
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
			<div className="flex w-36 items-center gap-2">
				<div className="text-white font-extralight flex items-center gap-8">
					<AvatarCollapse
						avatarUrls={[
							row.original.CollateralTokenIcon,
							row.original.DebtTokenIcon,
						]}
					/>
					{row.original.DebtTokenSymbol}/{row.original.CollateralTokenSymbol}
				</div>
			</div>
		),
	},
	{
		accessorKey: "MaturityRange",
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
		cell: ({ row }) => {
			return (
				<div className="font-extralight w-48">
					{row.getValue("MaturityRange")}
				</div>
			);
		},
	},
	{
		accessorKey: "RateRange",
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
			return (
				<div className="font-extralight w-32">{row.getValue("RateRange")}</div>
			);
		},
	},
	{
		accessorKey: "LendingVault",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Lender Vault
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const formatLenderVault = Intl.NumberFormat("en-US", {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
				style: "currency",
				currency: "USD",
			}).format(row.getValue("LendingVault"));
			return <div className="font-extralight">{formatLenderVault}</div>;
		},
	},
	{
		accessorKey: "BorrowVault",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					Borrow Vault
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const borrowFormat = Intl.NumberFormat("en-US", {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
				style: "currency",
				currency: "USD",
			}).format(row.getValue("BorrowVault"));
			return <div className="font-extralight">{borrowFormat}</div>;
		},
	},
	{
		accessorKey: "action",
		header: () => {
			return <p className="text-center">Action</p>;
		},
		cell: ({ row }) => {
			return (
				<div className="w-72 space-x-2">
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						Borrow
					</Button>
					<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
						Lend
					</Button>
					<Link to={`/orderbook/${row.original.CollateralAddress}`}>
						<Button className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer">
							View Market
						</Button>
					</Link>
				</div>
			);
		},
	},
];
