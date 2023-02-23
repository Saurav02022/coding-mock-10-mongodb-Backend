const express = require("express");
const { BookingModel } = require("../Models/booking.model");

const BookingRouter = express.Router();

BookingRouter.post("/booking", async (req, res) => {
  const { user, flight } = req.body;

  try {
    if (user && flight) {
      let booking = new BookingModel({ user, flight });
      await booking.save();
      res.status(201).send("Book successfully");
    } else {
      res.status(401).send("All filed required");
    }
  } catch (err) {
    res.send(err);
  }
});
BookingRouter.get("/dashboard", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).send(bookings);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  BookingRouter,
};
