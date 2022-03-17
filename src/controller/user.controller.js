const express = require("express");

const User = require("../modules/user.models");

const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  // .custom(async (value) => {
  //   const user = await User.findOne({ value });
  //   console.log(user);
  // }),
  body("last_name").trim().not().isEmpty().withMessage("Last Name is required"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (value) {
        throw new Error("Email is already taken");
      }
    }),

  body("pincode")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Pincode is required")
    .custom(async (value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      // const passw = /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
      if (!value.match(passw)) {
        throw new Error("Pincode must be strong");
      }
      return true;
    })
    .custom(async (value) => {
      if (value.length !== 6) {
        return true;
      }

      throw new Error("Pincode contains only 6 characters");
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age is required")
    .custom(async (value) => {
      if (value < 1 || value > 100) {
        throw new Error("Age is not correct");
      }
      return true;
    }),
  body("gender").trim().not().isEmpty().withMessage("Gender is required"),
  async (req, res) => {
    // console.log(body("first_name"));
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      console.log("err", err.massege);
    }
  }
);

module.exports = router;
