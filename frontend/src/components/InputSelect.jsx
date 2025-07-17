import { Select, Option } from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {BiChevronDown} from "react-icons/bi"
import {AiOutlineSearch} from "react-icons/ai";

// export function SelectDefault() {
//     const [gearType, setGearType] = useState([])
//
//   return (
//     <div className="h-1">
//       <Select label="Select type">
//         <Option>Guitar</Option>
//         <Option>Bass</Option>
//         <Option>Pedal Steel</Option>
//         <Option>Amp</Option>
//         <Option>Pedal</Option>
//       </Select>
//     </div>
//   );
// }

const Selector = () => {
    const [gearType, setgearType] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const [selected, setSelected] = useState("")
    const [open, setOpen] = useState(false)

    const gearTypes = [
        {"name": "guitar"},
        {"name": "bass"},
        {"name": "amp"},
        {"name": "pedal steel"},
        {"name": "pedal"}
    ]
    useEffect(() => {
        setgearType(gearTypes)
    }, []);
    return (
        <div className={`font-medium ${open && "absolute"}`}>
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white p-2 m-2 flex items-center justify-between text-gray-700 rounded-2xl ${!selected && "text-gray-400"}`}>
                {selected ? selected : "Select type"}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`}/>

            </div>

            <ul className={`bg-white mt-2 overflow-y-auto  ${open ? "max-h-40" : "max-h-0"}`}>
                <div className={"flex items-center px-2 sticky top-0 bg-white"}>
                    <AiOutlineSearch  size={18} className={"text-gray-500"}/>
                    <input
                        type="text"
                        value={inputValue}
                        className={"placeholder:text-gray-400 p-2 outline-none text-gray-900"}
                        placeholder="Select gear type"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
                {inputValue}
                 {gearTypes?.map((type) => (
                <li
                    key={type?.name}
                    className={`p-2 text-black hover:bg-sky-500 hover:text-white 
                    ${type?.name?.toLowerCase() === selected?.toLowerCase() && "bg-sky-500"}
                    ${type?.name?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}
                    `}
                    onClick={() => {
                        if(type?.name?.toLowerCase() !== selected.toLowerCase()){
                            setSelected(type?.name)
                            setOpen(false)
                            setInputValue("")
                        }
                    }}
                >
                    {type?.name}
                </li>
            ))}

            </ul>
        </div>
    )
}
export default Selector;