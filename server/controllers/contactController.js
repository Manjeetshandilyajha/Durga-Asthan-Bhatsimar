import ContactMessage from '../models/ContactMessage.js';

// @desc    Send contact message (Public)
// @route   POST /api/contact
// @access  Public
export const sendContactMessage = async (req, res) => {
  try {
    const { name, mobile, message } = req.body;

    if (!name || !mobile || !message) {
      return res.status(400).json({ message: 'कृपया अपन नाम, मोबाइल नंबर आ संदेश पूरा भरू' });
    }

    const contactMsg = await ContactMessage.create({
      name,
      mobile,
      message,
      status: 'unread',
    });

    res.status(201).json({
      success: true,
      message: 'अहाँक संदेश सफलता पूर्वक भेजल गेल। धन्यवाद!',
      contactMsg,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private
export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark contact message as read (Admin)
// @route   PUT /api/contact/:id/read
// @access  Private
export const markMessageRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({ message: 'संदेश नहि भेटल' });
    }
    msg.status = 'read';
    await msg.save();
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContactMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({ message: 'संदेश नहि भेटल' });
    }
    await msg.deleteOne();
    res.json({ message: 'संदेश हटा देल गेल' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
