// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to handle Excel file operations
const handleExcelFile = (submission) => {
  const excelFilePath = path.join(__dirname, 'contact_submissions.xlsx');
  let workbook;
  let worksheet;

  // Check if file exists
  if (fs.existsSync(excelFilePath)) {
    // Read existing workbook
    workbook = XLSX.readFile(excelFilePath);
    worksheet = workbook.Sheets['Submissions'];
  } else {
    // Create new workbook and worksheet
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.json_to_sheet([], {
      header: ['Timestamp', 'Name', 'Email', 'Company', 'Message']
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
  }

  // Convert worksheet to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);

  // Add new submission
  data.push({
    Timestamp: new Date().toISOString(),
    Name: submission.name,
    Email: submission.email,
    Company: submission.company || 'N/A',
    Message: submission.message || 'N/A'
  });

  // Convert back to worksheet
  worksheet = XLSX.utils.json_to_sheet(data);

  // Update workbook
  workbook.Sheets['Submissions'] = worksheet;

  // Write to file
  XLSX.writeFile(workbook, excelFilePath);
};

app.post('/api/send-email', async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Missing required fields (name, email)' });
  }

  // Save to Excel file
  try {
    handleExcelFile({ name, email, company, message });
  } catch (error) {
    console.error('Error saving to Excel:', error);
    // Continue with email sending even if Excel save fails
  }

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD 
    },
  });

  let mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Company: ${company || 'N/A'}
      Message:
      ${message || 'No message provided'}
    `,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

// New endpoint to download Excel file
app.get('/api/download-submissions', (req, res) => {
  const excelFilePath = path.join(__dirname, 'contact_submissions.xlsx');
  
  if (!fs.existsSync(excelFilePath)) {
    return res.status(404).json({ success: false, message: 'No submissions found' });
  }

  res.download(excelFilePath, 'contact_submissions.xlsx', (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).json({ success: false, message: 'Error downloading file' });
    }
  });
});

// Serve the download UI at /download/submission
app.get('/download/submission', (req, res) => {
  res.sendFile(path.join(__dirname, 'submission_download.html'));
});

app.listen(port, () => {
  console.log(`Email service backend listening at http://localhost:${port}`);
});