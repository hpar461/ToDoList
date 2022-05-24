import express from "express";
import routes from "../../../routes";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

let mongod;

const app = express();
app.use(express.json());
app.use("/", routes);

const item1Id = "000000000000000000000001";
const item2Id = "000000000000000000000002";
const item3Id = "000000000000000000000003";

const item1 = {
  _id: new mongoose.Types.ObjectId(item1Id),
  name: "Item 1",
  description: "This is item 1",
};

const item2 = {
  _id: new mongoose.Types.ObjectId(item2Id),
  name: "Item 2",
  description: "This is item 2",
};

const item3 = {
  _id: new mongoose.Types.ObjectId(item3Id),
  name: "Item 3",
  description: "This is item 3",
};

const items = [item1, item2, item3];

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

/**
 * Before each test, initialise the database.
 */
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const collection = await mongoose.connection.db.createCollection("items");
  await collection.insertMany(items);
});

/**
 * After all tests, close the mongoose connection and stop the in-memory MongoDB instance.
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET /api/items", () => {
  it("get all items from server", (done) => {
    request(app)
      .get("/api/items")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const apiItems = res.body;

        expect(apiItems).toBeTruthy();
        expect(apiItems.length).toBe(3);

        for (let i = 0; i < apiItems.length; i++) {
          expect(apiItems[i]._id.toString()).toEqual(items[i]._id.toString());
          expect(apiItems[i].name).toEqual(items[i].name);
          expect(apiItems[i].description).toEqual(items[i].description);
        }

        return done();
      });
  });

  it("create a new item on the server", (done) => {
    const newItem = {
      name: "New Item",
      description: "This is a new item",
    };

    request(app)
      .post("/api/items")
      .send(newItem)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const apiItem = res.body;

        expect(apiItem).toBeTruthy();
        expect(apiItem).toMatchObject(newItem);

        return done();
      });
  });
});

describe("GET /api/items/:id", () => {
  it("get an item by id from the server", (done) => {
    request(app)
      .get(`/api/items/${item1Id}`)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const apiItem = res.body;

        expect(apiItem).toBeTruthy();
        expect(apiItem._id.toString()).toEqual(item1._id.toString());
        expect(apiItem.name).toEqual(item1.name);
        expect(apiItem.description).toEqual(item1.description);

        return done();
      });
  });

  it("should return a 404 if an item does not exist in the server", (done) => {
    request(app)
      .get("/api/items/000000000000000000000004")
      .send()
      .expect(404, done);
  });

  it("update an item on the server", (done) => {
    const updatedItem = {
      name: "Updated Item",
      description: "This is an updated item",
    };

    request(app)
      .put(`/api/items/${item1Id}`)
      .send(updatedItem)
      .expect(204, done);
  });

  it("should return a 404 if an item to update does not exist in the server", (done) => {
    const updatedItem = {
      name: "Updated Item",
      description: "This is an updated item",
    };

    request(app)
      .put("/api/items/000000000000000000000004")
      .send(updatedItem)
      .expect(404, done);
  });

  it("delete an item from the server", (done) => {
    request(app).delete(`/api/items/${item1Id}`).send().expect(204, done);
  });
});
