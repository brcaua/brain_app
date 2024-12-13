import React from "react";
import ProducerForm from "./components/ProducerForm";
import ProducerList from "./components/ProducerList";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Brain Agriculture</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        <div className="col-span-1/2">
          <ProducerForm />
        </div>
        <div className="col-span-2">
          <Dashboard />
        </div>
        <div className="col-span-3">
          <ProducerList />
        </div>
      </div>
    </div>
  );
};

export default App;
