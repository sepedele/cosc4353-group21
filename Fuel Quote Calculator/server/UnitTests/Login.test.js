import login from "../Backend_Modules/LoginRegister/Login";
const request = require("supertest");

describe("Login Module", () => {

    describe("Given a valid username and password", () => {

        test("should respond with a 200 status code and have defined response values given correct credentials", async () => {
            const response = await request(login).post("/user_login").send({
                username: "ocano",
                password: "1234" // these credentials exist in the user array in Login.js
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.isFirst).toBeDefined()
            expect(response.body.user_id).toBeDefined()
        })

        test("should respond with a 400 status code with invalid password credential", async () => {
            const response = await request(login).post("/user_login").send({
                username: "ocano",
                password: "password"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should respond with a 400 status code with invalid credentials", async () => {
            const response = await request(login).post("/user_login").send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should specify json in the content type header", async () => {
            const response = await request(login).post("/user_login").send({
                username: "duck",
                password: "5678"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("response has non-null response", async () => {
            const response = await request(login).post("/user_login").send({
                username: "username2",
                password: "password"
            })
            expect(response.body.responseMsg).toBeDefined()
        })

    })

    describe("Given an invalid username or password, this covers the validationMiddleware", () => {

        test("should respond with a 400 status code if password is less than 4 char", async () => {
            const response = await request(login).post("/user_login").send({
                username: "username3",
                password: "pas"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should respond with a 400 status code if username is undefined", async () => {
            const response = await request(login).post("/user_login").send({
                username: null,
                password: "password"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should respond with a 400 status code if password is undefined", async () => {
            const response = await request(login).post("/user_login").send({
                username: "username4",
                password: null
            })
            expect(response.statusCode).toBe(400)
        })

    })

})