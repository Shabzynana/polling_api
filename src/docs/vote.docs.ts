export const createVote = `
/**
 * @swagger
 * /api/v1/vote:
 *   post:
 *     summary: Create a vote for a poll
 *     tags: [Vote]
 *     description: Allows a user to vote on a poll by providing the poll option ID and user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               optionId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the poll option being voted for
 *                 example: d7636d3d-b06e-4847-9072-9a376382ba22
 *               pollId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the poll to which the option belongs
 *                 example: 019b28f1-ae6a-4061-9dc7-71fa659ece43
 *     responses:
 *       201:
 *         description: Vote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vote created successfully
 *                 status_code:
 *                   type: integer
 *                   example: 201
 *                 vote:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: a19b28f1-ae6a-4061-9dc7-71fa659ece43
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: c9f62d59-ae2a-4d59-833a-d6d9b44e42a1
 *                     optionId:
 *                       type: string
 *                       format: uuid
 *                       example: d7636d3d-b06e-4847-9072-9a376382ba22
 *                     pollId:
 *                       type: string
 *                       format: uuid
 *                       example: 019b28f1-ae6a-4061-9dc7-71fa659ece43
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request body
 *                 status_code:
 *                   type: integer
 *                   example: 400
 */
`;
