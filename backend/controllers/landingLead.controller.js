const LandingLead = require("../models/landingLead.model");
const sendEmail = require("../utils/sendEmail");

const otpStore = new Map();
const OTP_EXPIRY_MS = 5 * 60 * 1000;

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const getOtpKey = (email, landingPage) => `${email}:${landingPage}`;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value) =>
  String(value || "").replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      character
    ],
  );

exports.sendLandingOtp = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      companyName,
      message,
      product,
      landingPage,
      source,
      website,
    } = req.body;

    if (website) {
      return res.status(400).json({
        success: false,
        message: "Unable to process this enquiry.",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const trimmedLandingPage = String(landingPage || "").trim();

    if (
      !name?.trim() ||
      !normalizedEmail ||
      !phone?.trim() ||
      !message?.trim() ||
      !product?.trim() ||
      !trimmedLandingPage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required enquiry details.",
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const existingLead = await LandingLead.findOne({
      email: normalizedEmail,
      landingPage: trimmedLandingPage,
    });
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: "An enquiry from this email has already been verified for this product.",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    otpStore.set(getOtpKey(normalizedEmail, trimmedLandingPage), {
      otp,
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        companyName: String(companyName || "").trim(),
        message: message.trim(),
        product: product.trim(),
        landingPage: trimmedLandingPage,
        source: String(source || "Landing page").trim(),
      },
      createdAt: Date.now(),
    });

    await sendEmail({
      to: normalizedEmail,
      subject: "Your HPMC landing page verification code",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;padding:32px;color:#111827;">
          <h2>Hello ${escapeHtml(name)},</h2>
          <p>Use the code below to verify your enquiry for ${escapeHtml(product)}.</p>
          <p style="font-size:30px;font-weight:bold;letter-spacing:8px;color:#438f32;">${otp}</p>
          <p>This code expires in 5 minutes. Your enquiry is saved only after verification.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error("Send landing lead OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send the verification code. Please try again.",
    });
  }
};

exports.verifyLandingOtp = async (req, res) => {
  try {
    const normalizedEmail = normalizeEmail(req.body?.email);
    const landingPage = String(req.body?.landingPage || "").trim();
    const otp = String(req.body?.otp || "").trim();
    const otpKey = getOtpKey(normalizedEmail, landingPage);
    const record = otpStore.get(otpKey);

    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found." });
    }

    if (Date.now() - record.createdAt > OTP_EXPIRY_MS) {
      otpStore.delete(otpKey);
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new code." });
    }

    if (otp !== record.otp) {
      return res.status(400).json({ success: false, message: "Invalid verification code." });
    }

    const alreadySaved = await LandingLead.findOne({
      email: record.data.email,
      landingPage: record.data.landingPage,
    });
    if (alreadySaved) {
      otpStore.delete(otpKey);
      return res.status(409).json({
        success: false,
        message: "An enquiry from this email has already been verified for this product.",
      });
    }

    const lead = await LandingLead.create(record.data);
    otpStore.delete(otpKey);

    await Promise.allSettled([
      sendEmail({
        to: lead.email,
        subject: "Thank you for contacting HPMC",
        html: `<div style="font-family:Arial,Helvetica,sans-serif;padding:32px;color:#111827;"><h2>Thank you, ${escapeHtml(lead.name)}.</h2><p>Your enquiry for ${escapeHtml(lead.product)} has been received. Our team will contact you shortly.</p></div>`,
      }),
      sendEmail({
        to: "social_media@hindustanplastics.com",
        subject: `New landing page enquiry: ${lead.product}`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;padding:24px;color:#111827;"><h2>New landing page enquiry</h2><p><strong>Product:</strong> ${escapeHtml(lead.product)}</p><p><strong>Name:</strong> ${escapeHtml(lead.name)}</p><p><strong>Email:</strong> ${escapeHtml(lead.email)}</p><p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p><p><strong>Message:</strong> ${escapeHtml(lead.message)}</p></div>`,
      }),
    ]);

    return res.status(201).json({ success: true, leadId: lead._id });
  } catch (error) {
    console.error("Verify landing lead OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify the code. Please try again.",
    });
  }
};
