export const getAllUsers = `
/**
 * @swagger
 * /api/v1/auth/users:
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