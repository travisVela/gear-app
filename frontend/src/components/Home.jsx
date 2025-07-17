import React, {useEffect, useRef, useState} from 'react';

import api from '../api';
import AddGearForm from "./AddGearForm.jsx";
import Dialog from "./Dialog.jsx";

const GearList = () => {
    const [gearlist, setGearList] = useState([]);
    const [dialogContent, setDialogContent] = useState(null)
    const dialogRef = useRef(null)

    const columns = [
        {header: 'Type', accessor: 'type'},
        {header: 'Brand', accessor: 'brand'},
        {header: 'Model', accessor: 'model'},
        {header: 'SN', accessor: 'serial_number'},
        {header: 'Year', accessor: 'year'},
        {header: 'Description', accessor: 'description'},
    ];

    function toggleDialog(item) {
        if (!dialogRef) {
            return
        }
        setDialogContent(item)
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close(setDialogContent(null))
            : dialogRef.current.showModal()
    }

    useEffect(() => {
        fetchGearList();
    }, []);

    // API ENDPOINTS

    const fetchGearList = async () => {
        try {
            const response = await api.get('/gearlist');
            setGearList(response.data.gearlist);

        } catch (error) {
            console.error("Error fetching gear", error);
        }
    };

    const addGear = async (type, brand, model, serial_number, year, description) => {
        try {
            await api.post('/gearlist', {
                type: type,
                brand: brand,
                model: model,
                serial_number: serial_number,
                year: year,
                description: description
            });
            fetchGearList();

            console.log(type)
            console.log(brand)
            // Refresh the list after adding a fruit
        } catch (error) {
            console.error("Error adding gear", error);
        }
    };


    return (

        <div
            className="flex flex-row  items-center justify-center p-2 w-screen h-screen mt-2 divide-x-2 divide-sky-500">

            {/*column to set divide*/}
            <div className="flex flex-row items-center w-full justify-center h-3/4">

                {/*inventory column*/}
                {gearlist.length < 1 ? <h1 className={"animate-pulse"}>...</h1> :
                    <div className="container w-full flex flex-col items-center justify-start p-8 h-lvh">
                        <h2 className="p-2 text-2xl">Gear List</h2>
                        <table className={"w-full"}>
                            <thead>
                            <tr className="flex flex-row  border-b border-b-sky-500  items-start justify-start w-full gap-10 space-x-3">
                                {columns.map((column, index) => (
                                    <th className="py-2 flex flex-col w-full items-start"
                                        key={`header-${index}`}>{column.header}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {/* Map over your data to render table rows and cells */}
                            {gearlist.map((item, rowIndex) => (
                                <tr
                                    className={`flex flex-row border-b border-b-slate-500 items-start justify-start w-full gap-10 space-x-3`}
                                    key={`row-${rowIndex}`}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td onClick={column.accessor === 'description' ? () => toggleDialog(item.description) : undefined}
                                            className={`py-2 flex flex-col w-full ${column.accessor === "description" ? "max-h-20 overflow-hidden hover:cursor-pointer text-sky-500 hover:text-sky-700 overflow-ellipsis min-w-24 underline" : ""}`}
                                            key={`cell-${rowIndex}-${colIndex}`}>{item[column.accessor]}

                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {/*form column*/}
            <div className="container h-lvh flex flex-col flex-6/8 justify-center items-center">
                <h2 className="text-3xl ">Add gear here.</h2>
                <AddGearForm addGear={addGear}/>
            </div>
            <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
                {dialogContent}
            </Dialog>


        </div>

    );
};

export default GearList;