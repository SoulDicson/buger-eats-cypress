
import signup from '../pages/SignupPage'  //Importando a class atraves da navegação relativa
import SignupFactory from '../factories/signupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => { //Criando uma suite de test

  /*  before(function(){
     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
   })

   beforeEach(function(){
    cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
   })

   after(function(){
    cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
  })

  afterEach(function(){
    cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
   }) */

  //  beforeEach(function() { //Função para pegar os dados da massa alocada na fixture (delivery.json)
  //      cy.fixture('delivery').then((d)=>{
  //         this.delivery = d
  //      })
  //  })

  it('User should be deliver', function () { //Criando o primeiro caso de teste

    var deliver = SignupFactory.deliver()

    signup.go()
    signup.fillform(deliver)
    signup.submit()

    //Validando a tela de envio com sucesso
    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signup.modalContentShouldBe(expectedMessage)
    signup.buttonClose()
  })

  it('Invalid document', function () { //Caso teste : CPF invalido

    var deliver = SignupFactory.deliver()
    deliver.cpf = '0000232AA'

    signup.go()
    signup.fillform(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido')
  })

  it('Invalid email', function () {

    var deliver = SignupFactory.deliver()
    deliver.email = 'tester2.com.br'

    signup.go()
    signup.fillform(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! Email com formato inválido.')
  })

  context.only('Required fields', function () {

    const messages = [
      { field: 'name', output: 'É necessário informar o nome' },
      { field: 'cpf', output: 'É necessário informar o CPF' },
      { field: 'email', output: 'É necessário informar o email' },
      { field: 'postalcode', output: 'É necessário informar o CEP' },
      { field: 'number', output: 'É necessário informar o número do endereço' },
      { field: 'delivery_method', output: 'Selecione o método de entrega' },
      { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
    ]

    before(function(){ 
      SignupPage.go()
      SignupPage.submit()
    })

    messages.forEach(function(msg){
      it(`${msg.field} is required`, function(){
        SignupPage.alertMessageShouldBe(msg.output)
      })
    })

  })


})

