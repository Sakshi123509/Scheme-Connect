// controllers/applicationController.js
import Application from '../models/application.js';
import Scheme from '../models/scheme.js';
import { validationResult } from 'express-validator';

/** Apply for a scheme */
export const applyForScheme = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { schemeId } = req.body;
    if (!schemeId) return res.status(400).json({ message: "schemeId required" });

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });

    const alreadyApplied = await Application.findOne({
      scheme: schemeId,
      profile: req.user._id
    });
    if (alreadyApplied) return res.status(400).json({ message: "Already applied" });

    const application = new Application({
      scheme: schemeId,
      profile: req.user._id
    });

    await application.save();

    res.status(201).json({ message: "Applied successfully", application });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/** Get applications of logged-in user */
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ profile: req.user._id })
      .populate('scheme', 'name description')
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/** Get all applications (Admin/All users) */
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('scheme', 'name description')
      .populate('profile', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/** Get application by ID */
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('scheme', 'name description')
      .populate('profile', 'name email');
    if (!application) return res.status(404).json({ message: "Application not found" });
    // Ensure user can only view their own application unless admin
    if (application.profile._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/** Update application status (Admin only) */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });
    application.status = status;
    await application.save();
    res.status(200).json({ message: "Application status updated", application });

  }

  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
