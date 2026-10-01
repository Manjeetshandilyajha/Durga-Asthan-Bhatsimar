import Announcement from '../models/Announcement.js';

export const defaultAnnouncements = [
  {
    _id: 'a1',
    title: 'आगामी शारदीय नवरात्रि महापूजनक तैयार प्रारम्भ',
    content: 'दुर्गा स्थान भटसिमर में आगामी शारदीय नवरात्रि महामहोत्सव हेतु प्रांगणक सजावट आ कलश स्थापनक तैयार भक्तिभाव सँ प्रारंभ भ रहल अछि।',
    dateText: 'आजुक सूचना',
    isImportant: true,
    isPublished: true,
  },
  {
    _id: 'a2',
    title: 'ऐतिहासिक दस्तावेज आ संस्मरण साझा करबाक अपील',
    content: 'यदि अहाँक लग दुर्गा स्थान भटसिमरक कोणहु पुरान फोटो या ऐतिहासिक जानकारी अछि, तऽ कृपया "इतिहास साझा करू" पेज पर जाकर जरूर भेजल जाउ।',
    dateText: 'विशेष अपील',
    isImportant: false,
    isPublished: true,
  },
];

// @desc    Get all published announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    let items = await Announcement.find({ isPublished: true }).sort({ createdAt: -1 });
    if (!items || items.length === 0) {
      items = defaultAnnouncements;
    }
    res.json(items);
  } catch (error) {
    res.json(defaultAnnouncements);
  }
};

// @desc    Get all announcements for admin
// @route   GET /api/announcements/admin
// @access  Private
export const getAnnouncementsAdmin = async (req, res) => {
  try {
    let items = await Announcement.find().sort({ createdAt: -1 });
    if (!items || items.length === 0) {
      items = defaultAnnouncements;
    }
    res.json(items);
  } catch (error) {
    res.json(defaultAnnouncements);
  }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, dateText, isImportant } = req.body;
    const newAnnouncement = await Announcement.create({
      title,
      content,
      dateText: dateText || new Date().toLocaleDateString('hi-IN'),
      isImportant: isImportant !== undefined ? isImportant : false,
      isPublished: true,
    });
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private
export const deleteAnnouncement = async (req, res) => {
  try {
    const item = await Announcement.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'सूचना नहि भेटल' });
    }
    await item.deleteOne();
    res.json({ message: 'सूचना हटा देल गेल' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
