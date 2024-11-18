describe('Footer', () => {
  it('Deve renderizar o rodapé com seus textos', () => {

    cy.visit('localhost:3000')
    cy.get('.footer')
      .should('be.visible')
      .within(() => {
        cy.contains('© 2024 Seu Nome. Todos os direitos reservados.').should('be.visible');
        cy.contains('Termos de Serviço').should('be.visible');
        cy.contains('Política de Privacidade').should('be.visible');
      });
  });
});