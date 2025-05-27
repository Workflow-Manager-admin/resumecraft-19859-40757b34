const express = require('express');
const healthController = require('../controllers/health');
// Register routes with actual controllers.
const templatesController = require('../controllers/templates');
const generateController = require('../controllers/generate');
const grammarController = require('../controllers/grammarCheck');
const exportController = require('../controllers/exportPdf');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /templates:
 *   get:
 *     summary: Get resume and cover letter templates
 *     tags:
 *       - Templates
 *     responses:
 *       200:
 *         description: A list of templates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 templates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [resume, coverLetter]
 *                       previewImageUrl:
 *                         type: string
 */
router.get('/templates', templatesController.list);

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate a resume or cover letter
 *     tags:
 *       - Generator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [resume, coverLetter]
 *                 example: resume
 *               templateId:
 *                 type: string
 *                 example: "template-1"
 *               data:
 *                 type: object
 *                 description: User-provided content for document fields
 *     responses:
 *       200:
 *         description: Generated document as JSON (or HTML)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document:
 *                   type: string
 *                   description: The generated document (HTML or text)
 */
router.post('/generate', generateController.generate);

/**
 * @swagger
 * /grammar-check:
 *   post:
 *     summary: Check grammar and spelling for given text
 *     tags:
 *       - Grammar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text to be checked for grammar
 *     responses:
 *       200:
 *         description: Grammar check results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 corrected:
 *                   type: string
 *                   description: Corrected text
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       offset:
 *                         type: number
 *                       length:
 *                         type: number
 *                       replacement:
 *                         type: string
 */
router.post('/grammar-check', grammarController.check);

/**
 * @swagger
 * /export-pdf:
 *   post:
 *     summary: Export a document as PDF
 *     tags:
 *       - Export
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 description: The HTML or text of the document to export
 *               fileName:
 *                 type: string
 *                 description: Desired file name for the PDF
 *     responses:
 *       200:
 *         description: The resulting PDF file (application/pdf)
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post('/export-pdf', exportController.export);

module.exports = router;
