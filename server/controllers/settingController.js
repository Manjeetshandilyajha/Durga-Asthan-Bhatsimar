import SiteSetting from '../models/SiteSetting.js';

export const defaultSettings = {
  templeName: 'दुर्गा स्थान, भटसिमर',
  heroSubtitle: 'भटसिमरक पावन धरती पर स्थित दुर्गा स्थान में अहाँ सभक हार्दिक स्वागत अछि।',
  contactPerson: 'मंजीत कुमार झा',
  contactMobile: '9905697921',
  locationAddress: 'दुर्गा स्थान, ग्राम - भटसिमर, जिला - मधुबनी, बिहार',
  mapEmbedUrl: 'https://maps.google.com/?q=Bhatsimar+Durga+Sthan',
  aboutText: 'दुर्गा स्थान भटसिमर एक अत्यंत प्राचीन आ आस्थाक केंद्र अछि। माँ दुर्गाक असीम कृपा सँ भटसिमर आ आसपासक ग्रामवासी अनवरत भक्ति-भावना आ उल्लासक संग पूजा-अर्चना करैत आबि रहल छथि।',
};

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(defaultSettings);
    }
    res.json(settings);
  } catch (error) {
    res.json(defaultSettings);
  }
};

// @desc    Update site settings (Admin)
// @route   PUT /api/settings
// @access  Private
export const updateSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({ ...defaultSettings, ...req.body });
    } else {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
