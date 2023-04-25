import fuelquoteform from "../Backend_Modules/FuelQuote/FuelQuoteForm";
const request = require("supertest");

describe("Fuel Quote Form Module", () => {

    describe("Getting address of user", () => {

        test("should respond with a 200 status code and have defined response values given user id", async () => {
            const response = await request(fuelquoteform).post("/getAddress").send({
                user_id: 4
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.delivery_address).toBeDefined()
        })

    })

    describe("Pricing Module", () => {

        test("should respond with a 200 status code and testing more than 1000 gallons", async () => {
            const response = await request(fuelquoteform).post("/getQuote").send({
                user_id: 4,
                gallons: 1111
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.suggested_price).toBe(1.695)
            expect(response.body.total).toBe(1883.145)
        })

        test("should respond with a 200 status code and testing less than 1000 gallons", async () => {
            const response = await request(fuelquoteform).post("/getQuote").send({
                user_id: 4,
                gallons: 900
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.suggested_price).toBe(1.71)
            expect(response.body.total).toBe(1539)
        })

        test("should respond with a 200 status code and testing not in Texas", async () => {
            const response = await request(fuelquoteform).post("/getQuote").send({
                user_id: 6,
                gallons: 900
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.suggested_price).toBe(1.74)
            expect(response.body.total).toBe(1566)
        })

        test("should respond with a 200 status code and testing no quote history", async () => {
            const response = await request(fuelquoteform).post("/getQuote").send({
                user_id: 8,
                gallons: 900
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.suggested_price).toBe(1.755)
            expect(response.body.total).toBe(1579.5)
        })

    })

    describe("Submitting Quote", () => {

        test("should respond with a 200 status code and have defined response given submission values", async () => {
            const response = await request(fuelquoteform).post("/submitQuote").send({
                gallons: 1,
                delivery_date: "2023-4-20",
                delivery_address: "123 Main St.",
                total: 1,
                user_id: 4,
                suggested_price: 1
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.responseMsg).toBeDefined()
        })

    })

    describe("Given an invalid field, this covers the validationMiddleware", () => {

        test("should respond with a 400 status code if gallons is undefined", async () => {
            const response = await request(fuelquoteform).post("/getQuote").send({
                user_id: 4,
                gallons: null
            })
            expect(response.statusCode).toBe(400)
        })

        test("should respond with a 400 status code if user_id is undefined", async () => {
            const response = await request(fuelquoteform).post("/getQuote").send({
                user_id: null,
                gallons: 25
            })
            expect(response.statusCode).toBe(400)
        })        

        test("should respond with a 400 status code if user_id is undefined", async () => {
            const response = await request(fuelquoteform).post("/submitQuote").send({
                gallons: 1,
                delivery_date: "2023-4-20",
                delivery_address: "123 Main St.",
                total: 1,
                user_id: null,
                suggested_price: 1
            })
            expect(response.statusCode).toBe(400)
        })

    })

})