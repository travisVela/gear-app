import { Select, Option } from "@material-tailwind/react";

export function SelectDefault() {
  return (
    <div className="">
      <Select label="Select type">
        <Option>Guitar</Option>
        <Option>Bass</Option>
        <Option>Pedal Steel</Option>
        <Option>Amp</Option>
        <Option>Pedal</Option>
      </Select>
    </div>
  );
}
export default SelectDefault;