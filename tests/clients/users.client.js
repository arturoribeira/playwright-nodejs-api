const { expect } = require('@playwright/test');

class UsersClient {
    /**
    * @param {import('playwright').APIRequest} request
    */
    constructor(request) {
        this.request = request;
        this.baseUri = "https://reqres.in";
    }

    headers() {
        return JSON.stringify({
            "Content-Type": "application/json",
        });
    }

    async postCreateUser(payload, statusCode = 201) {
        const path = '/api/users';
        const uri = this.baseUri + path;
        console.log('Starting Request POST: ', path);
        console.log('Uri: ' + uri);
        console.log("Payload: ");
        console.log(JSON.parse(payload));
        const apiRequest = await this.request.post(uri, { data: JSON.parse(payload), headers: JSON.parse(this.headers()) });
        const apiResponse = await apiRequest.text();
        console.log(`Response: ${path} `);
        console.log(apiResponse);
        console.log(`StatusCode ${path}: ` + apiRequest.status());
        expect(apiRequest.status()).toEqual(statusCode);
        return { apiResponse: apiResponse, payloadSended: JSON.parse(payload) }
    }

    async getUser(statusCode = 200) {
        const path = '/api/users';
        const uri = this.baseUri + path;
        console.log('Starting Request GET: ', path);
        console.log('Uri: ' + uri);
        const apiRequest = await this.request.get(uri, { headers: JSON.parse(this.headers()) });
        const apiResponse = await apiRequest.text();
        console.log(`Response: ${path} `);
        console.log(apiResponse);
        console.log(`StatusCode ${path}: ` + apiRequest.status());
        expect(apiRequest.status()).toEqual(statusCode);
        return { apiResponse: apiResponse }
    }

    async getIdUser(id, statusCode = 200) {
        const path = "/api/users/";
        const uri = this.baseUri + path + id;
        console.log('Starting Request GET: ', path);
        console.log('Uri: ' + uri);
        const apiRequest = await this.request.get(uri, { headers: JSON.parse(this.headers()) });
        const apiResponse = await apiRequest.text();
        console.log(`Response: ${path} `);
        console.log(apiResponse);
        console.log(`StatusCode ${path}: ` + apiRequest.status());
        expect(apiRequest.status()).toEqual(statusCode);
        return { apiResponse: apiResponse }
    }
}



module.exports = { UsersClient };
