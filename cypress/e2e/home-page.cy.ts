describe('home page', () => {
  
  it('should load home page', () => {
    cy.visit('http://localhost:4200');
  });

  it('NavBar: Cadastro->Cliente should have title: "Cadastro de Clientes"', () => {
    cy.visit('http://localhost:4200'); 
    cy.get('#navbarDropdownCadastro').click();
    cy.get('#navItemCliente').click();
    cy.contains('Cadastro de Clientes:').should('be.visible');
  });

  it('NavBar: Agendamentos->Agebdar should have title: "Fazer um agendamento"', () => {
    cy.visit('http://localhost:4200'); 
    cy.get('#navbarDropdownAgendamento').click();
    cy.get('#navItemAgendar').click();
    cy.contains('Fazer um agendamento:').should('be.visible');
  });

});