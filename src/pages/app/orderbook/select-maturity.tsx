import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { maturityList } from ".";
import { useCLOBState } from "./clob-state";

export default function SelectMaturity() {
	const { state, dispatch } = useCLOBState();
	return (
		<div className="p-6 border border-gray-500 rounded-md">
			<div>
				<div className="flex justify-between items-center text-white">
					<Label htmlFor="maturity">Maturity</Label>
					<Select
						defaultValue={state.maturity.month + state.maturity.year}
						onValueChange={(v) => {
							const month = v.slice(0, 3);
							const year = v.slice(3);
							dispatch({ type: "SET_MATURITY_MONTH", payload: month });
							dispatch({ type: "SET_MATURITY_YEAR", payload: year });
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Maturity" />
						</SelectTrigger>
						<SelectContent className="bg-[#22232E] border-gray-700 text-white">
							<SelectGroup>
								{maturityList.map((m) => (
									<SelectItem key={m} value={m}>
										{m}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
