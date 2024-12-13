import { Producer } from "../types/Producer";
import axiosInstance from "./axios";

export const fetchProducers = async (): Promise<Producer[]> => {
  const response = await axiosInstance.get<Producer[]>("/producers");
  return response.data;
};

export const createProducer = async (producer: Producer): Promise<Producer> => {
  const response = await axiosInstance.post<Producer>("/producers", producer);
  return response.data;
};

export const updateProducer = async (
  id: string,
  producer: Producer
): Promise<Producer> => {
  const response = await axiosInstance.patch<Producer>(
    `/producers/${id}`,
    producer
  );
  return response.data;
};

export const deleteProducer = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/producers/${id}`);
};
