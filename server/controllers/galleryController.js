// import Gallery from '../models/Gallery.js';
// import { uploadToCloudinary } from '../config/cloudinary.js';

// export const defaultGalleryItems = [
//   {
//     _id: 'g1',
//     title: 'दुर्गा स्थान मुख्य मंदिर भवन, भटसिमर',
//     imageUrl: '/uploads/temple_facade.jpg',
//     category: 'मंदिर फोटो',
//     description: 'दुर्गा स्थान भटसिमरक भव्य मुख्य मंदिर प्रांगण आ सुंदर मेहराबदार बनावट।',
//     isFeatured: true,
//     isPublished: true,
//   },
//   {
//     _id: 'g2',
//     title: 'श्री श्री १०८ माँ दुर्गा महारानी दिव्य दर्शन',
//     imageUrl: '/uploads/mata_rani.jpg',
//     category: 'माता रानी',
//     description: 'भटसिमर दुर्गा स्थान में माँ दुर्गाक अलौकिक आ भक्तिमय प्रतिमा दर्शन।',
//     isFeatured: true,
//     isPublished: true,
//   },
//   {
//     _id: 'g3',
//     title: 'दुर्गा पूजा महाआरती आ संध्या दर्शन',
//     imageUrl: '/uploads/temple_facade.jpg',
//     category: 'दुर्गा पूजा',
//     description: 'अश्विन नवरात्रि में आयोजित भव्य महाआरती आ दीपमाला।',
//     isFeatured: true,
//     isPublished: true,
//   },
//   {
//     _id: 'g4',
//     title: 'नवरात्रि महासप्तमी वेदी पूजन',
//     imageUrl: '/uploads/mata_rani.jpg',
//     category: 'नवरात्रि',
//     description: 'नवरात्रि अवसर पर माँ भगवतीक भव्य श्रृंगार आ पुष्पांजलि।',
//     isFeatured: false,
//     isPublished: true,
//   },
// ];

// // @desc    Get public gallery items
// // @route   GET /api/gallery
// // @access  Public
// export const getGallery = async (req, res) => {
//   try {
//     const { category } = req.query;
//     let filter = { isPublished: true };
//     if (category && category !== 'सभटा') {
//       filter.category = category;
//     }
//     let items = await Gallery.find(filter).sort({ createdAt: -1 });
//     if (!items || items.length === 0) {
//       if (category && category !== 'सभटा') {
//         items = defaultGalleryItems.filter(item => item.category === category);
//       } else {
//         items = defaultGalleryItems;
//       }
//     }
//     res.json(items);
//   } catch (error) {
//     res.json(defaultGalleryItems);
//   }
// };

// // @desc    Get all gallery items for admin
// // @route   GET /api/gallery/admin
// // @access  Private
// export const getGalleryAdmin = async (req, res) => {
//   try {
//     let items = await Gallery.find().sort({ createdAt: -1 });
//     if (!items || items.length === 0) {
//       items = defaultGalleryItems;
//     }
//     res.json(items);
//   } catch (error) {
//     res.json(defaultGalleryItems);
//   }
// };

// // @desc    Add gallery image (file upload or URL)
// // @route   POST /api/gallery
// // @access  Private
// export const createGalleryItem = async (req, res) => {
//   try {
//     const { title, category, description, isFeatured, imageUrl } = req.body;
//     let finalUrl = imageUrl;
//     let publicId = '';

//     if (req.file) {
//       const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/gallery');
//       finalUrl = uploadResult.url;
//       publicId = uploadResult.publicId;
//     }

//     if (!finalUrl) {
//       return res.status(400).json({ message: 'इमेज या फ़ाइल अनिवार्य अछि' });
//     }

//     const newItem = await Gallery.create({
//       title: title || 'दुर्गा स्थान फोटो',
//       imageUrl: finalUrl,
//       publicId,
//       category: category || 'मंदिर फोटो',
//       description: description || '',
//       isFeatured: isFeatured === 'true' || isFeatured === true,
//       isPublished: true,
//     });

//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // @desc    Delete gallery item
// // @route   DELETE /api/gallery/:id
// // @access  Private
// export const deleteGalleryItem = async (req, res) => {
//   try {
//     const item = await Gallery.findById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: 'फोटो नहि भेटल' });
//     }
//     await item.deleteOne();
//     res.json({ message: 'फोटो सफलता पूर्वक हटा देल गेल' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



















import Gallery from '../models/Gallery.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const defaultGalleryItems = [
  {
    _id: 'g1',
    title: 'दुर्गा स्थान मुख्य मंदिर भवन, भटसिमर',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/temple_facade.jpg',
    category: 'मंदिर फोटो',
    description:
      'दुर्गा स्थान भटसिमरक भव्य मुख्य मंदिर प्रांगण आ सुंदर मेहराबदार बनावट।',
    isFeatured: true,
    isPublished: true,
  },

  {
    _id: 'g2',
    title: 'श्री श्री १०८ माँ दुर्गा महारानी दिव्य दर्शन',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/mata_rani.jpg',
    category: 'माता रानी',
    description:
      'भटसिमर दुर्गा स्थान में माँ दुर्गाक अलौकिक आ भक्तिमय प्रतिमा दर्शन।',
    isFeatured: true,
    isPublished: true,
  },

  {
    _id: 'g3',
    title: 'दुर्गा पूजा महाआरती आ संध्या दर्शन',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/temple_facade.jpg',
    category: 'दुर्गा पूजा',
    description:
      'अश्विन नवरात्रि में आयोजित भव्य महाआरती आ दीपमाला।',
    isFeatured: true,
    isPublished: true,
  },

  {
    _id: 'g4',
    title: 'नवरात्रि महासप्तमी वेदी पूजन',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/mata_rani.jpg',
    category: 'नवरात्रि',
    description:
      'नवरात्रि अवसर पर माँ भगवतीक भव्य श्रृंगार आ पुष्पांजलि।',
    isFeatured: false,
    isPublished: true,
  },
];

// @desc    Get public gallery items
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = { isPublished: true };

    if (category && category !== 'सभटा') {
      filter.category = category;
    }

    let items = await Gallery.find(filter).sort({ createdAt: -1 });

    if (!items || items.length === 0) {
      if (category && category !== 'सभटा') {
        items = defaultGalleryItems.filter(
          (item) => item.category === category
        );
      } else {
        items = defaultGalleryItems;
      }
    }

    res.json(items);
  } catch (error) {
    res.json(defaultGalleryItems);
  }
};

// @desc    Get all gallery items for admin
// @route   GET /api/gallery/admin
// @access  Private
export const getGalleryAdmin = async (req, res) => {
  try {
    let items = await Gallery.find().sort({ createdAt: -1 });

    if (!items || items.length === 0) {
      items = defaultGalleryItems;
    }

    res.json(items);
  } catch (error) {
    res.json(defaultGalleryItems);
  }
};

// @desc    Add gallery image (file upload or URL)
// @route   POST /api/gallery
// @access  Private
export const createGalleryItem = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      isFeatured,
      imageUrl,
    } = req.body;

    let finalUrl = imageUrl;
    let publicId = '';

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.path,
        'durga-sthan-bhatsimar/gallery'
      );

      finalUrl = uploadResult.url;
      publicId = uploadResult.publicId;
    }

    if (!finalUrl) {
      return res.status(400).json({
        message: 'इमेज या फ़ाइल अनिवार्य अछि',
      });
    }

    const newItem = await Gallery.create({
      title: title || 'दुर्गा स्थान फोटो',
      imageUrl: finalUrl,
      publicId,
      category: category || 'मंदिर फोटो',
      description: description || '',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      isPublished: true,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: 'फोटो नहि भेटल',
      });
    }

    await item.deleteOne();

    res.json({
      message: 'फोटो सफलता पूर्वक हटा देल गेल',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};