/**
 * @file Express server entry point
 * @description Initializes and starts the backend server.
 * Handles contact form submissions via Nodemailer and serves
 * the static Vite build in production.
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// ============================================================================
// CONSTANTS
// ============================================================================

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;
const EMAIL_TO   = process.env.EMAIL_TO || EMAIL_USER;

const DIST_DIR = path.join(__dirname, 'dist');

// ============================================================================
// APP SETUP
// ============================================================================

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(bodyParser.json());

// ============================================================================
// MAIL TRANSPORTER
// ============================================================================

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /api/contact
 * Accepts a contact form submission and forwards it to EMAIL_TO via nodemailer.
 *
 * Body: { name: string, email: string, subject?: string, message: string }
 */
app.post('/api/contact', async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        res.status(400).json({ error: 'name, email, and message are required.' });
        return;
    }

    const mailOptions = {
        from: `"Portfolio Contact" <${EMAIL_USER}>`,
        to: EMAIL_TO,
        replyTo: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr />
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (err) {
        console.error('Nodemailer error:', err);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// ============================================================================
// STATIC FILE SERVING (production)
// ============================================================================

app.use(express.static(DIST_DIR));

// Catch-all: serve index.html for client-side routing
app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
