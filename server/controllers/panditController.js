import Pandit from '../models/Pandit.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const defaultPandits = [
  {
    _id: 'p1',
    name: 'पंडित शशिधर झा',
    slug: 'pandit-shashidhar-jha',
    photo: '/uploads/pandit1.jpg',
    role: 'दुर्गा स्थान में पूजा-पाठ करैत छथि।',
    description: 'पंडित शशिधर झा दुर्गा स्थान, भटसिमरक पूजा-पाठ सँ जुड़ल छथि।',
    displayOrder: 1,
    isPublished: true,
  },
  {
    _id: 'p2',
    name: 'पंडित प्रेम चंद्र झा',
    slug: 'pandit-prem-chandra-jha',
    photo: '/uploads/pandit2.jpg',
    role: 'दुर्गा स्थान में पूजा करवाबैत छथि।',
    description: 'पंडित प्रेम चंद्र झा दुर्गा स्थान, भटसिमर में पूजा करवाबैत छथि।',
    displayOrder: 2,
    isPublished: true,
  },
  {
    _id: 'p3',
    name: 'पंडित उमेश झा',
    slug: 'pandit-umesh-jha',
    photo: '/uploads/pandit3.jpg',
    role: 'दुर्गा स्थान सँ जुड़ल पंडित जी।',
    description: 'पंडित उमेश झा दुर्गा स्थान सँ जुड़ल पंडित जी छथि।',
    displayOrder: 3,
    isPublished: true,
  },
];

// Helper to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

// @desc    Get all published pandits
// @route   GET /api/pandits
// @access  Public
export const getPandits = async (req, res) => {
  try {
    let pandits = await Pandit.find({ isPublished: true }).sort({ displayOrder: 1, createdAt: 1 });
    if (!pandits || pandits.length === 0) {
      pandits = defaultPandits;
    }
    res.json(pandits);
  } catch (error) {
    res.json(defaultPandits);
  }
};

// @desc    Get single pandit by ID or Slug
// @route   GET /api/pandits/:id
// @access  Public
export const getPanditById = async (req, res) => {
  try {
    const { id } = req.params;
    let pandit = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      pandit = await Pandit.findById(id);
    }
    if (!pandit) {
      pandit = await Pandit.findOne({ slug: id });
    }
    if (!pandit) {
      pandit = defaultPandits.find((p) => p._id === id || p.slug === id);
    }

    if (!pandit) {
      return res.status(404).json({ message: 'पंडित जीक जानकारी नहि भेटल' });
    }

    res.json(pandit);
  } catch (error) {
    const fallback = defaultPandits.find((p) => p._id === req.params.id || p.slug === req.params.id);
    if (fallback) {
      return res.json(fallback);
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all pandits for Admin
// @route   GET /api/pandits/admin/all
// @access  Private (Admin)
export const getPanditsAdmin = async (req, res) => {
  try {
    let pandits = await Pandit.find().sort({ displayOrder: 1, createdAt: 1 });
    if (!pandits || pandits.length === 0) {
      pandits = defaultPandits;
    }
    res.json(pandits);
  } catch (error) {
    res.json(defaultPandits);
  }
};

// @desc    Create a new Pandit
// @route   POST /api/pandits
// @access  Private (Admin)
export const createPandit = async (req, res) => {
  try {
    const { name, role, description, displayOrder, isPublished, photoUrl } = req.body;
    let photo = photoUrl;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/pandits');
      photo = uploadResult.url;
    }

    if (!photo) {
      return res.status(400).json({ message: 'फोटो अनिवार्य अछि' });
    }

    const slug = generateSlug(name) + '-' + Date.now();

    const newPandit = await Pandit.create({
      name,
      slug,
      photo,
      role,
      description,
      displayOrder: Number(displayOrder) || 0,
      isPublished: isPublished === undefined ? true : Boolean(isPublished),
    });

    res.status(201).json(newPandit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a Pandit
// @route   PUT /api/pandits/:id
// @access  Private (Admin)
export const updatePandit = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.params.id);
    if (!pandit) {
      return res.status(404).json({ message: 'पंडित जी नहि भेटलाह' });
    }

    const { name, role, description, displayOrder, isPublished, photoUrl } = req.body;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/pandits');
      pandit.photo = uploadResult.url;
    } else if (photoUrl) {
      pandit.photo = photoUrl;
    }

    if (name) {
      pandit.name = name;
      pandit.slug = generateSlug(name) + '-' + pandit._id.toString().slice(-4);
    }
    if (role) pandit.role = role;
    if (description) pandit.description = description;
    if (displayOrder !== undefined) pandit.displayOrder = Number(displayOrder);
    if (isPublished !== undefined) pandit.isPublished = Boolean(isPublished);

    const updatedPandit = await pandit.save();
    res.json(updatedPandit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a Pandit
// @route   DELETE /api/pandits/:id
// @access  Private (Admin)
export const deletePandit = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.params.id);
    if (!pandit) {
      return res.status(404).json({ message: 'पंडित जी नहि भेटलाह' });
    }
    await pandit.deleteOne();
    res.json({ message: 'पंडित जीक जानकारी सफलतापूर्वक हटा देल गेल' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
