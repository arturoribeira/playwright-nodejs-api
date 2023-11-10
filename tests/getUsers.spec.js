const { test } = require('@playwright/test');
const { UsersClient } = require('./clients/users.client');
const { Contract } = require('./helpers/contract');

test.describe('Validate List Users @listallUsers @allTests', () => {
  test('Validate get users @listalluserssucess', async ({ request }) => {
    const usersClient = new UsersClient(request)
    const response = (await usersClient.getUser(200)).apiResponse
    new Contract().validateContract(JSON.parse(response), "../schemas/getListUsers.json")
  });

  test('Validate get id users @listiduserssucess', async ({ request }) => {
    const usersClient = new UsersClient(request)
    const response = (await usersClient.getIdUser(1, 200)).apiResponse
    new Contract().validateContract(JSON.parse(response), "../schemas/getListIdUsers.json")
  });

  test('Validate get id users @listiduserssucesscreate', async ({ request }) => {
    const payload = require("./mocks/payloadPostUsers").payloadPostCreateUsers();
    const usersClient = new UsersClient(request)
    const response = (await usersClient.postCreateUser(payload, 201)).apiResponse
    const id = JSON.parse(response).id
    console.log(id)
    const responseget = (await usersClient.getIdUser(id, 200)).apiResponse
  });
});