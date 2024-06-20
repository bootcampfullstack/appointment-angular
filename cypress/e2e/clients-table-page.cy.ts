describe('Clients Table Page', () => {


  beforeEach(() => {
    cy.visit('clients-table')
  });

  it('Should have title: "Cadastro de Clientes:"', () => {
    cy.contains('Cadastro de Clientes').should('be.visible');
  });

  it('Should have clients in table', () => {
    cy.get('table.table-striped').should('exist');
    cy.get('tbody tr').should('have.length.at.least', 3);

    cy.fixture('clients').as('clients');

    cy.get('tbody tr').then( tr => {
      cy.get('@clients').each( (client:any) => {
        cy.wrap(tr).should('contain', client.id);
        cy.wrap(tr).should('contain', client.name);
        cy.wrap(tr).should('contain', client.phone);
        cy.wrap(tr).should('contain', client.dateOfBirth);
        cy.wrap(tr).should('contain', client.comments);
      })
    });

  });


  it('Should navigate to ClientForm when click Button "Novo"', () => {
    cy.get("#btnNovo").click();
    cy.contains('Cadastro de Clientes:').should('be.visible');
  });

})
