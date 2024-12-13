import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "react-modal";
import { editProducer, deleteProducer } from "../redux/producerSlice";

const brazilianStates = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

const ProducerList: React.FC = () => {
  const producers = useSelector(
    (state: RootState) => state.producers.producers
  );
  const dispatch = useDispatch();
  const [editingProducerId, setEditingProducerId] = useState<string | null>(
    null
  );
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [cpfCnpjType, setCpfCnpjType] = useState("CPF");
  const [name, setName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [totalArea, setTotalArea] = useState(0);
  const [arableArea, setArableArea] = useState(0);
  const [vegetationArea, setVegetationArea] = useState(0);
  const [crops, setCrops] = useState<string[]>([]);

  const handleEdit = (producer: any) => {
    setEditingProducerId(producer.id);
    setCpfCnpj(producer.cpfCnpj);
    setCpfCnpjType(producer.cpfCnpj.length <= 14 ? "CPF" : "CNPJ");
    setName(producer.name);
    setFarmName(producer.farmName);
    setCity(producer.city);
    setState(producer.state);
    setTotalArea(producer.totalArea);
    setArableArea(producer.arableArea);
    setVegetationArea(producer.vegetationArea);
    setCrops(producer.crops);
  };

  const handleSave = () => {
    const updatedProducer = {
      id: editingProducerId,
      cpfCnpj,
      name,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      crops,
    };
    dispatch(editProducer(updatedProducer));
    setEditingProducerId(null);
  };

  const handleCancel = () => {
    setEditingProducerId(null);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Lista de Produtores</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">CPF/CNPJ</th>
            <th className="py-2">Nome</th>
            <th className="py-2">Fazenda</th>
            <th className="py-2">Cidade</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Área Total</th>
            <th className="py-2">Área Agricultável</th>
            <th className="py-2">Área de Vegetação</th>
            <th className="py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {producers.map((producer) => (
            <tr key={producer.id}>
              <td className="border px-4 py-2">{producer.cpfCnpj}</td>
              <td className="border px-4 py-2">{producer.name}</td>
              <td className="border px-4 py-2">{producer.farmName}</td>
              <td className="border px-4 py-2">{producer.city}</td>
              <td className="border px-4 py-2">{producer.state}</td>
              <td className="border px-4 py-2">{producer.totalArea}</td>
              <td className="border px-4 py-2">{producer.arableArea}</td>
              <td className="border px-4 py-2">{producer.vegetationArea}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(producer)}
                  className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => dispatch(deleteProducer(producer.id))}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={!!editingProducerId}
        onRequestClose={handleCancel}
        contentLabel="Editar Produtor"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Editar Produtor</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full p-2 mb-4 border rounded bg-gray-100">
              {cpfCnpj}
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do Produtor"
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              placeholder="Nome da Fazenda"
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cidade"
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="" disabled>
                Selecione o Estado
              </option>
              {brazilianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={totalArea}
              onChange={(e) => setTotalArea(Number(e.target.value))}
              placeholder="Área Total"
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              value={arableArea}
              onChange={(e) => setArableArea(Number(e.target.value))}
              placeholder="Área Agricultável"
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="number"
              value={vegetationArea}
              onChange={(e) => setVegetationArea(Number(e.target.value))}
              placeholder="Área de Vegetação"
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProducerList;
