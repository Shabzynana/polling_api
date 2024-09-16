export const createdPoll = `
/**
 * @swagger
 * /api/v1/poll:
 *   post:
 *     summary: Create a new poll
 *     tags: [Poll]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: blackdev
 *     responses:
 *       201:
 *         description: The poll was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Poll Created Successfully
 *                 status_code:
 *                   type: number
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         created_at:
 *                           type: string
 *       409:
 *         description: Poll already exists
 *       500:
 *         description: Some server error
 */
`;


export const getAllPolls = `
/**
 * @swagger
 * /api/v1/poll:
 *   get:
 *     summary: Retrieve all Poll
 *     description: Retrieve a list of all Polls.
 *     tags: [Poll]
 *     responses:
 *       200:
 *         description: Successfully retrieved all Polls.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Poll Fetched Successfully
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier for the Poll.
 *                       title:
 *                         type: string
 *                         description: Title of poll.
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error.
 */
`;


export const Poll = `
/**
 * @swagger
 * /api/v1/poll/{id}:
 *   get:
 *     summary: Fetch a poll by its ID
 *     tags: [Poll]
 *     description: Retrieve a single poll by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the poll to fetch
 *     responses:
 *       200:
 *         description: Poll fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Poll fetched successfully
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 019b28f1-ae6a-4061-9dc7-71fa659ece43
 *                     title:
 *                       type: string
 *                       example: What is your favorite programming language?
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-12T16:48:03.235Z
 *       404:
 *         description: Poll not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Poll not found
 *                 status_code:
 *                   type: integer
 *                   example: 404
 */
`;
