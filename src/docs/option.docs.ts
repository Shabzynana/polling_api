export const createOptionsForPoll = `
/**
 * @swagger
 * /api/v1/poll/{pollId}/option:
 *   post:
 *     summary: Create an option for a poll
 *     tags: [Option]
 *     description: Add an option to a specific poll by its ID
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the poll to add the option to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text for the poll option
 *                 example: JavaScript
 *     responses:
 *       201:
 *         description: Option created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Option created successfully
 *                 status_code:
 *                   type: integer
 *                   example: 201
 *                 option:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: a19b28f1-ae6a-4061-9dc7-71fa659ece43
 *                     text:
 *                       type: string
 *                       example: JavaScript
 *                     pollId:
 *                       type: string
 *                       format: uuid
 *                       example: b1c9e44a-ae4b-45d3-833e-d6b9d3b68935
 *       400:
 *         description: Bad request
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