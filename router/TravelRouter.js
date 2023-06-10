const express = require("express");
const TravelRouter = express.Router();
const { TravelModel } = require("../model/TravelModel");

// <------ Adding Travel Endpoint ---------
TravelRouter.post("/travels", async (req, res) => {
  const payload = req.body;
  try {
    const traveldetail = new TravelModel(payload);
    await traveldetail.save();
    res.status(201).json({
      msg: "Travel Data Added",
    });
  } catch (error) {
    console.log(error);
  }
});

// <--------- Retreiving All Travels Data Endpoint
TravelRouter.get("/travels", async (req, res) => {
  try {
    const travels = await TravelModel.find();
    res.status(200).send(travels);
  } catch (error) {
    console.log(error);
  }
});

// <--------- Deleting the travel data by it's id
TravelRouter.delete("/travels/:id", async (req, res) => {
  const travelID = req.params.id;
  try {
    await TravelModel.findOneAndDelete({ _id: travelID });
    res.status(201).json({
      msg: "Travel Data Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

// <-------- Filtering the data endpoint

TravelRouter.get("/travels/filter/:destination", async (req, res) => {
  const destination = req.params.destination;
  try {
    const travelData = await TravelModel.aggregate([
      { $match: { destination: destination } },
    ]);
    res.status(200).send(travelData);
  } catch (error) {
    console.log(error);
  }
});

// <------- Sorting the travel data endpoint

TravelRouter.get("/travels/sort/:order", async (req, res) => {
  const order = req.params.order;
  try {
    if (order === "asc") {
      const travelData = await TravelModel.aggregate([
        { $sort: { budget_per_person: 1 } },
      ]);
      res.status(201).send(travelData);
    } else if (order === "desc") {
      const travelData = await TravelModel.aggregate([
        { $sort: { budget_per_person: -1 } },
      ]);
      res.status(201).send(travelData);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { TravelRouter };
