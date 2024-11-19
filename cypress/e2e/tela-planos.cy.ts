describe("Planos Component", () => {
  it("Deve renderizar com a quantidade correta de planos existentes e o texto do botão esperado", () => {
    cy.visit(`localhost:3000/plano`);

    cy.get("h2").should("contain.text", "Nossos Planos");

    cy.get(".MuiGrid-item").should("have.length", 10);

    cy.get("button").should("contain.text", "Escolher Plano");
  });
});
