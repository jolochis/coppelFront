import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {  getWorkers } from "../services/getWorkers";
import CreateWorker from "./CreateWorker";
import { context } from "../context/workerContext";
import toast from "react-hot-toast";
export function List() {
  const [workerList, setWorkerList] = useState([]);
  const ctx = useContext(context);


  const getWorkerList =async  () => {
    const res = await getWorkers();
    setWorkerList(res);

  }
  useEffect(() => {
    getWorkerList();
  }, []);
  useEffect(() => {
    getWorkerList();
  }, [ctx]);

  const handleDelete = (id) => {
    
    toast((t) => (
      <div>
        <p>Are you sure you want to delete id <strong>{id}</strong>?</p>
        <button className="bg-red-500 hover:text-red-700 px-3 py-2 text-white text-sm" onClick={() => {ctx.handleDeleteWorker(id);getWorkerList()}}>Delete</button>
        <button className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2" onClick={() => toast.dismiss(t.id)}>Cancel</button>
      </div>
    ))
    
  };
 
  const handleEdit = (id) => {
    toast((t) => (
      <CreateWorker ctx={ctx} t={t} id={id} />
    ))
  }


  return (
    <>
    <div className="flex flex-col">
    <div className="overflow-x-auto">
      <button className="bg-green-400 rounded-sm px-4 py-2" onClick={() => handleEdit()}>Create Worker</button>
      </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Rol
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                {workerList.map((item, index) => (
                  <tbody className="divide-y divide-gray-200" key={item._id}>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {/* {index + 1} */}
                        {item._id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {item.rol}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {item.project ? item.project : 'Not assigned'}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button className="text-green-300 hover:text-green-700" onClick={() => handleEdit(item._id)}>
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>


    </div>
    </>
  );
}
