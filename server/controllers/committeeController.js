import CommitteeMember from '../models/CommitteeMember.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const defaultCommitteeMembers = [
  {
    _id: 'c1',
    name: 'श्री इन्द्रनाथ झा',
    slug: 'shri-indranath-jha',
    designation: 'अध्यक्ष — दुर्गा पूजा समिति, भटसिमर',
    photo: '/uploads/samiti1.jpg',
    displayOrder: 1,
    isPublished: true,
  },
  {
    _id: 'c2',
    name: 'श्री लक्ष्मी मंडल',
    slug: 'shri-laxmi-mandal',
    designation: 'कोषाध्यक्ष — दुर्गा पूजा समिति, भटसिमर',
    photo: '/uploads/samiti2.jpg',
    displayOrder: 2,
    isPublished: true,
  },
  {
    _id: 'c3',
    name: 'श्री अवधेश ठाकुर',
    slug: 'shri-awadhesh-thakur',
    designation: 'सचिव — दुर्गा पूजा समिति, भटसिमर',
    photo: '/uploads/samiti3.jpg',
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

// @desc    Get all published committee members
// @route   GET /api/committee
// @access  Public
export const getCommitteeMembers = async (req, res) => {
  try {
    let members = await CommitteeMember.find({ isPublished: true }).sort({ displayOrder: 1, createdAt: 1 });
    if (!members || members.length === 0) {
      members = defaultCommitteeMembers;
    }
    res.json(members);
  } catch (error) {
    res.json(defaultCommitteeMembers);
  }
};

// @desc    Get single committee member by ID or Slug
// @route   GET /api/committee/:id
// @access  Public
export const getCommitteeMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    let member = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      member = await CommitteeMember.findById(id);
    }
    if (!member) {
      member = await CommitteeMember.findOne({ slug: id });
    }
    if (!member) {
      member = defaultCommitteeMembers.find((m) => m._id === id || m.slug === id);
    }

    if (!member) {
      return res.status(404).json({ message: 'समिति सदस्य नहि भेटलाह' });
    }

    res.json(member);
  } catch (error) {
    const fallback = defaultCommitteeMembers.find((m) => m._id === req.params.id || m.slug === req.params.id);
    if (fallback) {
      return res.json(fallback);
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all committee members for Admin
// @route   GET /api/committee/admin/all
// @access  Private (Admin)
export const getCommitteeMembersAdmin = async (req, res) => {
  try {
    let members = await CommitteeMember.find().sort({ displayOrder: 1, createdAt: 1 });
    if (!members || members.length === 0) {
      members = defaultCommitteeMembers;
    }
    res.json(members);
  } catch (error) {
    res.json(defaultCommitteeMembers);
  }
};

// @desc    Create a new Committee Member
// @route   POST /api/committee
// @access  Private (Admin)
export const createCommitteeMember = async (req, res) => {
  try {
    const { name, designation, displayOrder, isPublished, photoUrl } = req.body;
    let photo = photoUrl;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/committee');
      photo = uploadResult.url;
    }

    if (!photo) {
      return res.status(400).json({ message: 'फोटो अनिवार्य अछि' });
    }

    const slug = generateSlug(name) + '-' + Date.now();

    const newMember = await CommitteeMember.create({
      name,
      slug,
      photo,
      designation,
      displayOrder: Number(displayOrder) || 0,
      isPublished: isPublished === undefined ? true : Boolean(isPublished),
    });

    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a Committee Member
// @route   PUT /api/committee/:id
// @access  Private (Admin)
export const updateCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'समिति सदस्य नहि भेटलाह' });
    }

    const { name, designation, displayOrder, isPublished, photoUrl } = req.body;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/committee');
      member.photo = uploadResult.url;
    } else if (photoUrl) {
      member.photo = photoUrl;
    }

    if (name) {
      member.name = name;
      member.slug = generateSlug(name) + '-' + member._id.toString().slice(-4);
    }
    if (designation) member.designation = designation;
    if (displayOrder !== undefined) member.displayOrder = Number(displayOrder);
    if (isPublished !== undefined) member.isPublished = Boolean(isPublished);

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a Committee Member
// @route   DELETE /api/committee/:id
// @access  Private (Admin)
export const deleteCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'समिति सदस्य नहि भेटलाह' });
    }
    await member.deleteOne();
    res.json({ message: 'समिति सदस्य सफलतापूर्वक हटा देल गेल' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
