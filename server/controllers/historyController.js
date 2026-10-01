import HistoryTimeline from '../models/HistoryTimeline.js';

// Default initial timeline seed data in case database is empty or fallback mode is active
// export const defaultTimelineItems = [
//   {
//     _id: 't1',
//     year: 'प्राचीन काल / स्थापना',
//     title: 'दुर्गा स्थान भटसिमरक स्थापना आ भूमि',
//     description: 'भटसिमरक पावन धरती पर दुर्गा स्थानक स्थापना ग्रामीण पूर्वज सभक अटूट निष्ठा आ भक्ति भावना सँ भेल। गाँव के पावन परिसर में माता दुर्गाक भव्य वेदी स्थापित कैल गेल।',
//     section: 'स्थापना',
//     order: 1,
//     isVerified: true,
//     isPublished: true,
//   },
//   {
//     _id: 't2',
//     year: 'ऐतिहासिक परंपरा',
//     title: 'भव्य दुर्गा पूजा परंपराक शुरुआत',
//     description: 'प्रत्येक वर्ष अश्विन नवरात्रि में भटसिमर दुर्गा स्थान में अत्यंत वैदिक आ नियम-निष्ठाक संग माता दुर्गाक भव्य पूजा-अर्चना कैल जाइत अछि।',
//     section: 'पुरान परंपरा',
//     order: 2,
//     isVerified: true,
//     isPublished: true,
//   },
//   {
//     _id: 't3',
//     year: 'भवन पुनर्निर्माण',
//     title: 'मुख्य मंदिर आ प्रांगणक जीर्णोद्धार',
//     description: 'ग्रामवासी आ श्रद्धालु सभक सहयोग सँ दुर्गा स्थानक मुख्य मंदिर भवनक भव्य नवनिर्माण आ सजावट कैल गेल, जाहि में कलात्मक मेहराब आ वेदी बनाओल गेल।',
//     section: 'वर्तमान स्वरूप',
//     order: 3,
//     isVerified: true,
//     isPublished: true,
//   },
//   {
//     _id: 't4',
//     year: 'भविष्य योजना',
//     title: 'मंदिर प्रांगण आ संस्कृति संरक्षण',
//     description: 'दुर्गा स्थान भटसिमरक ऐतिहासिक आ सांस्कृतिक वैभव के आने वाला पीढ़ी लेल संजोय क राखब आ प्रांगणक निरंतर विकास करब मुख्य ध्येय अछि।',
//     section: 'भविष्य लेल संरक्षण',
//     order: 4,
//     isVerified: true,
//     isPublished: true,
//   },
// ];

export const defaultTimelineItems = [
  {
    _id: 't1',
    year: '1971',
    title: 'दुर्गा पूजा के शुरुआत',
    description:
      'दुर्गा स्थान, भटसिमर में दुर्गा पूजा के शुरुआत वर्ष 1971 में भूतपूर्व मुखिया स्वर्गीय रमेश्वर ठाकुर, श्री इन्द्रनाथ झा आ समस्त ग्रामवासी के सहयोग सँ भेल।',
    section: 'स्थापना',
    order: 1,
    isVerified: true,
    isPublished: true,
  },

  {
    _id: 't2',
    year: '1971 सँ',
    title: 'दुर्गा पूजा के परंपरा',
    description:
      'दुर्गा स्थान, भटसिमर में प्रत्येक वर्ष अश्विन मास में माँ दुर्गाक पूजा श्रद्धा आ भक्तिभाव सँ आयोजित होइत अछि।',
    section: 'पुरान परंपरा',
    order: 2,
    isVerified: true,
    isPublished: true,
  },

  {
    _id: 't3',
    year: 'पूजा-पाठ',
    title: 'वैदिक चंडी पाठ, बली/पुष्पांजलि आ संध्या महाआरती',
    description:
      'वैदिक चंडी पाठ, बली/पुष्पांजलि विधान आ संध्या महाआरती दुर्गा स्थानक पूजा-पाठक महत्वपूर्ण परंपरा अछि।',
    section: 'पूजा-पाठ',
    order: 3,
    isVerified: true,
    isPublished: true,
  },

  {
    _id: 't4',
    year: 'वर्तमान',
    title: 'ग्रामवासी सभक आस्था के केंद्र',
    description:
      'दुर्गा स्थान, भटसिमर आजो ग्रामवासी सभक श्रद्धा, आस्था आ धार्मिक परंपरा के केंद्र बनल अछि।',
    section: 'वर्तमान स्वरूप',
    order: 4,
    isVerified: true,
    isPublished: true,
  },

  {
    _id: 't5',
    year: 'भविष्य',
    title: 'इतिहास आ सांस्कृतिक धरोहर के संरक्षण',
    description:
      'सांस्कृतिक धरोहर के भावी पीढ़ी लेल सुरक्षित रखबाक संकल्प।',
    section: 'भविष्य लेल संरक्षण',
    order: 5,
    isVerified: true,
    isPublished: true,
  },
];

// @desc    Get all history timeline items
// @route   GET /api/history
// @access  Public
export const getHistoryTimeline = async (req, res) => {
  try {
    let items = await HistoryTimeline.find({ isPublished: true }).sort({ order: 1 });
    if (!items || items.length === 0) {
      items = defaultTimelineItems;
    }
    res.json(items);
  } catch (error) {
    res.json(defaultTimelineItems);
  }
};

// @desc    Get all history items for admin
// @route   GET /api/history/admin
// @access  Private
export const getHistoryTimelineAdmin = async (req, res) => {
  try {
    let items = await HistoryTimeline.find().sort({ order: 1 });
    if (!items || items.length === 0) {
      items = defaultTimelineItems;
    }
    res.json(items);
  } catch (error) {
    res.json(defaultTimelineItems);
  }
};

// @desc    Create new history timeline item
// @route   POST /api/history
// @access  Private
export const createHistoryItem = async (req, res) => {
  try {
    const { year, title, description, section, order, isVerified, isPublished } = req.body;
    const newItem = await HistoryTimeline.create({
      year,
      title,
      description,
      section,
      order: order || 0,
      isVerified: isVerified !== undefined ? isVerified : true,
      isPublished: isPublished !== undefined ? isPublished : true,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update history item
// @route   PUT /api/history/:id
// @access  Private
export const updateHistoryItem = async (req, res) => {
  try {
    const item = await HistoryTimeline.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'इतिहास आइटम नहि भेटल' });
    }
    const updated = await HistoryTimeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete history item
// @route   DELETE /api/history/:id
// @access  Private
export const deleteHistoryItem = async (req, res) => {
  try {
    const item = await HistoryTimeline.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'इतिहास आइटम नहि भेटल' });
    }
    await item.deleteOne();
    res.json({ message: 'इतिहास आइटम हटा देल गेल' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
