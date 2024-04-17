import React, { useState } from "react";
import AccordianData from "./components/data.js";

function App() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const foundIndex = copyMultiple.indexOf(getCurrentId);

    if (foundIndex === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(foundIndex, 1);
    }

    setMultiple(copyMultiple);
  }

  return (
    <>
      <div className="w-screen l-screen bg-blue-500">
        <div className="flex justify-center items-center h-screen">
          <div className="accordian border border-gray-500 p-4 rounded-lg bg-neutral-800 lg:w-1/2">
            <button
              onClick={() => setMultiSelection(!multiSelection)}
              className="text-black border p-2 bg-orange-500 "
            >
              Enable Multi Selection
            </button>
            {AccordianData && AccordianData.length > 0 ? (
              AccordianData.map((dataItem) => (
                <div key={dataItem.id} className="item border border-gray-300 p-4 rounded-lg bg-pink-600 text-2xl ">
                  <div className="flex justify-between items-center">
                    <div
                      onClick={() =>
                        multiSelection
                          ? handleMultiSelection(dataItem.id)
                          : handleSingleSelection(dataItem.id)
                      }
                      className="title"
                    >
                      <h3>Q.{dataItem.que}</h3>
                    </div>
                    <span onClick={() => handleSingleSelection(dataItem.id)}>
                      +
                    </span>
                  </div>
                  {multiSelection
                    ? multiple.includes(dataItem.id) && (
                        <div className="content text-white">{dataItem.ans}</div>
                      )
                    : selected === dataItem.id && (
                        <div className="content text-white"> {dataItem.ans}</div>
                      )}
                </div>
              ))
            ) : (
              <div> no data found </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;