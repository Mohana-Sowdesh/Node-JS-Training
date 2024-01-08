const {loginController} = require('../controllers/userController/login.controller');
const {registerController} = require('../controllers/userController/register.controller');

describe("Testing user registration", () => {
    test('Entering an invalid username', async() => {
        const req = {
            body: {
                username : "Sowdesh^^",
                password : "$irius36jjj"
            }
        };
        const res = {
            json: jest.fn(),
        };

        const result = await registerController(req, res);
        expect(result).toEqual({
            "status": 404,
            "message": "ERROR : Please enter valid username and password"
          });
    }) ;
});