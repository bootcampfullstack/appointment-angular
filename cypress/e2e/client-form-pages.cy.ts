describe('Client Form Page', () => {

  beforeEach(() => {
    cy.visit('client-form');
  })

  it('Should have title: "Cadastro de Clientes"', () => {
    cy.contains('Cadastro de Clientes:').should('be.visible');
  });

  it('Should have 3 inputs"', () => {
     cy.get('input').should('have.length', 3);
  });


  it('Should Save a Client', () => {

    cy.visit('clients-table');
    cy.wait(2000);
    
    cy.get('tbody tr').should('have.length',3);

    cy.wait(2000);
    cy.visit('client-form');
    // Digita os valores nos campos do formulário
    cy.get('#name').type('Nome do Cliente');
    cy.get('#phone').type('123456789');
    cy.get('#dateOfBirth').type('1990-01-01');

    // Clica no botão Salvar
    cy.get('.btn-primary').click();
    cy.get('tbody tr').should('have.length', 4);

  });

  
})