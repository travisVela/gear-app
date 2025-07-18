import React, {useState} from 'react';

import Select from 'react-select'


const AddGearForm = ({addGear}) => {
    const [type, setType] = useState(null)
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerial] = useState("")
    const [year, setYear] = useState("")
    const [description, setDescription] = useState("")


    const options = [
        {value: 'guitar', label: 'guitar'},
        {value: 'bass', label: 'bass'},
        {value: 'steel', label: 'steel'},
        {value: "amp", label: "amp"},
        {value: "pedal", label: "pedal"}
    ]

    const handleSelect = (e) => {
        console.log(e)

        return setType(e.value)
    }
    const selectedType = type ? type : "Select"


    const handleSubmit = (e) => {
        e.preventDefault()

        if (brand) {
            addGear(type, brand, model, serial_number, year, description);
            setType("")
            setBrand("")
            setModel("")
            setSerial("")
            setYear("")
            setDescription("")
        }

    }

    return (
        <form className="my-4  flex flex-col justify-items-center" onSubmit={handleSubmit}>
            <div className={"flex flex-row w-full"}>
                <div className={"flex flex-col w-50"}>
                    <Select
                        options={options}
                        value={type}
                        onChange={handleSelect}
                        placeholder={selectedType}
                        className={`flex flex-col text-gray-900 w-50 ${selectedType !== "Select" ? "text-gray-900" : ""}`}
                    />
                </div>
                <div className={"flex flex-col w-50"}>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Enter brand"
                        className="input border border-gray-500 rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                    />
                </div>
            </div>


            <div className={"flex flex-row w-full"}>
                <div className={"flex flex-row w-50"}>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Enter model"
                        className="input border border-gray-500  rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                    />
                </div>
                <div className={"flex flex-col w-50"}>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter year"
                        className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                    />

                </div>
            </div>
            <input
                type="text"
                value={serial_number}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="Enter serial number"
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
            />

            <textarea

                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                rows="5"
                cols={"40"}
            />

            <button className="m-2" type="submit">Add Gear</button>
        </form>
    )
}

export default AddGearForm;