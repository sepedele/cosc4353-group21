import fuelquote from "../Backend_Modules/FuelQuote/FuelQuote";
const request = require("supertest");

describe("FuelQuote Module", () => {
  describe("GET /quote_history", () => {
    test("should return 200 OK", async () => {
      const response = await request(fuelquote).get("/quote_history");
      expect(response.status).toBe(200);
    });

    test("should return an array of quote history objects", async () => {
      const response = await request(fuelquote).get("/quote_history");
      expect(Array.isArray(response.body)).toBe(true);
    });

    test("should return quote history objects with the correct properties", async () => {
      const response = await request(fuelquote).get("/quote_history");
      const quote = response.body[0];
      expect(quote).toHaveProperty("address");
      expect(quote).toHaveProperty("date");
      expect(quote).toHaveProperty("gallonsRequested");
      expect(quote).toHaveProperty("quote_id");
      expect(quote).toHaveProperty("suggestedPrice");
      expect(quote).toHaveProperty("total");
      expect(quote).toHaveProperty("user_id");
    });
  });

  // get this working when we have a database
  // test("should handle errors gracefully", async () => {
  //   // Mock the data to trigger an error
  //   const response = await request(fuelquote).get("/quote_history");
  //   expect(response.status).toBe(500);
  //   expect(response.text).toBe("Server error");
  // });
  // test("should handle errors gracefully when querying the database", async () => {
  //   // Mock a database query that fails
  //   const mockQuery = jest.fn().mockImplementation((query, callback) => {
  //     callback(new Error("Database query failed"));
  //   });
  //   mySqlConnection.query = mockQuery;

  //   const response = await request(fuelquote).get("/quote_history");
  //   expect(response.status).toBe(500);
  //   expect(response.text).toBe("Server error");

  //   // Reset mock function
  //   jest.resetAllMocks();
  // });
});
