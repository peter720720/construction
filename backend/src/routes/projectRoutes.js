const express = require('express');
const multer = require('multer');
const { createProject, getAllProjects, deleteProject } = require('../controllers/projectController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure local multer buffer memory allocations for standard file filtering
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Only image file uploads are supported.'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size limit: 5 Megabytes
});

/**
 * ==========================================
 * 🏗️ SYSTEM PROJECT DATA ENDPOINTS
 * ==========================================
 */

// Endpoint: GET /api/projects -> Public route to fetch cards
router.get('/', getAllProjects);

// Endpoint: POST /api/projects -> Secured Admin-only upload portal
router.post('/', protect, restrictTo('admin'), upload.single('image'), createProject);

// Endpoint: DELETE /api/projects/:id -> Secured Admin-only asset purge route
router.delete('/:id', protect, restrictTo('admin'), deleteProject);

module.exports = router;
