
import React, { useState } from 'react';



const AddGuitarForm = ({ addGuitar }) => {
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (brand) {
            addGuitar(brand, model);
            setBrand("")
            setModel("")
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter guitar brand"
            />
            <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter guitar type"
            />
            <button type="submit">Add Guitar</button>
        </form>
    )
}

export default AddGuitarForm;