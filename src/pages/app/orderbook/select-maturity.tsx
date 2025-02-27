import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function SelectMaturity() {
	return (
		<div className="p-6 border border-gray-300 rounded-md">
			<div>
				<div className="flex justify-between items-center">
					<Label htmlFor="maturity">Maturity</Label>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Maturity" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Maturity</SelectLabel>
								<SelectItem value="apple">March2025</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
