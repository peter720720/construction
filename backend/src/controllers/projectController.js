const Project = require('../models/Project');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary from environment configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Admin Operation: Upload and create a new project card
 */
const createProject = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Check if an image file was uploaded through Multer buffer streams
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'Please upload a project image showcase.' });
    }

    // Convert image buffer string stream to upload directly onto Cloudinary
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: 'construction_projects',
    });

    // Create the project inside MongoDB database
    const newProject = await Project.create({
      title,
      description,
      location,
      imageUrl: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
      createdBy: req.user._id, // Tied to the logged-in admin account via protect middleware
    });

    res.status(201).json({
      status: 'success',
      data: { project: newProject },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Public Operation: Fetch all uploaded projects (Display on Homepage & Services)
 */
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort('-createdAt').populate('createdBy', 'name email');
    
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Admin Operation: Delete a project card and purge its asset from Cloudinary servers
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ status: 'fail', message: 'No project item discovered matching that ID reference.' });
    }

    // Purge the image file from Cloudinary storage bucket
    await cloudinary.uploader.destroy(project.imagePublicId);

    // Remove document tracking node inside MongoDB
    await project.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Project post and asset storage successfully deleted.',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  deleteProject,
};
