import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenizedBonds } from "@/types";
import { Link } from "react-router-dom";
import { AvatarCollapse } from "@/components/ui/avatar-collapse";

// export type Collection = {
//   id: number;
//   symbol: string;
//   name: string;
//   price: number;
// };

export const columns: ColumnDef<TokenizedBonds>[] = [
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
		accessorKey: "QuoteTokenSymbol",
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
					<AvatarCollapse
						avatarUrls={[
							row.original.BaseTokenIcon,
							row.original.QuoteTokenIcon,
						]}
					/>
				</div>
				{row.original.BaseTokenSymbol}/{row.getValue("QuoteTokenSymbol")}
			</div>
		),
	},
	{
		accessorKey: "RateRange",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent hover:text-white font-extralight"
				>
					APY
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="font-extralight">{row.getValue("RateRange")}</div>;
		},
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
				<div className="font-extralight">{row.getValue("MaturityRange")}</div>
			);
		},
	},
	{
		accessorKey: "PriceRange",
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
			function formatRange(value: string) {
				const [start, end] = value
					.split("~")
					.map((value: string) => Number.parseFloat(value.trim()));
				const formatter = new Intl.NumberFormat("en-US", {
					currency: "USD",
					style: "currency",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				});
				return `${formatter.format(start)} ~ ${formatter.format(end)}`;
			}
			return (
				<div className="font-extralight">
					{formatRange(row.getValue("PriceRange"))}
				</div>
			);
		},
	},
	{
		accessorKey: "Volume24h",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="hover:bg-transparent font-extralight hover:text-white"
				>
					Volume
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			function formatVolume24h(value: number): string {
				let formattedValue: string;

				if (value >= 1_000_000_000) {
					formattedValue = (value / 1_000_000_000).toFixed(2) + "B";
				} else if (value >= 1_000_000) {
					formattedValue = (value / 1_000_000).toFixed(2) + "M";
				} else if (value >= 1_000) {
					formattedValue = (value / 1_000).toFixed(0) + "K";
				} else {
					formattedValue = value.toString();
				}

				return `${formattedValue} USDC`;
			}
			return (
				<div className="font-extralight">
					{formatVolume24h(row.getValue("Volume24h"))}
				</div>
			);
		},
	},
	{
		accessorKey: "action",
		header: () => {
			return <p className="text-center">Action</p>;
		},
		cell: ({ row }) => {
			return (
				<div className="flex gap-3 justify-center items-center">
					<Link
						to={`/tokenizedbond-market/${btoa(JSON.stringify(row.original))}`}
					>
						<Button
							size={"sm"}
							className="bg-[#121421] hover:bg-[#121421]/90 cursor-pointer"
						>
							View Market
						</Button>
					</Link>
				</div>
			);
		},
	},
];
