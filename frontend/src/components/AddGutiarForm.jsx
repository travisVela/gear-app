
import React, { useState } from 'react';



const AddGuitarForm = ({ addGuitar }) => {
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serial_number, setSerial] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (brand) {
            addGuitar(brand, model, serial_number);
            setBrand("")
            setModel("")
            setSerial("")
        }

    }

    return (
        <form className="my-4 w-50 flex flex-col" onSubmit={handleSubmit}>
            <div className="form-control">
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Enter guitar brand"
                    className="input border  border-gray-500 rounded-2xl w-full p-2 m-2"
                />
            </div>
            <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter guitar model"
                className="input border border-gray-500  rounded-2xl w-full  p-2 m-2"
            />
            <input
                type="text"
                value={serial_number}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="Enter guitar serial number"
                className="input border border-gray-500  w-full rounded-2xl  p-2 m-2"
            />
            <button className="m-2" type="submit">Add Guitar</button>
        </form>
    )
}

export default AddGuitarForm;