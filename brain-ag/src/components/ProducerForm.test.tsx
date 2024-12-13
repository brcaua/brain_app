import { describe, test, expect, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProducerForm from "./ProducerForm";
import { RootState } from "../redux/store";

const mockStore = configureStore([]);
const initialState: RootState = {
  producers: {
    producers: [],
  },
};

describe("ProducerForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("renders form with initial state", () => {
    render(
      <Provider store={store}>
        <ProducerForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome do Produtor")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome da Fazenda")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cidade")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Área Total")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Área Agricultável")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Área de Vegetação")
    ).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  test("handles CPF/CNPJ toggle", () => {
    render(
      <Provider store={store}>
        <ProducerForm />
      </Provider>
    );

    const cpfRadio = screen.getByLabelText("CPF");
    const cnpjRadio = screen.getByLabelText("CNPJ");

    fireEvent.click(cnpjRadio);
    expect(screen.getByPlaceholderText("CNPJ")).toBeInTheDocument();

    fireEvent.click(cpfRadio);
    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
  });

  test("submits form with correct data", () => {
    render(
      <Provider store={store}>
        <ProducerForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Nome do Produtor"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nome da Fazenda"), {
      target: { value: "Farm XYZ" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cidade"), {
      target: { value: "City ABC" },
    });
    fireEvent.change(screen.getByPlaceholderText("Área Total"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Área Agricultável"), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByPlaceholderText("Área de Vegetação"), {
      target: { value: "30" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Cadastrar/i }));

    // Add assertions to check if the form data is submitted correctly
  });
});
