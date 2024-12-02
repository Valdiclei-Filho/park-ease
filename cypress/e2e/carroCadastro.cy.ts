import { mount } from "@cypress/react";
import Content from "../../src/app/carroCadastro/content";
import { ROUTES_CONST } from "../../src/shared/route.const";

describe("Cadastro de Carro", () => {
  const colors = [
    { id: 1, nome: "Preto" },
    { id: 2, nome: "Branco" },
    { id: 3, nome: "Azul" },
  ];

  const models = [
    { id: 1, nome: "SUV" },
    { id: 2, nome: "Picape" },
    { id: 3, nome: "Corolla" },
  ];

  beforeEach(() => {
    cy.intercept("POST", `${ROUTES_CONST.CARRO_CADASTRO}`, {
      statusCode: 200,
      body: {},
    }).as("postCarro");
    mount(Content({ colors, models })); // Aqui o mount é usado para renderizar o componente React
  });

  it("Deve renderizar os campos corretamente", () => {
    cy.get('input[name="placa"]').should("be.visible");
    cy.get('input[name="dataCadastro"]')
      .should("be.visible")
      .and("be.disabled");
    cy.get(".MuiAutocomplete-root").should("have.length", 2); // para a cor e modelo
    cy.get("button").contains("Salvar").should("be.visible");
  });

  it("Deve preencher os campos e enviar o formulário", () => {
    cy.get('input[name="placa"]').type("ABC1234");
    cy.get(".MuiAutocomplete-root")
      .eq(0) // cor
      .find("input")
      .type("Preto");
    cy.get(".MuiAutocomplete-root")
      .eq(1) // modelo
      .find("input")
      .type("Fusca");

    cy.get("button").contains("Salvar").click();

    cy.wait("@postCarro").its("request.body").should("include", {
      placa: "ABC1234",
      id_cor: 1,
      id_modelo: 1,
    });
  });

  it("Deve exibir erro se a requisição falhar", () => {
    cy.intercept("POST", "/api/carro", {
      statusCode: 500,
      body: { error: "Erro ao salvar" },
    }).as("postCarroFail");

    cy.get('input[name="placa"]').type("XYZ5678");
    cy.get(".MuiAutocomplete-root").eq(0).find("input").type("Branco");
    cy.get(".MuiAutocomplete-root").eq(1).find("input").type("Civic");

    cy.get("button").contains("Salvar").click();

    cy.wait("@postCarroFail");
    cy.contains("Erro ao salvar").should("be.visible");
  });
});
