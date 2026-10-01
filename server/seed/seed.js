import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import HistoryTimeline from '../models/HistoryTimeline.js';
import Gallery from '../models/Gallery.js';
import Event from '../models/Event.js';
import Announcement from '../models/Announcement.js';
import SiteSetting from '../models/SiteSetting.js';
import Pandit from '../models/Pandit.js';
import CommitteeMember from '../models/CommitteeMember.js';

import { defaultTimelineItems } from '../controllers/historyController.js';
import { defaultGalleryItems } from '../controllers/galleryController.js';
import { defaultEvents } from '../controllers/eventController.js';
import { defaultAnnouncements } from '../controllers/announcementController.js';
import { defaultSettings } from '../controllers/settingController.js';
import { defaultPandits } from '../controllers/panditController.js';
import { defaultCommitteeMembers } from '../controllers/committeeController.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collection data...');
    await Admin.deleteMany({});
    await HistoryTimeline.deleteMany({});
    await Gallery.deleteMany({});
    await Event.deleteMany({});
    await Announcement.deleteMany({});
    await SiteSetting.deleteMany({});
    await Pandit.deleteMany({});
    await CommitteeMember.deleteMany({});

    console.log('[Seed] Creating default Admin (username: admin, password: admin123)...');
    await Admin.create({
      username: 'admin',
      email: 'admin@durgasthanbhatsimar.org',
      password: 'admin123',
      role: 'admin',
    });

    console.log('[Seed] Seeding History Timeline...');
    const timelineData = defaultTimelineItems.map(({ _id, ...rest }) => rest);
    await HistoryTimeline.insertMany(timelineData);

    console.log('[Seed] Seeding Gallery Images...');
    const galleryData = defaultGalleryItems.map(({ _id, ...rest }) => rest);
    await Gallery.insertMany(galleryData);

    console.log('[Seed] Seeding Events & Pujas...');
    const eventData = defaultEvents.map(({ _id, ...rest }) => rest);
    await Event.insertMany(eventData);

    console.log('[Seed] Seeding Announcements...');
    const announcementData = defaultAnnouncements.map(({ _id, ...rest }) => rest);
    await Announcement.insertMany(announcementData);

    console.log('[Seed] Seeding Pandits...');
    const panditData = defaultPandits.map(({ _id, ...rest }) => rest);
    await Pandit.insertMany(panditData);

    console.log('[Seed] Seeding Committee Members...');
    const committeeData = defaultCommitteeMembers.map(({ _id, ...rest }) => rest);
    await CommitteeMember.insertMany(committeeData);

    console.log('[Seed] Seeding Site Settings...');
    await SiteSetting.create(defaultSettings);

    console.log('✅ [Seed] Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
