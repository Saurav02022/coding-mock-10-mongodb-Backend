const express = require("express");
const { FlightModel } = require("../Models/flight.model");

const FlightRouter = express.Router();

FlightRouter.use(express.json());

FlightRouter.post("/flights", async (req, res) => {
  const data = req.body;
  try {
    let flight = new FlightModel(data);
    await flight.save();
    res.status(201).send("flight details added successfully");
  } catch (err) {
    res.send(err.message);
  }
});

FlightRouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).send(flights);
  } catch (err) {
    res.send(err.message);
  }
});

FlightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await FlightModel.findById({ _id: id });
    res.status(200).send(flight);
  } catch (err) {
    res.send(err);
  }
});

FlightRouter.patch("/flights/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await FlightModel.findByIdAndUpdate({ _id: ID }, payload);
    res.status(200).send("Flights updated");
  } catch (err) {
    res.send("Somthing went wrong while updating the flight");
  }
});

FlightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await FlightModel.findByIdAndDelete({ _id: id });
    res.status(202).send("flight deleted successfully");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  FlightRouter,
};
