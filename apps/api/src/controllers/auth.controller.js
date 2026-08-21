const { registerUser, loginUser, getUserById } = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: null,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { token, user } = await loginUser(req.body);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await getUserById(req.user.userId);
    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      token: null,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      message: 'Logout successful',
      token: null,
      data: {},
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me, logout };