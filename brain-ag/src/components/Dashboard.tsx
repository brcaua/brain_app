import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
];

const Dashboard: React.FC = () => {
  const producers = useSelector(
    (state: RootState) => state.producers.producers
  );

  const totalFarms = producers.length;
  const totalArea = producers.reduce(
    (acc, producer) => acc + producer.totalArea,
    0
  );

  const farmsByState = producers.reduce((acc: any, producer) => {
    acc[producer.state] = (acc[producer.state] || 0) + 1;
    return acc;
  }, {});

  const farmsByCrop = producers.reduce((acc: any, producer) => {
    producer.crops.forEach((crop) => {
      acc[crop] = (acc[crop] || 0) + 1;
    });
    return acc;
  }, {});

  const landUse = producers.reduce(
    (acc: any, producer) => {
      acc.arableArea += producer.arableArea;
      acc.vegetationArea += producer.vegetationArea;
      return acc;
    },
    { arableArea: 0, vegetationArea: 0 }
  );

  const stateData = {
    labels: Object.keys(farmsByState),
    datasets: [
      {
        data: Object.values(farmsByState),
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const cropData = {
    labels: Object.keys(farmsByCrop),
    datasets: [
      {
        data: Object.values(farmsByCrop),
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const landUseData = {
    labels: ["Área Agricultável", "Área de Vegetação"],
    datasets: [
      {
        data: [landUse.arableArea, landUse.vegetationArea],
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  return (
    <div className="card">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p>Total de Fazendas: {totalFarms}</p>
      <p className="mb-2">Total de Área: {totalArea} hectares</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="text-center">
          <h3 className="text-md font-bold mb-1">Fazendas por Estado</h3>
          <Pie data={stateData} />
        </div>

        <div className="text-center">
          <h3 className="text-md font-bold mb-1">Fazendas por Cultura</h3>
          <Pie data={cropData} />
        </div>

        <div className="text-center">
          <h3 className="text-md font-bold mb-1">Uso do Solo</h3>
          <Pie data={landUseData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
