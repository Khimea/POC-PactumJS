const {
    Given,
    When,
    Then,
    Before,
    After,
    JsonFormatter,
  } = require("@cucumber/cucumber");
const pactum = require("pactum");
const { request, settings } = require("pactum");
const apikey = process.env.APIKEY;

let spec = pactum.spec();

Before(() => {
    spec = pactum.spec();
  });
  
/*
  OCULTAR INSTRUCCIONES
*/

Given(/^Deseo hacer un post con json (.*)$/,(json) =>{
  let jsonBody = require("../ocultarInstrucciones/" + json + ".json");
  spec
    .post(process.env.PATH_HIDE)
    .withHeaders("x-api-key", apikey)
    .withJson(jsonBody);
});

Given(/^Deseo hacer un get con json(.*)$/, (json) => {
  let jsonBody = require("../ocultarInstrucciones/" + json + ".json");
  spec
    .get(process.env.PATH_HIDE)
    .withHeaders("x-api-key", apikey)
    .withJson(jsonBody);
});

/*
 * WHEN
 */
When("Recibimos el response", async function () {
    await spec.toss();
  });

  /*
 * THEN
 */
Then("Espero un response con el status {int}", function (code) {
    spec.response().should.have.status(code);
  });
  
  Then(/^Espero un response con la key: (.*) & value: (.*)$/,function (field, value) {
      const jsonData = spec._request.body;
      spec.response().should.have.jsonMatch(field, value);
    }
  );



  After(() => {
    console.log(">------REQUEST----------");
  
    console.log("Request Method: " + spec._request.method);
    console.log("Request URL: " + spec._request.url);
    console.log("Request Path: " + spec._request.path);
    console.log("Request Body: " + JSON.stringify(spec._request.body));
  
    console.log("------REQUEST---------->");
  
    console.log("<------RESPONSE--------");
    try {
      console.log("Response Status: " + spec._response.statusCode);
      console.log("Response Body: " + JSON.stringify(spec._response.body));
    } catch (error) {
      console.log(result);
    }
    console.log("------RESPONSE--------<");
    spec.end();
  });
  