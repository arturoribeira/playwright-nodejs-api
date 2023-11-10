// @ts-check
const { test } = require('@playwright/test');
const { UsersClient } = require('./clients/users.client');
const { ApiUtils } = require('./helpers/apiUtils');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { Contract } = require('./helpers/contract');

test.describe('Validate Create Users @createUsers @allTests', () => {
    test('Create user @createusersucess', async ({ request }) => {
        // Minha variável payload está carregando o arquivo e executando o método
        const payload = require("./mocks/payloadPostUsers").payloadPostCreateUsers();
        //O parametro request está recebendo a biblioteca de requisições de API do Playwright
        const usersClient = new UsersClient(request)
        const response = (await usersClient.postCreateUser(payload, 201)).apiResponse
        new Contract().validateContract(JSON.parse(response),"../schemas/postCreateUsers.json")
        const id = JSON.parse(response).id
        console.log(id)
    });

    test('Failure create user @failurecreateuser', async ({ request }) => {
        const payload = JSON.stringify({})
        const usersClient = new UsersClient(request)
        await usersClient.postCreateUser(payload, 400)
    });

    const recordsPostCreate = parse(fs.readFileSync(path.join(__dirname, './examples/examplePostUsers.csv')), {
        columns: true,
        skip_empty_lines: false
    });

    for (const record of recordsPostCreate) {
        test(`Validate the POST /api/users request filled in the field ${record.field} with the value ${record.value} @exploratoryPostCreateUsers`, async ({ request }) => {
            const payload = require("./mocks/payloadPostUsers").payloadPostCreateUsers();
            const payloadPostCreateUsers = await new ApiUtils().payloadExploratoryReturn(JSON.parse(payload), record);
            const usersClient = new UsersClient(request)
            await (await usersClient.postCreateUser(payloadPostCreateUsers, parseInt(record.code))).apiResponse;
        });
    }
});