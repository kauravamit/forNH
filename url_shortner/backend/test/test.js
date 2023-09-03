'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const expect = chai.expect;

chai.use(chaiHttp);

describe('/Check health api', () => {
    it('it should GET the message as healthy', async () => {
        chai.request(server);
        const res = await chai
            .request(server)
            .get('/api/health/');
        const result = await res.body;
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('healthy');
    });
});

describe('/Check home page', () => {
    it('it should return 200 status', async () => {
        chai.request(server);
        const res = await chai
            .request(server)
            .get('/');
        expect(res.status).to.equal(200);
    });
});
