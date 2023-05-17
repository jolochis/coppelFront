import axios from "axios";

const getWorkers = async () => {
  try {
    const workers = await axios.get("http://localhost:3000/worker");
    return workers.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getWorker = async (id) => {
  try {
    const workers = await axios.get(`http://localhost:3000/worker/${id}`);
    return workers.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const createWorker = async (data) => {
  try {
    const workers = await axios.post("http://localhost:3000/worker",data);
    return workers;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const deleteWorker = async (id) => {
  try {
    const workers = await axios.delete(`http://localhost:3000/worker/${id}`,);
    return workers;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateWorker = async (id,data) => {
  try {
    const workers = await axios.put(`http://localhost:3000/worker/${id}`,data);
    return workers;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { getWorkers,getWorker,createWorker,deleteWorker,updateWorker };
