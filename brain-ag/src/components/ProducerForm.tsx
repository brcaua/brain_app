import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputMask from "react-input-mask";
import MultiSelect from "./MultiSelect";
import { createProducer } from "../api/producerApi";
import { Producer } from "../types/Producer";
import { useDispatch, useSelector } from "react-redux";
import { editProducer, addProducer } from "../redux/producerSlice";
import { RootState } from "../redux/store";

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

const cropOptions = ["Milho", "Soja", "Algodão", "Café", "Cana-de-açúcar"];

const ProducerForm: React.FC<{
  editingProducerId?: string;
  onEditComplete?: () => void;
}> = ({ editingProducerId, onEditComplete }) => {
  const dispatch = useDispatch();
  const producers = useSelector(
    (state: RootState) => state.producers.producers
  );
  const editingProducer = producers.find((p) => p.id === editingProducerId);

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

  useEffect(() => {
    if (editingProducer) {
      setCpfCnpj(editingProducer.cpfCnpj);
      setName(editingProducer.name);
      setFarmName(editingProducer.farmName);
      setCity(editingProducer.city);
      setState(editingProducer.state);
      setTotalArea(editingProducer.totalArea);
      setArableArea(editingProducer.arableArea);
      setVegetationArea(editingProducer.vegetationArea);
      setCrops(editingProducer.crops);
    }
  }, [editingProducer]);

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCpfCnpj(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProducer: Producer = {
      id: editingProducerId || uuidv4(),
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

    try {
      if (editingProducerId) {
        await editProducer(editingProducerId, newProducer);
        dispatch(editProducer(newProducer));
        if (onEditComplete) onEditComplete();
      } else {
        await createProducer(newProducer);
        dispatch(addProducer(newProducer));
      }
    } catch (error) {
      console.error("Error saving producer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-2xl font-bold mb-4">
        {editingProducerId
          ? "Editar Produtor Rural"
          : "Cadastrar Produtor Rural"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-wrap mb-4 gap-x-4">
            <label>
              <input
                type="radio"
                className="mr-2"
                value="CPF"
                checked={cpfCnpjType === "CPF"}
                onChange={() => setCpfCnpjType("CPF")}
              />
              CPF
            </label>
            <label>
              <input
                type="radio"
                className="mr-2"
                value="CNPJ"
                checked={cpfCnpjType === "CNPJ"}
                onChange={() => setCpfCnpjType("CNPJ")}
              />
              CNPJ
            </label>
          </div>
          <InputMask
            mask={
              cpfCnpjType === "CPF" ? "999.999.999-99" : "99.999.999/9999-99"
            }
            value={cpfCnpj}
            onChange={handleCpfCnpjChange}
            placeholder={cpfCnpjType}
            required
            className="w-full p-2 mb-4 border rounded"
          />
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
        <label>
          Área Total
          <input
            type="number"
            value={totalArea}
            onChange={(e) => setTotalArea(Number(e.target.value))}
            placeholder="Área Total"
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </label>
        <label>
          Área Agricultável
          <input
            type="number"
            value={arableArea}
            onChange={(e) => setArableArea(Number(e.target.value))}
            placeholder="Área Agricultável"
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </label>
        <label>
          Área de Vegetação
          <input
            type="number"
            value={vegetationArea}
            onChange={(e) => setVegetationArea(Number(e.target.value))}
            placeholder="Área de Vegetação"
            required
            className="w-full p-2 mb-4 border rounded"
          />
        </label>
        <div className="col-span-1 md:col-span-2">
          <MultiSelect
            options={cropOptions}
            selectedOptions={crops}
            onChange={setCrops}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {editingProducerId ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default ProducerForm;
