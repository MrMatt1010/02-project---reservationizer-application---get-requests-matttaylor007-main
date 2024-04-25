const mongoose = require("mongoose");
const { seedData } = require("./seedData");

const { MongoMemoryServer } = require("mongodb-memory-server");

let instance;

beforeAll(async () => {
  instance = await MongoMemoryServer.create();
  await mongoose.connect(instance.getUri());

  await seedData(mongoose);
});

afterAll(async () => {
  await mongoose.disconnect();
  await instance.stop();
});
