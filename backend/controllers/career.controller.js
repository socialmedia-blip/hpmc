const Career = require("../models/career.model");

// Create Opening
exports.createCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job opening created successfully",
      data: career,
    });
  } catch (error) {
    console.error("Create Career Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Openings
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Active Openings (Public)
exports.getActiveCareers = async (req, res) => {
  try {
    const careers = await Career.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Opening
exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found",
      });
    }

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Opening
exports.updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job opening updated successfully",
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle Active Status
exports.toggleCareerStatus = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found",
      });
    }

    career.isActive = !career.isActive;
    await career.save();

    res.status(200).json({
      success: true,
      message: "Career status updated",
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Opening
exports.deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job opening deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
