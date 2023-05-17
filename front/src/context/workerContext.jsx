import { useState,createContext } from "react";
import { createWorker, deleteWorker, getWorkers,updateWorker } from "../services/getWorkers";
export const context = createContext()
export const WorkerContext = ({ children }) => {
  const [workers, setWorkers] = useState([]);

  const getData = async() => {
    const res = await getWorkers();
    setWorkers(res);
  }
  const handleCreateWorker = async(data) => {
    try {
      await createWorker(data);
      await getData()
    } catch (error) {
      console.log(error)
      return error
    }
  }
  const handleDeleteWorker = async(id) => {
    try {
      const res = await deleteWorker(id)
      await getData()
      return(res)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEditWorker = async(id,data) => {
    try {
      const res = await updateWorker(id,data)
      await getData()
      return(res)
    } catch (error) {
      console.log(error)
    }
  }
  
  return <context.Provider value={{
    workers,
    setWorkers,
    handleDeleteWorker,
    getData,
    handleCreateWorker,
    handleEditWorker
  }}>{children}</context.Provider>
};
