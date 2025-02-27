import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AutoRollSupply() {
	return (
		<RadioGroup defaultValue="off" className="w-full flex justify-end">
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="on" id="on" />
				<Label htmlFor="on">On</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="off" id="off" />
				<Label htmlFor="off">Of</Label>
			</div>
		</RadioGroup>
	);
}
