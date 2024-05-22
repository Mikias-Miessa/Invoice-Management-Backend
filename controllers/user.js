const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const prisma = new PrismaClient();

module.exports.RegisterUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(newUser.id),
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

module.exports.LoginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    console.log(req.body);
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: 'No user found with this email',
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Wrong Password',
      });
    }

    return res.status(200).json({
      message: 'Authentication successful, Logged in user',
      token: generateToken(existingUser.id),
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
