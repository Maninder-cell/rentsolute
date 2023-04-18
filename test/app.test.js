const db = require("../models");
const User = db.User;

const app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

const testing_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MywiZmlyc3ROYW1lIjoiZGZrIiwibGFzdE5hbWUiOiJuZG5maiIsImVtYWlsIjoibWFuaUBlbWFpbC5jb21lZiIsInBhc3N3b3JkIjoiJDJiJDEyJG5CMHJaTEtoVWIwUzR4UG1pU056b3VQZFpjbWgud2o3cFlFS3puNGlIdEFubkhvQXE3QllpIiwiYWNjb3VudF90eXBlIjpudWxsLCJwaG9uZV9ubyI6IiIsImFkZHJlc3MiOiIiLCJibG9ja2VkIjowLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTExVDEyOjA2OjU1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA0LTE3VDA5OjE0OjE3LjAwMFoifSwiaWF0IjoxNjgxODAzMDMyLCJleHAiOjM4NTkwODMwMzJ9.VDI-tpQ7S3foZikVO4lWsiTMro9FH4_xPbQimWLhMVU"

describe("Testing GET request", () => {
  it("should return status code 200", (done) => {
    chai
      .request(app)
      .get("/admin/users")
      .auth(testing_token, { type: 'bearer' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });
});
