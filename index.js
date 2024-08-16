const express = require('express');
const PDFDocument = require('pdfkit');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/create-pdf', (req, res) => {
    const { name, idNumber, address, phone, signature } = req.body;

    const doc = new PDFDocument();
    let filename = encodeURIComponent(name) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.font('Helvetica');
    doc.text(`Name: ${name}`);
    doc.text(`ID Number: ${idNumber}`);
    doc.text(`Address: ${address}`);
    doc.text(`Phone: ${phone}`);
    doc.image(signature, { fit: [250, 300], align: 'center' });

    doc.pipe(res);
    doc.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
