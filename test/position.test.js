const { expect } = require("chai");
const request = require("supertest");
const app = require('../app.js');

describe("定位服务测试", function () {
    it("上传经纬度", function (done) {
        request(app.listen())
            .post('/position')
            .set('Content-Type', 'application/json')
            .send({
                longitude: 30.580735999999998,
                latitude: 104.067072,
            })
            .expect(200)
            .end((err, res) => {
                expect(res.type).to.be.equal("application/json");
                expect(res.body.code).to.be.equal('1000');
                done();
            });
    })
})