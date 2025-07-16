
import React, { useState } from 'react';
import {SelectDefault} from "./InputSelect";



const AddGearForm = ({ addGear }) => {
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerial] = useState("")
    const [year, setYear] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (brand) {
            addGear(brand, model, serial_number, year, description);
            setBrand("")
            setModel("")
            setSerial("")
            setYear("")
            setDescription("")
        }

    }

    return (
        <form className="my-4 w-50 flex flex-col" onSubmit={handleSubmit}>
            <div className="form-control">
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Enter brand"
                    className="input border  border-gray-500 rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
                />
            </div>
            <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter model"
                className="input border border-gray-500  rounded-2xl w-full p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
            />
            <input
                type="text"
                value={serial_number}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="Enter serial number"
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
            />
            <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter year"
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2 focus:border-sky-500 focus:ring-0 focus:outline-none"
            />
            <SelectDefault />
            <button className="m-2" type="submit">Add Gear</button>
        </form>
    )
}

export default AddGearForm;