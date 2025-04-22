// emailHandler.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Email transporter configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',  // You can use other services like SendGrid, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all required fields' });
    }

    try {
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ryanbyers1023@gmail.com', // Your receiving email
            replyTo: email,
            subject: subject ? `Website Contact: ${subject}` : 'New Website Contact Form Submission',
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Your message has been sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});