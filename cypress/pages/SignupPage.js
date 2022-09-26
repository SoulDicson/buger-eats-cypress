

class SignupPage{
 
    go(){
        cy.visit('/')
        cy.get('a[href="/deliver"]').click() //a=elemento link -- href= redirecionamento pra outra pagina
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //Validando a pagina pelo localizador css - e should(have.text) = Validando o texto.
    }

    fillform(delivery){
        //inserindo os dados da massa no campo
       cy.get('input[name="fullName"]').type(delivery.name)
       cy.get('input[name="cpf"]').type(delivery.cpf)
       cy.get('input[name="email"]').type(delivery.email)
       cy.get('input[name="whatsapp"]').type(delivery.whatsapp)
 
       cy.get('input[name="postalcode"]').type(delivery.address.postalcode)
       cy.get('input[type=button][value="Buscar CEP"]').click()
       cy.get('input[name="address-number"]').type(delivery.address.number)
       cy.get('input[name="address-details"]').type(delivery.address.details)
 
       //Validando o retorno dos dados após o clique do botão Buscar CEP
       cy.get('input[name="address"]').should('have.value', delivery.address.street)
       cy.get('input[name="district"]').should('have.value', delivery.address.district)
       cy.get('input[name="city-uf"]').should('have.value', delivery.address.city_state)
 
       //Clicando nas opções de método de entrega
       cy.contains('.delivery-method li', delivery.delivery_method).click() 
       //Fazendo Upload da CNH
       cy.get('input[accept^="image"]').attachFile('/images/'+ delivery.cnh)
    }

    submit(){
        //Clicando em "Cadastre-se para fazer entregas"
       cy.get('button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){
        cy.get('div[class="swal2-html-container"]').should('have.text', expectedMessage)

    }

    buttonClose(){
        //clicando em fechar
        cy.get('div[class="swal2-actions"]').click()
    }

    alertMessageShouldBe(expectedMessage){
        //Validando o alerta de CPF invalido
      //cy.get('.alert-error').should('have.text', expectedMessage)
      cy.contains('.alert-error', expectedMessage).should('be.visible') //combinando a identificação (classe + texto visivel)
    }

}

export default new SignupPage; //Exportando a class para ser visivel pela camada de teste.