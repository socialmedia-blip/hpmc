const Testimonial = require("../models/testimonial.model");

const normalizePayload = (body) => {
  const type = body.type === "video" ? "video" : "written";

  return {
    name: body.name?.trim(),
    company: body.company?.trim() || "",
    type,
    review: type === "written" ? body.review?.trim() || "" : "",
    youtubeUrl: type === "video" ? body.youtubeUrl?.trim() || "" : "",
    rating: Number(body.rating) || 5,
    isActive: body.isActive !== false,
  };
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(normalizePayload(req.body));

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create testimonial",
    });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const filter = req.query.active === "true" ? { isActive: true } : {};
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("GET TESTIMONIALS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    Object.assign(testimonial, normalizePayload(req.body));
    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update testimonial",
    });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TESTIMONIAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};
