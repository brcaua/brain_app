import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Producer {
  id: string;
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: string[];
}

interface ProducersState {
  producers: Producer[];
}

const loadProducersFromLocalStorage = (): Producer[] => {
  const producers = localStorage.getItem("producers");
  return producers ? JSON.parse(producers) : [];
};

const saveProducersToLocalStorage = (producers: Producer[]) => {
  localStorage.setItem("producers", JSON.stringify(producers));
};

const initialState: ProducersState = {
  producers: loadProducersFromLocalStorage(),
};

const producersSlice = createSlice({
  name: "producers",
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload);
      saveProducersToLocalStorage(state.producers);
    },
    editProducer: (state, action: PayloadAction<Producer>) => {
      const index = state.producers.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.producers[index] = action.payload;
        saveProducersToLocalStorage(state.producers);
      }
    },
    deleteProducer: (state, action: PayloadAction<string>) => {
      state.producers = state.producers.filter((p) => p.id !== action.payload);
      saveProducersToLocalStorage(state.producers);
    },
  },
});

export const { addProducer, editProducer, deleteProducer } =
  producersSlice.actions;
export default producersSlice.reducer;
