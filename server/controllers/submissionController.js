import HistorySubmission from '../models/HistorySubmission.js';
import HistoryTimeline from '../models/HistoryTimeline.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

// @desc    Submit history / story (Public)
// @route   POST /api/history-submissions
// @access  Public
export const submitHistory = async (req, res) => {
  try {
    const { name, mobile, historyInfo, story } = req.body;

    if (!name || !mobile || !historyInfo) {
      return res.status(400).json({ message: 'नाम, मोबाइल नंबर आ इतिहासिक जानकारी अनिवार्य अछि' });
    }

    let imageUrl = '';
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/submissions');
      imageUrl = uploadResult.url;
    }

    const submission = await HistorySubmission.create({
      name,
      mobile,
      historyInfo,
      story: story || '',
      imageUrl,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'अहाँक जानकारी सफलता पूर्वक प्राप्त भेल। मंदिर समिति द्वारा समीक्षाक बाद प्रकाशित कैल जायत।',
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all history submissions (Admin)
// @route   GET /api/history-submissions
// @access  Private
export const getHistorySubmissions = async (req, res) => {
  try {
    const submissions = await HistorySubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or Reject history submission (Admin)
// @route   PUT /api/history-submissions/:id/approve
// @access  Private
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { status, publishToTimeline, year, section } = req.body; // status: 'approved' | 'rejected'
    const submission = await HistorySubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: 'सबमिशन नहि भेटल' });
    }

    submission.status = status || 'approved';
    await submission.save();

    // If approved and admin requested auto-publish to timeline
    if (status === 'approved' && publishToTimeline) {
      await HistoryTimeline.create({
        year: year || 'जन योगदान',
        title: `योगदानकर्त्ता: ${submission.name}`,
        description: submission.historyInfo,
        section: section || 'मंदिरक इतिहास',
        isVerified: true,
        isPublished: true,
      });
    }

    res.json({ message: `सबमिशन स्टेटस ${status} कऽ देल गेल`, submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete submission (Admin)
// @route   DELETE /api/history-submissions/:id
// @access  Private
export const deleteSubmission = async (req, res) => {
  try {
    const submission = await HistorySubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'सबमिशन नहि भेटल' });
    }
    await submission.deleteOne();
    res.json({ message: 'सबमिशन हटा देल गेल' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
