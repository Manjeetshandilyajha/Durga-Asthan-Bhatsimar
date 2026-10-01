import templeFacadeImg from '../assets/images/temple_facade.jpg';
import mataRaniImg from '../assets/images/mata_rani.jpg';
import pandit1Img from '../assets/images/pandit1.jpg';
import pandit2Img from '../assets/images/pandit2.jpg';
import pandit3Img from '../assets/images/pandit3.jpg';
import samiti1Img from '../assets/images/samiti1.jpg';
import samiti2Img from '../assets/images/samiti2.jpg';
import samiti3Img from '../assets/images/samiti3.jpg';

export { templeFacadeImg, mataRaniImg, pandit1Img, pandit2Img, pandit3Img, samiti1Img, samiti2Img, samiti3Img };

export const SITE_DETAILS = {
  name: 'दुर्गा स्थान, भटसिमर',
  tagline: 'जय माता दी! 🙏🚩',
  heroSubtitle: 'भटसिमरक पावन धरती पर स्थित दुर्गा स्थान में अहाँ सभक हार्दिक स्वागत अछि।',
  contactPerson: 'मंजीत कुमार झा',
  contactMobile: '9905697921',
  location: 'दुर्गा स्थान, ग्राम - भटसिमर, जिला - मधुबनी, बिहार',
  whatsappNumber: '919905697921',
};

export const DEFAULT_PANDITS = [
  {
    _id: 'p1',
    name: 'पंडित शशिधर झा',
    slug: 'pandit-shashidhar-jha',
    photo: pandit1Img,
    role: 'दुर्गा स्थान में पूजा-पाठ करैत छथि।',
    description: 'पंडित शशिधर झा दुर्गा स्थान, भटसिमरक पूजा-पाठ सँ जुड़ल छथि।',
    displayOrder: 1,
    isPublished: true,
  },
  {
    _id: 'p2',
    name: 'पंडित प्रेम चंद्र झा',
    slug: 'pandit-prem-chandra-jha',
    photo: pandit2Img,
    role: 'दुर्गा स्थान में पूजा करवाबैत छथि।',
    description: 'पंडित प्रेम चंद्र झा दुर्गा स्थान, भटसिमर में पूजा करवाबैत छथि।',
    displayOrder: 2,
    isPublished: true,
  },
  {
    _id: 'p3',
    name: 'पंडित उमेश झा',
    slug: 'pandit-umesh-jha',
    photo: pandit3Img,
    role: 'दुर्गा स्थान सँ जुड़ल पंडित जी।',
    description: 'पंडित उमेश झा दुर्गा स्थान सँ जुड़ल पंडित जी छथि।',
    displayOrder: 3,
    isPublished: true,
  },
];

export const DEFAULT_COMMITTEE_MEMBERS = [
  {
    _id: 'c1',
    name: 'श्री इन्द्रनाथ झा',
    slug: 'shri-indranath-jha',
    designation: 'अध्यक्ष — दुर्गा पूजा समिति, भटसिमर',
    photo: samiti1Img,
    displayOrder: 1,
    isPublished: true,
  },
  {
    _id: 'c2',
    name: 'श्री लक्ष्मी मंडल',
    slug: 'shri-laxmi-mandal',
    designation: 'कोषाध्यक्ष — दुर्गा पूजा समिति, भटसिमर',
    photo: samiti2Img,
    displayOrder: 2,
    isPublished: true,
  },
  {
    _id: 'c3',
    name: 'श्री अवधेश ठाकुर',
    slug: 'shri-awadhesh-thakur',
    designation: 'सचिव — दुर्गा पूजा समिति, भटसिमर',
    photo: samiti3Img,
    displayOrder: 3,
    isPublished: true,
  },
];

export const GALLERY_CATEGORIES = [
  'सभटा',
  'मंदिर फोटो',
  'माता रानी',
  'दुर्गा पूजा',
  'नवरात्रि',
  'ऐतिहासिक फोटो',
  'गांवक आयोजन',
];

export const HISTORY_SECTIONS = [
  'स्थापना',
  'मंदिरक इतिहास',
  'संस्थापक',
  'पुरान परंपरा',
  'पूजा-पाठ',
  'महत्वपूर्ण घटना',
  'वर्तमान स्वरूप',
  'भविष्य लेल संरक्षण',
];

