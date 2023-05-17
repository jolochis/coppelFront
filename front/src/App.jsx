import { List } from "./components";

import { WorkerContext } from "./context/workerContext";
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <WorkerContext>

        <List />
        </WorkerContext>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
