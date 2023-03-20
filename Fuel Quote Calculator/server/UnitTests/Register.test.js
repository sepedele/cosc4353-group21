import register from "../Backend_Modules/LoginRegister/Register";
const request = require("supertest");

describe("Regsiter Module", () => {

    describe("Given a username and password", () => {

        test("should respond with a 200 status code if username valid", async () => {
            const response = await request(register).post("/user_register").send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })

        test("should respond with a 400 status code if username invalid", async () => {
            const response = await request(register).post("/user_register").send({
                username: "ocano",
                password: "password"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should specify json in the content type header", async () => {
            const response = await request(register).post("/user_register").send({
                username: "username1",
                password: "password"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("response has non-null response", async () => {
            const response = await request(register).post("/user_register").send({
                username: "username2",
                password: "password"
            })
            expect(response.body.responseMsg).toBeDefined()
        })

    })

    describe("Given an invalid username or password, this covers the validationMiddleware", () => {

        test("should respond with a 400 status code if password is less than 4 char", async () => {
            const response = await request(register).post("/user_register").send({
                username: "username3",
                password: "pas"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should respond with a 400 status code if username is undefined", async () => {
            const response = await request(register).post("/user_register").send({
                username: null,
                password: "password"
            })
            expect(response.statusCode).toBe(400)
        })

        test("should respond with a 400 status code if password is undefined", async () => {
            const response = await request(register).post("/user_register").send({
                username: "username4",
                password: null
            })
            expect(response.statusCode).toBe(400)
        })

    })


})