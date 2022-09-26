var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function(){

        var firstName = faker.name.firstName() //Gerando dados de massa dinamicamente
        var lastName = faker.name.lastName()

        var data = {
        name: `${firstName} ${lastName}`,
         cpf: cpf.generate(), 
         email: faker.internet.email(firstName),
         whatsapp: '11999999999',
         address: {
            postalcode: '08265-380',
            street: 'Rua Malmequer-do-campo',
            number: '564',
            details: 'casa 02',
            district: 'Gleba do Pêssego',
            city_state: 'São Paulo/SP'
         }, 
         delivery_method: 'Moto',
         cnh: 'cnh-digital.jpg'
        }
        return data
    }
}