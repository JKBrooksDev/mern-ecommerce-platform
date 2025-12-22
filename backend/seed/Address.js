const Address = require("../models/Address");

const addresses = [
  {
    _id: "65c26398e1e1a2106ac8fbd5",
    user: "65b8e564ea5ce114184ccb96",
    street: "frog lvl rd",
    city: "Ewing",
    state: "Virginia",
    phoneNumber: "8655855573",
    postalCode: "24248",
    country: "USA",
    type: "Home",
    __v: 0,
  },
  {
    _id: "65c26412e1e1a2106ac8fbd8",
    user: "65b8e564ea5ce114184ccb96",
    street: "frog lvl rd",
    city: "Ewing",
    state: "Virginia",
    phoneNumber: "6066703579",
    postalCode: "24248",
    country: "USA",
    type: "Buisness",
    __v: 0,
  },
];

exports.seedAddress = async () => {
  try {
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.log(error);
  }
};