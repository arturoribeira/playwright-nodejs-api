const { faker } = require("@faker-js/faker");

function payloadPostCreateUsers() {
    return JSON.stringify({
        "name": faker.person.firstName(),
        "job": faker.person.jobTitle()
    });
}

module.exports = { payloadPostCreateUsers };