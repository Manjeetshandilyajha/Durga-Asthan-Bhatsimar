import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema(
  {
    templeName: {
      type: String,
      default: 'दुर्गा स्थान, भटसिमर',
    },
    heroSubtitle: {
      type: String,
      default: 'भटसिमरक पावन धरती पर स्थित दुर्गा स्थान में अहाँ सभक हार्दिक स्वागत अछि।',
    },
    contactPerson: {
      type: String,
      default: 'मंजीत कुमार झा',
    },
    contactMobile: {
      type: String,
      default: '9905697921',
    },
    locationAddress: {
      type: String,
      default: 'दुर्गा स्थान, ग्राम - भटसिमर, जिला - मधुबनी, बिहार',
    },
    mapEmbedUrl: {
      type: String,
      default: 'https://maps.google.com/?q=Bhatsimar+Durga+Sthan',
    },
    aboutText: {
      type: String,
      default: 'दुर्गा स्थान भटसिमर एक अत्यंत प्राचीन आ आस्थाक केंद्र अछि। माँ दुर्गाक असीम कृपा सँ भटसिमर आ आसपासक ग्रामवासी अनवरत भक्ति-भावना आ उल्लासक संग पूजा-अर्चना करैत आबि रहल छथि।',
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSetting', siteSettingSchema);
