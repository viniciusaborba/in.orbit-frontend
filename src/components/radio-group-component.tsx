import { Label } from "./ui/label";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { weeklyFrequency } from "../utils/weekly-frequency";

export function RadioGroupComponent() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="title">Quantas vezes na semana?</Label>
      <RadioGroup>
        {weeklyFrequency.map((item) => (
          <RadioGroupItem value={item.id} key={item.id}>
            <RadioGroupIndicator />
            <span className="text-zinc-600 text-sm font-md leading-none">
              {" "}
              {item.weeklyFrequency}
            </span>
            <span className="font-lg leading-none">{item.icon}</span>
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </div>
  );
}
