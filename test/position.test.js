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
                uuid:"123123"
            })
            .expect(200)
            .end((err, res) => {
                expect(res.type).to.be.equal("application/json");
                expect(res.body.code).to.be.equal('1000');
                done();
            });
    });

    it("获取全部经纬度", function (done) {
        request(app.listen())
            .get('/positions')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.type).to.be.equal("application/json");
                expect(res.body.code).to.be.equal('1000');
                expect(res.body.data.length).to.be.above(0);
                done();
            });
    });

    it("删除指定UUID经纬度",function(done){
        request(app.listen())
        .del('/positions')
        .set('Content-Type', 'application/json')
        .send({
            uuid:"123123"
        })
        .expect(200)
        .end((err, res) => {
            expect(res.type).to.be.equal("application/json");
            expect(res.body.code).to.be.equal('1000');
            done();
        });
    });

    it("删除全部经纬度",function(done){
        request(app.listen())
        .del('/allPositions')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
            expect(res.type).to.be.equal("application/json");
            expect(res.body.code).to.be.equal('1000');
            done();
        });
    });
})