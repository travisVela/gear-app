import React, { useEffect, useState } from 'react';
import AddGuitarForm from './AddGutiarForm';
import api from '../api';

const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);
   const columns = [
      { header: 'Brand', accessor: 'brand' },
      { header: 'Model', accessor: 'model' },
      { header: 'SN', accessor: 'serial_number' },
    ];

  const fetchGuitars = async () => {
    try {
      const response = await api.get('/guitars');
      setGuitars(response.data.guitars);

    } catch (error) {
      console.error("Error fetching guitars", error);
    }
  };

  const addGuitar = async (brand, model, serial_number) => {

    try {
      await api.post('/guitars', { brand: brand, model: model, serial_number: serial_number });
      fetchGuitars();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error adding guitars", error);
    }
  };

  useEffect(() => {
    fetchGuitars();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center p-2 w-screen h-screen mt-2 divide-x-2 divide-sky-500">
        <div className="flex flex-row items-center w-full justify-center h-3/4">
        <div className="container flex flex-col items-center justify-start p-8 h-lvh">
          <h2 className="p-2 text-2xl">Guitars List</h2>
          <table >
              <thead>
                <tr className="flex flex-row  border-b border-b-sky-500  justify-start w-full gap-14 space-x-3">
                  {columns.map((column, index) => (
                    <th className="p-2 flex flex-col" key={`header-${index}`}>{column.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Map over your data to render table rows and cells */}
                {guitars.map((item, rowIndex) => (
                  <tr className="flex flex-row border-b border-b-slate-500 items-start justify-start w-full gap-10 space-x-3" key={`row-${rowIndex}`}>
                    {columns.map((column, colIndex) => (
                      <td className="p-2 flex flex-col item justify-center" key={`cell-${rowIndex}-${colIndex}`}>{item[column.accessor]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        </div>
        <div className="container h-lvh   flex flex-col justify-center items-center">
            <h2 className="text-3xl ">Add your gear here.</h2>
            <AddGuitarForm addGuitar={addGuitar} />
        </div>
    </div>
  );
};

export default GuitarList;