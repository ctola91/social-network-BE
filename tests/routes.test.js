const request = require("supertest");
const app = require("../server.js");
describe("Post Endpoints", () => {
  let token = '';

  it("should create a new user", async (done) => {
    const res = await request(app).post("/users").send({
        firstName: "Juan",
        lastName: "Perez",
        email: "juan2@sample.com",
        password: "admin123",
        role: "ADMIN_ROLE"
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    done();
  });

  it("should login to the system", async (done) => {
    const res = await request(app).post("/login").send({
      email: "juan2@sample.com",
      password: "admin123"
  });
  expect(res.statusCode).toEqual(200);
  token  = 'bearer ' + res.body.token;
  expect(res.body).toHaveProperty("token");
  done();
  })

  it('should fetch a single user', async (done) => {
    const userId = 1;
    const res = await request(app).get(`/users/${userId}`).set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    done();
  });

  it('should fetch all users', async (done) => {
    const res = await request(app).get('/users').set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.users).toHaveLength(1);
    done();
  });

  it('should update a user by Id', async (done) => {
    const res = await request(app)
      .put('/users/1')
      .send({
        firstName: "Jose",
        lastName: "Gonzales"
      })
      .set('Authorization', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('firstName');
    done()
  });

  it('should return status code 401 if password is not valid', async (done) => {
    const res = await request(app)
      .post('/login')
      .send({
        email: "juan2@sample.com",
        password: "adminadmin",
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message');
    done();
  });

  it('should delete a user', async (done) => {
    const res = await request(app).delete('/users/1').set('Authorization', token);
    expect(res.statusCode).toEqual(204);
    done();
  });

//   it('should respond with status code 404 if resource is not found', async () => {
//     const userId = 1;
//     const res = await request(app).get(`/api/users/${userId}`);
//     expect(res.statusCode).toEqual(404);
//   });
});
