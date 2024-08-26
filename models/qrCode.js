// models/qrCode.js
const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QRCode', qrCodeSchema);