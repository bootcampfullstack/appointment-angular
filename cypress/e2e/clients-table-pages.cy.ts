describe('Clients Table Pages', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/clients-table');
  })

  it('Should have title: "Cadastro de Clientes"', () => {
    cy.contains('Cadastro de Clientes:').should('be.visible');
  });


  it('Should open ClientForm: click Button "Novo"', () => {
    cy.get('#btnNovo').click();
    cy.contains('Cadastro de Clientes:').should('be.visible');

    // Verifica se os campos de entrada estão presentes
    cy.get('input#name').should('exist');
    cy.get('input#phone').should('exist');
    cy.get('input#dateOfBirth').should('exist');

    // Verifica se os rótulos dos campos de entrada estão presentes
    cy.contains('label', 'Nome:').should('exist');
    cy.contains('label', 'Telefone:').should('exist');
    cy.contains('label', 'Data de Nascimento:').should('exist');

    // Verifica se os botões estão presentes
    cy.contains('button', 'Cancelar').should('exist');
    cy.contains('button', 'Salvar').should('exist');
  });

  it('Should list clients in Table', () => {
    // Verifica se a tabela está presente
    cy.get('table.table-striped').should('exist');

    // Verifica se existem clientes na tabela
    cy.get('tbody tr').should('have.length.at.least', 3);

    cy.fixture('clientes').as('clientes');

    // Usando function para acessar o alias corretamente
    cy.get('@clientes').then(clientes  => {
      // Verifica se existem clientes na tabela
      cy.get('tbody tr').should('have.length', clientes.length);

      // Verifica os dados dos clientes
      cy.get('tbody tr').each(($row, index) => {
        const client:any = clientes[index];
        console.log(client);
        cy.wrap($row).find('th').eq(0).should('contain', client.id); // Verifica o número do cliente
        cy.wrap($row).find('td').eq(0).find('a').should('exist').and('have.text', client.name); // Verifica se o link para o formulário de cliente está presente e contém o nome do cliente
        cy.wrap($row).find('td').eq(1).should('have.text', client.phone); // Verifica o telefone do cliente
        cy.wrap($row).find('td').eq(2).should('have.text', new Date(client.dateOfBirth +'T00:00:00').toLocaleDateString()); // Verifica a data de nascimento do cliente
      });
    });
  });


})