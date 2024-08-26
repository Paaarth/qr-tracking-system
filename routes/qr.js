// routes/qr.js
const express = require('express');
const QRCode = require('qrcode');
const QRCodeModel = require('../models/qrCode');

const router = express.Router();

// Generate QR Code
router.post('/generate', async (req, res) => {
    const { url } = req.body;
    try {
        const code = await QRCode.toDataURL(url);
        const qrCodeEntry = new QRCodeModel({ code, url });
        await qrCodeEntry.save();
        res.render('qr', { code, url });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).send("Error generating QR code.");
    }
});

// Track QR Code
router.get('/track/:id', async (req, res) => {
    try {
        const qrCode = await QRCodeModel.findById(req.params.id);
        if (!qrCode) {
            return res.status(404).send("QR Code not found.");
        }
        res.redirect(qrCode.url);
    } catch (error) {
        console.error("Error tracking QR code:", error);
        res.status(500).send("Error tracking QR code.");
    }
});

module.exports = router;