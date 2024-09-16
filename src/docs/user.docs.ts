export const getAllUsers = `
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all Users
 *     description: Retrieve a list of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved all Users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "User list retrieved successfully"
 *                 data:
 *                   type: array
 *                   properties:
 *                     users:
 *                       type: object
 *                       properties:
 *                         data:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               username:
 *                                 type: string
 *                               email:
 *                                 type: string
 *       500:
 *         description: Internal server error.
 */
`;


export const cuurentUser = `
/**
 * @swagger
 * /api/v1/current_user:
 *   get:
 *     summary: Get Current User
 *     description: Retrieve details of the current loggedin User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved Curent User.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Current Logedin User"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *       500:
 *         description: Internal server error.
 */
`;




