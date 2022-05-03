const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100 + 1);
  res.status(200).json({
    msg: `Hi there ${req.userName}`,
    secret: `Here is your secret lucky number ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
