// import Event from '../models/Event.js';
// import { uploadToCloudinary } from '../config/cloudinary.js';

// export const defaultEvents = [
//   {
//     _id: 'e1',
//     title: 'अश्विन शारदीय दुर्गा पूजा महोत्सव',
//     description: 'दुर्गा स्थान भटसिमर में १० दिवसीय शारदीय दुर्गा पूजा महामहोत्सव। कलश स्थापना सँ विजयादशमी धरि अनवरत महाआरती, चंडी पाठ आ मेला आयोजन।',
//     dateText: 'अश्विन शुक्ल प्रतिपदा सँ दशमी',
//     timeText: 'प्रातः ०५:०० बजे सँ रात्रि १०:०० बजे',
//     location: 'दुर्गा स्थान मुख्य प्रांगण, भटसिमर',
//     category: 'दुर्गा पूजा',
//     imageUrl: '/uploads/mata_rani.jpg',
//     isPublished: true,
//   },
//   {
//     _id: 'e2',
//     title: 'अश्विन नवरात्रि पूजन',
//     description: 'अश्विन शुक्ल पक्ष में माँ भगवतीक विशेष पूजन आ हवन अनुष्ठान। समस्त ग्रामवासी आ श्रद्धालुगणक कल्याण हेतु महायज्ञ।',
//     dateText: 'अश्विन शुक्ल प्रतिपदा सँ नवमी',
//     timeText: 'प्रातः ०६:०० बजे सँ',
//     location: 'दुर्गा स्थान, भटसिमर',
//     category: 'नवरात्रि',
//     imageUrl: '/uploads/temple_facade.jpg',
//     isPublished: true,
//   },
//   {
//     _id: 'e3',
//     title: 'वार्षिक महाप्रसाद आ अष्टयाम कीर्तन',
//     description: 'दुर्गा स्थान परिसर में २४ घण्टाक अखंड सीताराम नाम संकीर्तन आ भव्य महाप्रसाद वितरण समारोह।',
//     dateText: 'वार्षिक निर्धारित तिथि',
//     timeText: 'अखंड अष्टयाम',
//     location: 'मंदिर प्रांगण, भटसिमर',
//     category: 'वार्षिक कार्यक्रम',
//     imageUrl: '/uploads/temple_facade.jpg',
//     isPublished: true,
//   },
// ];

// // @desc    Get all published events
// // @route   GET /api/events
// // @access  Public
// export const getEvents = async (req, res) => {
//   try {
//     let items = await Event.find({ isPublished: true }).sort({ createdAt: -1 });
//     if (!items || items.length === 0) {
//       items = defaultEvents;
//     }
//     res.json(items);
//   } catch (error) {
//     res.json(defaultEvents);
//   }
// };

// // @desc    Get all events for admin
// // @route   GET /api/events/admin
// // @access  Private
// export const getEventsAdmin = async (req, res) => {
//   try {
//     let items = await Event.find().sort({ createdAt: -1 });
//     if (!items || items.length === 0) {
//       items = defaultEvents;
//     }
//     res.json(items);
//   } catch (error) {
//     res.json(defaultEvents);
//   }
// };

// // @desc    Create event
// // @route   POST /api/events
// // @access  Private
// export const createEvent = async (req, res) => {
//   try {
//     const { title, description, dateText, timeText, location, category, imageUrl } = req.body;
//     let finalUrl = imageUrl || '/uploads/temple_facade.jpg';

//     if (req.file) {
//       const uploadResult = await uploadToCloudinary(req.file.path, 'durga-sthan-bhatsimar/events');
//       finalUrl = uploadResult.url;
//     }

//     const newEvent = await Event.create({
//       title,
//       description,
//       dateText: dateText || 'शीघ्र घोषित भेल',
//       timeText: timeText || 'प्रातः ०६:०० बजे सँ',
//       location: location || 'दुर्गा स्थान, भटसिमर',
//       category: category || 'दुर्गा पूजा',
//       imageUrl: finalUrl,
//       isPublished: true,
//     });

//     res.status(201).json(newEvent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // @desc    Update event
// // @route   PUT /api/events/:id
// // @access  Private
// export const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'कार्यक्रम नहि भेटल' });
//     }
//     const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // @desc    Delete event
// // @route   DELETE /api/events/:id
// // @access  Private
// export const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'कार्यक्रम नहि भेटल' });
//     }
//     await event.deleteOne();
//     res.json({ message: 'कार्यक्रम हटा देल गेल' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };




















import Event from '../models/Event.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const defaultEvents = [
  {
    _id: 'e1',
    title: 'अश्विन शारदीय दुर्गा पूजा महोत्सव',
    description:
      'दुर्गा स्थान भटसिमर में १० दिवसीय शारदीय दुर्गा पूजा महामहोत्सव। कलश स्थापना सँ विजयादशमी धरि अनवरत महाआरती, चंडी पाठ आ मेला आयोजन।',
    dateText: 'अश्विन शुक्ल प्रतिपदा सँ दशमी',
    timeText: 'प्रातः ०५:०० बजे सँ रात्रि १०:०० बजे',
    location: 'दुर्गा स्थान मुख्य प्रांगण, भटसिमर',
    category: 'दुर्गा पूजा',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/mata_rani.jpg',
    isPublished: true,
  },

  {
    _id: 'e2',
    title: 'अश्विन नवरात्रि पूजन',
    description:
      'अश्विन शुक्ल पक्ष में माँ भगवतीक विशेष पूजन आ हवन अनुष्ठान। समस्त ग्रामवासी आ श्रद्धालुगणक कल्याण हेतु महायज्ञ।',
    dateText: 'अश्विन शुक्ल प्रतिपदा सँ नवमी',
    timeText: 'प्रातः ०६:०० बजे सँ',
    location: 'दुर्गा स्थान, भटसिमर',
    category: 'नवरात्रि',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/temple_facade.jpg',
    isPublished: true,
  },

  {
    _id: 'e3',
    title: 'वार्षिक महाप्रसाद आ अष्टयाम कीर्तन',
    description:
      'दुर्गा स्थान परिसर में २४ घण्टाक अखंड सीताराम नाम संकीर्तन आ भव्य महाप्रसाद वितरण समारोह।',
    dateText: 'वार्षिक निर्धारित तिथि',
    timeText: 'अखंड अष्टयाम',
    location: 'मंदिर प्रांगण, भटसिमर',
    category: 'वार्षिक कार्यक्रम',
    imageUrl:
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/temple_facade.jpg',
    isPublished: true,
  },
];

// @desc    Get all published events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    let items = await Event.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    if (!items || items.length === 0) {
      items = defaultEvents;
    }

    res.json(items);
  } catch (error) {
    res.json(defaultEvents);
  }
};

// @desc    Get all events for admin
// @route   GET /api/events/admin
// @access  Private
export const getEventsAdmin = async (req, res) => {
  try {
    let items = await Event.find().sort({ createdAt: -1 });

    if (!items || items.length === 0) {
      items = defaultEvents;
    }

    res.json(items);
  } catch (error) {
    res.json(defaultEvents);
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      dateText,
      timeText,
      location,
      category,
      imageUrl,
    } = req.body;

    let finalUrl =
      imageUrl ||
      'https://durga-asthan-bhatsimar-server.onrender.com/uploads/temple_facade.jpg';

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.path,
        'durga-sthan-bhatsimar/events'
      );

      finalUrl = uploadResult.url;
    }

    const newEvent = await Event.create({
      title,
      description,
      dateText: dateText || 'शीघ्र घोषित भेल',
      timeText: timeText || 'प्रातः ०६:०० बजे सँ',
      location: location || 'दुर्गा स्थान, भटसिमर',
      category: category || 'दुर्गा पूजा',
      imageUrl: finalUrl,
      isPublished: true,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'कार्यक्रम नहि भेटल',
      });
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'कार्यक्रम नहि भेटल',
      });
    }

    await event.deleteOne();

    res.json({
      message: 'कार्यक्रम हटा देल गेल',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};