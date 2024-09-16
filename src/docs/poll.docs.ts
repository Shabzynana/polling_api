export const createdPoll = `
/**
 * @swagger
 * /api/v1/poll:
 *   post:
 *     summary: Sign up a new user
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

export const getPollById = `
/**
 * @swagger
 * /api/v1/poll/{id}:
 *   get:
 *     summary: Get an Poll by ID
 *     description: Retrieves the details of a specific Poll by its ID. This endpoint can be accessed by any authenticated user.
 *     tags: [Poll]
 *     parameters:
 *       - in: path
 *         name: PollId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Poll entry to retrieve
 *     responses:
 *       '200':
 *         description: Poll retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "5f8d0d55b54764421b7156c6"
 *                     title:
 *                       type: string
 *                       example: "Presidential Poll"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-13T06:44:06.248Z"
 *       '400':
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 status_code:
 *                   type: integer
 *                   example: 400
 *       '403':
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Authorization required. Not an admin"
 *                 status_code:
 *                   type: integer
 *                   example: 403
 *       '404':
 *         description: FAQ not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Poll not found.
 *                 status_code:
 *                   type: integer
 *                   example: 404
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Retrieval failed
 *                 status_code:
 *                   type: integer
 *                   example: 500
 */
`;