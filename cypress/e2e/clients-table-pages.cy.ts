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

    cy.get('@clients').then( clients => {
      cy.get('tbody tr').each(($row, index)=>{
        const client: any = clients[index];
        cy.wrap($row).find('th').should('contain', client.id);
        cy.wrap($row).find('td').eq(0).find('a').should('contain', client.name);
        cy.wrap($row).find('td').eq(1).should('contain', client.phone);
        cy.wrap($row).find('td').eq(2).should('contain', client.dateOfBirth);
        cy.wrap($row).find('td').eq(3).should('contain', client.comments);
      })
    });
  });


  it('Should navigate to ClientForm when click Button "Novo"', () => {
    cy.get("#btnNovo").click();
    cy.contains('Cadastro de Clientes:').should('be.visible');
  });

})
