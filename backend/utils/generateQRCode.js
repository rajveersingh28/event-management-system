const QRCode = require('qrcode');

/**
 * Generates a Base64 Data URL QR Code encoding core booking metrics
 * @param {string} bookingId - Target database booking ID
 * @param {string} userId - ID of the booking customer
 * @param {string} eventId - ID of the reserved event
 * @returns {Promise<string>} Base64 representation string of the QR code image
 */
const generateQRCode = async (bookingId, userId, eventId) => {
    try {
        // 1. Structure data as a strict payload string (JSON format)
        const payload = JSON.stringify({
            bookingId: bookingId.toString(),
            userId: userId.toString(),
            eventId: eventId.toString()
        });

        // 2. Configure aesthetic and parsing safety optimizations
        const options = {
            errorCorrectionLevel: 'H', // High error correction (allows up to 30% damage/skewing during mobile scans)
            type: 'image/png',
            margin: 2,
            color: {
                dark: '#000000',  // Pure black pixels
                light: '#FFFFFF' // Pure white background
            }
        };

        // 3. Compile and return the string payload as a Data URL
        const qrCodeDataUrl = await QRCode.toDataURL(payload, options);
        return qrCodeDataUrl;

    } catch (error) {
        console.error(`❌ [QR Code Generation Error]: ${error.message}`);
        throw new Error('Failed to generate ticket QR Code');
    }
};

module.exports = generateQRCode;