import fuelquote from "../Backend_Modules/FuelQuote/FuelQuote";
const request = require("supertest");

describe("FuelQuote Module", () => {
  describe("GET /quote_history", () => {
    test("should return 200 OK", async () => {
      const response = await request(fuelquote).get("/quote_history");
      expect(response.status).toBe(200);
    });

    test("should an array of quote history objects", async () => {
      const response = await request(fuelquote).get("/quote_history");
      expect(Array.isArray(response.body)).toBe(true);
    });

    // get this working when we have a database
    // test("should handle errors gracefully", async () => {
    //   // Mock the data to trigger an error
    //   const response = await request(fuelquote).get("/quote_history");
    //   expect(response.status).toBe(500);
    //   expect(response.text).toBe("Server error");
    // });
  });
});
