const {
  PrismaClient,
  PrismaClientKnownRequestError,
} = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad Request: Request body is empty',
      });
    }

    const { profile, ...data } = req.body;

    const user = await prisma.user.create({
      data: {
        ...data,
        profile: {
          create: profile,
        },
      },
    });

    return res.status(201).json({
      status: 'success',
      code: 200,
      message: 'Data ditambahkan!',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Data ditemukan!',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal server error',
    });
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad Request : ID must be a number',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Data ditemukan!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal server error',
    });
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;

  try {
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad Request : ID must be a number',
      });
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User updated successfully',
      data: updateUser,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal server error',
      });
    }
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Bad Request : ID must be a number',
      });
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Internal server error',
      });
    }
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
