const { PrismaClient } = require('@prisma/client');
const { encryptPassword, checkPassword } = require('../../../../utils/auth');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({
      status: 'Fail!',
      message: 'Email tidak ditemukan!',
    });
  }

  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      status: 'Fail!',
      message: 'Password Salah!',
    });
  }

  return res.status(201).json({
    status: 'Success!',
    message: 'Berhasil Login!',
    data: user,
  });
};

const register = async (req, res) => {
  const { email, name, password, profile } = req.body;

  const encryptedPassword = await encryptPassword(password);

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return res.status(400).json({
      status: 'Fail!',
      message: 'Email sudah terdaftar!',
    });
  }
  const createUser = await prisma.user.create({
    data: {
      email,
      name,
      password: encryptedPassword,
      profile: {
        create: profile,
      },
    },
  });

  return res.status(201).json({
    status: 'Success!',
    message: 'Berhasil Register!',
    data: createUser,
  });
};

const registerForm = async (req, res, next) => {
  try {
    const { email, name, password, profile } = req.body;

    const encryptedPassword = await encryptPassword(password);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      req.flash('error', 'Email sudah terdaftar!');
      return res.redirect('/register');
    }
    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
        profile: {
          create: profile,
        },
      },
    });

    req.flash('success', 'Berhasil Register!');
    return res.redirect('/login');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  registerForm,
};
