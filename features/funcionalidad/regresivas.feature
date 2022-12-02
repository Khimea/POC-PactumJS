Feature: Regresivas backend

    Scenario: Hacer un post a nuestra API
        Given Deseo hacer un post con json OcultInstruFail
        When Recibimos el response
        Then Espero un response con el status 400
        And Espero un response con la key: code & value: error
