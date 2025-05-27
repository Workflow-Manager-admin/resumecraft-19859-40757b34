const multer = require('multer');
const path = require('path');

// Configure disk storage for uploaded files (customize as needed for your use-case)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be uploaded to ./uploads/
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    // Use original filename, but safe in practice to use a timestamp prefix
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Ensure file extension is preserved
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filter to allow only certain mime types, e.g., pdf, images, etc.
// Extend as per requirements.
function fileFilter(req, file, cb) {
  // Accept any file (for resume image/logo or PDF); customize if needed:
  cb(null, true);
}

// Max file size: 5MB (adjust for your requirements)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// PUBLIC_INTERFACE
// Usage: router.post('/route', upload.single('fileField'), handler)
module.exports = upload;
