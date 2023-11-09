import chai from "chai";
import chaiHttp from "chai-http";
import app from "../application/app.js";

chai.use(chaiHttp);

describe('Geolocation Services Tests', () => {
    it("Should return status 204", (done) => {
        chai.request(app)
            .get("/api/v1/geolocations")
            .end((error, response) => {
                chai.expect(response).to.have.status(200);
                done();
            });
    });
})