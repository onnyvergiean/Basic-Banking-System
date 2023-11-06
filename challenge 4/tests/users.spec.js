const base = require('../app/controllers/api/v1/users');

const mockRequest = (body = {}, query = {}, params = {}) => ({
  body,
  query,
  params,
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('users.getUsers function', () => {
  test('res.json called with users data', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await base.getUsers(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 200,
        message: 'Data ditemukan!',
        data: expect.any(Array),
      })
    );
  });
  test('res.json called with users data for a specific search query', async () => {
    const req = mockRequest({
      search: 'onny',
    });
    const res = mockResponse();

    await base.getUsers(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 200,
        message: 'Data ditemukan!',
        data: expect.any(Array),
      })
    );
  });
  test('res.json called with users data for a specific page and limit', async () => {
    const req = mockRequest(
      {},
      {
        page: 1,
        limit: 10,
      }
    );
    const res = mockResponse();

    await base.getUsers(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 200,
        message: 'Data ditemukan!',
        data: expect.any(Array),
      })
    );
  });
  test('res.json called with no result', async () => {
    const req = mockRequest(
      {},
      {
        page: 3,
      }
    );
    const res = mockResponse();
    await base.getUsers(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: 'success',
        code: 200,
        message: 'Data not found',
      })
    );
  });

  it('should return 500 for internal server error', async () => {
    const prismaMock = {
      user: {
        findMany: jest
          .fn()
          .mockRejectedValue(new Error('Internal Server Error')),
      },
    };

    const req = mockRequest();
    const res = mockResponse();

    const originalPrisma = base.prisma;
    base.prisma = prismaMock;

    await base.getUsers(req, res);

    base.prisma = originalPrisma;

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: 'error',
        code: 500,
      })
    );
  });
});
