import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  History,
  Image as ImageIcon,
  Calendar,
  Bell,
  Inbox,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  Users,
  Edit,
  Eye,
  ShieldCheck,
} from 'lucide-react';

import API from '../services/api';
import { GALLERY_CATEGORIES, HISTORY_SECTIONS } from '../utils/constants';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Data states
  const [historyItems, setHistoryItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});
  const [pandits, setPandits] = useState([]);
  const [committee, setCommittee] = useState([]);

  // Feedback status
  const [status, setStatus] = useState({ type: '', text: '' });

  // Form modals state
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyForm, setHistoryForm] = useState({ year: '', title: '', description: '', section: 'मंदिरक इतिहास' });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'मंदिर फोटो', description: '' });
  const [galleryFile, setGalleryFile] = useState(null);

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({ title: '', description: '', dateText: '', timeText: '', location: '', category: 'दुर्गा पूजा' });
  const [eventFile, setEventFile] = useState(null);

  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [announceForm, setAnnounceForm] = useState({ title: '', content: '', dateText: '', isImportant: false });

  const [showPanditModal, setShowPanditModal] = useState(false);
  const [editingPanditId, setEditingPanditId] = useState(null);
  const [panditForm, setPanditForm] = useState({ name: '', role: '', description: '', displayOrder: 0, isPublished: true, photoUrl: '' });
  const [panditFile, setPanditFile] = useState(null);

  const [showCommitteeModal, setShowCommitteeModal] = useState(false);
  const [editingCommitteeId, setEditingCommitteeId] = useState(null);
  const [committeeForm, setCommitteeForm] = useState({ name: '', designation: '', displayOrder: 0, isPublished: true, photoUrl: '' });
  const [committeeFile, setCommitteeFile] = useState(null);

  // Fetch all dashboard data
  const fetchAllData = async () => {
    try {
      const [histRes, galRes, evRes, annRes, subRes, msgRes, setRes, panditRes, committeeRes] = await Promise.all([
        API.get('/history/admin'),
        API.get('/gallery/admin'),
        API.get('/events/admin'),
        API.get('/announcements/admin'),
        API.get('/history-submissions'),
        API.get('/contact'),
        API.get('/settings'),
        API.get('/pandits/admin/all').catch(() => API.get('/pandits')),
        API.get('/committee/admin/all').catch(() => API.get('/committee')),
      ]);

      setHistoryItems(Array.isArray(histRes.data) ? histRes.data : []);
      setGalleryItems(Array.isArray(galRes.data) ? galRes.data : []);
      setEvents(Array.isArray(evRes.data) ? evRes.data : []);
      setAnnouncements(Array.isArray(annRes.data) ? annRes.data : []);
      setSubmissions(Array.isArray(subRes.data) ? subRes.data : []);
      setMessages(Array.isArray(msgRes.data) ? msgRes.data : []);
      setSettings(setRes.data && typeof setRes.data === 'object' ? setRes.data : {});
      setPandits(Array.isArray(panditRes.data) ? panditRes.data : []);
      setCommittee(Array.isArray(committeeRes.data) ? committeeRes.data : []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const showNotification = (type, text) => {
    setStatus({ type, text });
    setTimeout(() => setStatus({ type: '', text: '' }), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // --- Handlers ---
  const handleAddHistory = async (e) => {
    e.preventDefault();
    try {
      await API.post('/history', historyForm);
      showNotification('success', 'इतिहास आइटम सफलता पूर्वक जोडल गेल!');
      setShowHistoryModal(false);
      setHistoryForm({ year: '', title: '', description: '', section: 'मंदिरक इतिहास' });
      fetchAllData();
    } catch (err) {
      showNotification('error', 'इतिहास जोडै में समस्या आएल।');
    }
  };

  const handleDeleteHistory = async (id) => {
    if (!window.confirm('कि अहाँ इ आइटम हटाबय चाहैत छी?')) return;
    try {
      await API.delete(`/history/${id}`);
      showNotification('success', 'इतिहास आइटम हटा देल गेल');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'हटाबै में समस्या आएल');
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', galleryForm.title);
      data.append('category', galleryForm.category);
      data.append('description', galleryForm.description);
      if (galleryFile) data.append('image', galleryFile);

      await API.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      showNotification('success', 'फोटो सफलता पूर्वक अपलोड भेल!');
      setShowGalleryModal(false);
      setGalleryForm({ title: '', category: 'मंदिर फोटो', description: '' });
      setGalleryFile(null);
      fetchAllData();
    } catch (err) {
      showNotification('error', 'फोटो अपलोड में समस्या आएल');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('कि अहाँ इ फोटो हटाबय चाहैत छी?')) return;
    try {
      await API.delete(`/gallery/${id}`);
      showNotification('success', 'फोटो हटा देल गेल');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'हटाबै में समस्या आएल');
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', eventForm.title);
      data.append('description', eventForm.description);
      data.append('dateText', eventForm.dateText);
      data.append('timeText', eventForm.timeText);
      data.append('location', eventForm.location);
      data.append('category', eventForm.category);
      if (eventFile) data.append('image', eventFile);

      await API.post('/events', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      showNotification('success', 'कार्यक्रम सफलता पूर्वक जोडल गेल!');
      setShowEventModal(false);
      setEventForm({ title: '', description: '', dateText: '', timeText: '', location: '', category: 'दुर्गा पूजा' });
      setEventFile(null);
      fetchAllData();
    } catch (err) {
      showNotification('error', 'कार्यक्रम जोडै में समस्या आएल');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('कि अहाँ इ कार्यक्रम हटाबय चाहैत छी?')) return;
    try {
      await API.delete(`/events/${id}`);
      showNotification('success', 'कार्यक्रम हटा देल गेल');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'हटाबै में समस्या आएल');
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await API.post('/announcements', announceForm);
      showNotification('success', 'सूचना प्रकाशित भेल!');
      setShowAnnounceModal(false);
      setAnnounceForm({ title: '', content: '', dateText: '', isImportant: false });
      fetchAllData();
    } catch (err) {
      showNotification('error', 'सूचना जोडै में समस्या आएल');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('कि अहाँ इ सूचना हटाबय चाहैत छी?')) return;
    try {
      await API.delete(`/announcements/${id}`);
      showNotification('success', 'सूचना हटा देल गेल');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'हटाबै में समस्या आएल');
    }
  };

  const handleApproveSubmission = async (id, publishToTimeline) => {
    try {
      await API.put(`/history-submissions/${id}/approve`, {
        status: 'approved',
        publishToTimeline,
      });
      showNotification('success', 'सबमिशन स्वीकृत कैल गेल!');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'स्वीकृत करै में समस्या आएल');
    }
  };

  const handleRejectSubmission = async (id) => {
    try {
      await API.put(`/history-submissions/${id}/approve`, { status: 'rejected' });
      showNotification('success', 'सबमिशन अस्वीकृत कैल गेल');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'समस्या आएल');
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      await API.put('/settings', settings);
      showNotification('success', 'साइट सेटिंग्स अद्यतन भेल!');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'सेटिंग्स अपडेट में समस्या आएल');
    }
  };

  // --- Pandit Ji Handlers ---
  const openAddPanditModal = () => {
    setEditingPanditId(null);
    setPanditForm({ name: '', role: '', description: '', displayOrder: pandits.length + 1, isPublished: true, photoUrl: '' });
    setPanditFile(null);
    setShowPanditModal(true);
  };

  const openEditPanditModal = (pandit) => {
    setEditingPanditId(pandit._id);
    setPanditForm({
      name: pandit.name || '',
      role: pandit.role || '',
      description: pandit.description || '',
      displayOrder: pandit.displayOrder || 0,
      isPublished: pandit.isPublished !== undefined ? pandit.isPublished : true,
      photoUrl: pandit.photo || '',
    });
    setPanditFile(null);
    setShowPanditModal(true);
  };

  const handleAddEditPandit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', panditForm.name);
      data.append('role', panditForm.role);
      data.append('description', panditForm.description);
      data.append('displayOrder', panditForm.displayOrder);
      data.append('isPublished', panditForm.isPublished);
      if (panditForm.photoUrl) data.append('photoUrl', panditForm.photoUrl);
      if (panditFile) data.append('photo', panditFile);

      if (editingPanditId) {
        await API.put(`/pandits/${editingPanditId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        showNotification('success', 'पंडित जीक जानकारी अद्यतन भेल!');
      } else {
        await API.post('/pandits', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        showNotification('success', 'नबीन पंडित जी सफलतापूर्वक जोडल गेलाह!');
      }
      setShowPanditModal(false);
      fetchAllData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'पंडित जानकारी सहेजै में समस्या आएल');
    }
  };

  const handleDeletePandit = async (id) => {
    if (!window.confirm('कि अहाँ इ पंडित जीक जानकारी हटाबय चाहैत छी?')) return;
    try {
      await API.delete(`/pandits/${id}`);
      showNotification('success', 'पंडित जीक जानकारी हटा देल गेल');
      fetchAllData();
    } catch (err) {
      showNotification('error', 'हटाबै में समस्या आएल');
    }
  };

  const handleTogglePanditStatus = async (pandit) => {
    try {
      await API.put(`/pandits/${pandit._id}`, { isPublished: !pandit.isPublished });
      showNotification('success', `स्थिति परिवर्तन भेल: ${!pandit.isPublished ? 'प्रकाशित' : 'अप्रकाशित'}`);
      fetchAllData();
    } catch (err) {
      showNotification('error', 'स्थिति परिवर्तन में समस्या आएल');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#6A0909] text-white border-r-2 border-[#D4AF37] p-4 flex flex-col justify-between shrink-0 shadow-xl">
        <div>
          <div className="p-4 text-center border-b border-[#D4AF37]/40 mb-6">
            <h1 className="font-heading text-xl font-bold text-[#FFD700]">दुर्गा स्थान एडमिन</h1>
            <p className="text-xs text-amber-200">भटसिमर (मधुबनी)</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', name: 'डैशबोर्ड ओवरव्यू', icon: LayoutDashboard },
              { id: 'pandits', name: 'हमर पंडित जी', icon: Users },
              { id: 'history', name: 'इतिहास टाइमलाइन', icon: History },
              { id: 'gallery', name: 'फोटो गैलरी', icon: ImageIcon },
              { id: 'events', name: 'पूजा आ उत्सव', icon: Calendar },
              { id: 'announcements', name: 'सूचना / अपडेट्स', icon: Bell },
              { id: 'submissions', name: 'जन योगदान सबमिशन', icon: Inbox, badge: submissions.filter(s => s.status === 'pending').length },
              { id: 'messages', name: 'संपर्क संदेश', icon: MessageSquare, badge: messages.filter(m => m.status === 'unread').length },
              { id: 'settings', name: 'साइट सेटिंग्स', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E65100] text-white border border-[#D4AF37] shadow-md'
                      : 'text-amber-100 hover:bg-[#800000] hover:text-[#FFD700]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#FFD700]" />
                    <span>{tab.name}</span>
                  </div>
                  {tab.badge > 0 && (
                    <span className="bg-[#E65100] text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold border border-[#FFD700]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-amber-500/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#4A0505] hover:bg-red-800 text-amber-200 py-3 rounded-xl font-bold text-xs border border-amber-500/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>लॉगआउट (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl">
        {/* Status Toast Banner */}
        {status.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center justify-between shadow-md ${
              status.type === 'success' ? 'bg-emerald-700 text-white' : 'bg-red-700 text-white'
            }`}
          >
            <span>{status.text}</span>
            <button onClick={() => setStatus({ type: '', text: '' })}>✕</button>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#6A0909]">प्रशासनिक डैशबोर्ड ओवरव्यू</h2>
              <p className="text-gray-600 font-serif text-sm">दुर्गा स्थान भटसिमर वेबसाइटक मुख्य आंकड़ा आ स्थिति</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 temple-card-shadow flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">हमर पंडित जी</span>
                  <h3 className="font-heading text-3xl font-extrabold text-[#6A0909] mt-1">{pandits.length}</h3>
                </div>
                <Users className="w-10 h-10 text-[#E65100]" />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 temple-card-shadow flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">फोटो गैलरी</span>
                  <h3 className="font-heading text-3xl font-extrabold text-[#6A0909] mt-1">{galleryItems.length}</h3>
                </div>
                <ImageIcon className="w-10 h-10 text-[#E65100]" />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 temple-card-shadow flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">पूजा व कार्यक्रम</span>
                  <h3 className="font-heading text-3xl font-extrabold text-[#6A0909] mt-1">{events.length}</h3>
                </div>
                <Calendar className="w-10 h-10 text-[#6A0909]" />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 temple-card-shadow flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">लंबित सबमिशन</span>
                  <h3 className="font-heading text-3xl font-extrabold text-amber-600 mt-1">
                    {submissions.filter((s) => s.status === 'pending').length}
                  </h3>
                </div>
                <Inbox className="w-10 h-10 text-amber-600" />
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 temple-card-shadow flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase">संपर्क संदेश</span>
                  <h3 className="font-heading text-3xl font-extrabold text-[#6A0909] mt-1">{messages.length}</h3>
                </div>
                <MessageSquare className="w-10 h-10 text-[#E65100]" />
              </div>
            </div>
          </div>
        )}

        {/* TAB: PANDITS MANAGER */}
        {activeTab === 'pandits' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#6A0909]">पंडित जी प्रबंधन</h2>
                <p className="text-xs text-gray-600 font-serif">दुर्गा स्थान, भटसिमर सँ जुड़ल पंडित जीक सूची आ जानकारी प्रबंधित करू</p>
              </div>
              <button
                onClick={openAddPanditModal}
                className="flex items-center gap-2 bg-[#E65100] text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-[#D4AF37] shadow hover:bg-[#D9531E]"
              >
                <Plus className="w-4 h-4 text-[#FFD700]" />
                <span>नबीन पंडित जी जोडू</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pandits.map((p) => (
                <div key={p._id} className="bg-white rounded-3xl border-2 border-amber-200 overflow-hidden temple-card-shadow flex flex-col justify-between p-5 space-y-4">
                  <div className="flex items-center gap-4 border-b border-amber-100 pb-3">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shrink-0"
                    />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#6A0909]">{p.name}</h3>
                      <p className="text-xs font-bold text-[#E65100]">{p.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 font-serif leading-relaxed line-clamp-3">
                    {p.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-xs border-t border-amber-100">
                    <span className="font-bold text-gray-500">क्रम: {p.displayOrder || 0}</span>
                    <button
                      onClick={() => handleTogglePanditStatus(p)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                        p.isPublished
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-gray-100 text-gray-600 border-gray-300'
                      }`}
                    >
                      {p.isPublished ? 'प्रकाशित (Published)' : 'अप्रकाशित (Draft)'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <button
                      onClick={() => openEditPanditModal(p)}
                      className="flex-1 flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-[#6A0909] py-2 rounded-xl text-xs font-bold border border-amber-300"
                    >
                      <Edit className="w-4 h-4" />
                      <span>संपादित करू (Edit)</span>
                    </button>

                    <button
                      onClick={() => handleDeletePandit(p._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl border border-red-200"
                      title="हटाऊ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HISTORY TIMELINE */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#6A0909]">इतिहास टाइमलाइन प्रबंधन</h2>
                <p className="text-xs text-gray-600 font-serif">सत्यापित इतिहास आइटम जोडू या प्रबंधित करू</p>
              </div>
              <button
                onClick={() => setShowHistoryModal(true)}
                className="flex items-center gap-2 bg-[#E65100] text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-[#D4AF37] shadow"
              >
                <Plus className="w-4 h-4 text-[#FFD700]" />
                <span>नबीन इतिहास जोडू</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden temple-card-shadow">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead className="bg-[#6A0909] text-white">
                  <tr>
                    <th className="p-4">वर्ष / काल</th>
                    <th className="p-4">शीर्षक</th>
                    <th className="p-4">वर्ग (Section)</th>
                    <th className="p-4 text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {historyItems.map((item) => (
                    <tr key={item._id} className="hover:bg-amber-50/50">
                      <td className="p-4 font-bold text-[#E65100]">{item.year}</td>
                      <td className="p-4 font-bold text-[#6A0909]">{item.title}</td>
                      <td className="p-4 font-semibold text-gray-600">{item.section}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteHistory(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#6A0909]">फोटो गैलरी प्रबंधन</h2>
                <p className="text-xs text-gray-600 font-serif">Cloudinary / लोकल स्टोरेज पर फोटो अपलोड करू</p>
              </div>
              <button
                onClick={() => setShowGalleryModal(true)}
                className="flex items-center gap-2 bg-[#E65100] text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-[#D4AF37] shadow"
              >
                <Upload className="w-4 h-4 text-[#FFD700]" />
                <span>नबीन फोटो अपलोड करू</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((img) => (
                <div key={img._id} className="bg-white rounded-2xl border border-amber-200 overflow-hidden temple-card-shadow flex flex-col justify-between">
                  <div className="h-44 bg-[#6A0909] relative">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-[#E65100] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]">
                      {img.category}
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#6A0909] truncate">{img.title}</h4>
                    <button
                      onClick={() => handleDeleteGallery(img._id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS MANAGER */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#6A0909]">पूजा आ उत्सव प्रबंधन</h2>
                <p className="text-xs text-gray-600 font-serif">धार्मिक कार्यक्रम आ तिथिसभ प्रबंधित करू</p>
              </div>
              <button
                onClick={() => setShowEventModal(true)}
                className="flex items-center gap-2 bg-[#E65100] text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-[#D4AF37] shadow"
              >
                <Plus className="w-4 h-4 text-[#FFD700]" />
                <span>नबीन कार्यक्रम जोडू</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((ev) => (
                <div key={ev._id} className="bg-white p-5 rounded-2xl border border-amber-200 temple-card-shadow flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#E65100] bg-amber-100 px-2 py-0.5 rounded-full">{ev.category}</span>
                    <h3 className="font-heading text-lg font-bold text-[#6A0909] mt-1">{ev.title}</h3>
                    <p className="text-xs text-gray-600 font-serif mt-1">{ev.dateText}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(ev._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#6A0909]">सूचना / अपडेट्स प्रबंधन</h2>
                <p className="text-xs text-gray-600 font-serif">वेबसाइट पर स्क्रॉल होइ वाला सूचना पोस्ट करू</p>
              </div>
              <button
                onClick={() => setShowAnnounceModal(true)}
                className="flex items-center gap-2 bg-[#E65100] text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-[#D4AF37] shadow"
              >
                <Plus className="w-4 h-4 text-[#FFD700]" />
                <span>नबीन सूचना पोस्ट करू</span>
              </button>
            </div>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann._id} className="bg-white p-5 rounded-2xl border border-amber-200 temple-card-shadow flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#6A0909]">{ann.title}</h3>
                    <p className="text-xs text-gray-700 font-serif mt-1">{ann.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(ann._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SUBMISSIONS REVIEW */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#6A0909]">जन इतिहास सबमिशन समीक्षा</h2>
              <p className="text-xs text-gray-600 font-serif">श्रद्धालुगण द्वारा भेजल गेल इतिहासिक विवरण आ फोटो समीक्षा करू</p>
            </div>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <div key={sub._id} className="bg-white p-6 rounded-2xl border border-amber-200 temple-card-shadow space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-bold text-[#6A0909] text-base">{sub.name}</h4>
                      <span className="text-xs text-gray-500 font-bold">मोबाइल: {sub.mobile}</span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      sub.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : sub.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status === 'approved' ? 'स्वीकृत' : sub.status === 'rejected' ? 'अस्वीकृत' : 'समीक्षा लंबित'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-800 font-serif leading-relaxed">
                    <span className="font-bold text-[#E65100]">विवरण: </span>{sub.historyInfo}
                  </p>

                  {sub.story && (
                    <p className="text-xs text-gray-600 font-serif italic">
                      <span className="font-bold text-[#6A0909]">संस्मरण: </span>"{sub.story}"
                    </p>
                  )}

                  {sub.imageUrl && (
                    <div className="pt-2">
                      <img src={sub.imageUrl} alt="संलग्न फोटो" className="h-32 rounded-lg object-cover border" />
                    </div>
                  )}

                  {sub.status === 'pending' && (
                    <div className="flex items-center gap-3 pt-3 border-t">
                      <button
                        onClick={() => handleApproveSubmission(sub._id, true)}
                        className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>स्वीकृत करू आ टाइमलाइन में जोड़ू</span>
                      </button>

                      <button
                        onClick={() => handleRejectSubmission(sub._id)}
                        className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>अस्वीकृत करू</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#6A0909]">संपर्क संदेश सूची</h2>
              <p className="text-xs text-gray-600 font-serif">श्रद्धालुगण द्वारा भेजल गेल संदेश आ प्रश्न</p>
            </div>

            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg._id} className="bg-white p-5 rounded-2xl border border-amber-200 temple-card-shadow flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-[#6A0909]">{msg.name} ({msg.mobile})</h4>
                    <p className="text-xs text-gray-700 font-serif mt-2">{msg.message}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block">{new Date(msg.createdAt).toLocaleString('hi-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#6A0909]">साइट सेटिंग्स आ मंदिर जानकारी</h2>
              <p className="text-xs text-gray-600 font-serif">मुख्य मंदिर नाम, संपर्क व्यक्ति, स्थान आ विवरण संपादित करू</p>
            </div>

            <form onSubmit={handleUpdateSettings} className="bg-white p-8 rounded-3xl border border-amber-200 temple-card-shadow space-y-6 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">मंदिर नाम</label>
                <input
                  type="text"
                  value={settings.templeName || ''}
                  onChange={(e) => setSettings({ ...settings, templeName: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm font-serif bg-[#FAF5EF]/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">मुख्य संपर्क व्यक्ति</label>
                <input
                  type="text"
                  value={settings.contactPerson || ''}
                  onChange={(e) => setSettings({ ...settings, contactPerson: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm font-serif bg-[#FAF5EF]/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">संपर्क मोबाइल नंबर</label>
                <input
                  type="text"
                  value={settings.contactMobile || ''}
                  onChange={(e) => setSettings({ ...settings, contactMobile: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm font-serif bg-[#FAF5EF]/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">स्थान पता (Address)</label>
                <input
                  type="text"
                  value={settings.locationAddress || ''}
                  onChange={(e) => setSettings({ ...settings, locationAddress: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm font-serif bg-[#FAF5EF]/50 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#E65100] text-white font-bold rounded-xl border border-[#D4AF37] shadow"
              >
                सेटिंग्स सहेजू (Save Settings)
              </button>
            </form>
          </div>
        )}
      </main>

      {/* --- MODALS --- */}
      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border-2 border-[#D4AF37]">
            <h3 className="font-heading text-xl font-bold text-[#6A0909]">नबीन इतिहास आइटम जोडू</h3>
            <form onSubmit={handleAddHistory} className="space-y-4 text-xs">
              <input
                type="text"
                placeholder="वर्ष / काल (उदा. 1950)"
                value={historyForm.year}
                onChange={(e) => setHistoryForm({ ...historyForm, year: e.target.value })}
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="text"
                placeholder="शीर्षक"
                value={historyForm.title}
                onChange={(e) => setHistoryForm({ ...historyForm, title: e.target.value })}
                required
                className="w-full p-3 border rounded-xl"
              />
              <select
                value={historyForm.section}
                onChange={(e) => setHistoryForm({ ...historyForm, section: e.target.value })}
                className="w-full p-3 border rounded-xl"
              >
                {HISTORY_SECTIONS.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
              <textarea
                placeholder="विवरण"
                rows={3}
                value={historyForm.description}
                onChange={(e) => setHistoryForm({ ...historyForm, description: e.target.value })}
                required
                className="w-full p-3 border rounded-xl"
              ></textarea>

              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-[#E65100] text-white font-bold rounded-xl">सहेजू</button>
                <button type="button" onClick={() => setShowHistoryModal(false)} className="px-4 py-3 bg-gray-200 rounded-xl font-bold">रद्द करू</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border-2 border-[#D4AF37]">
            <h3 className="font-heading text-xl font-bold text-[#6A0909]">नबीन फोटो अपलोड करू</h3>
            <form onSubmit={handleAddGallery} className="space-y-4 text-xs">
              <input
                type="text"
                placeholder="फोटो शीर्षक"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                required
                className="w-full p-3 border rounded-xl"
              />
              <select
                value={galleryForm.category}
                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                className="w-full p-3 border rounded-xl"
              >
                {GALLERY_CATEGORIES.filter(c => c !== 'सभटा').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGalleryFile(e.target.files[0])}
                required
                className="w-full p-2 border rounded-xl"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-[#E65100] text-white font-bold rounded-xl">अपलोड करू</button>
                <button type="button" onClick={() => setShowGalleryModal(false)} className="px-4 py-3 bg-gray-200 rounded-xl font-bold">रद्द करू</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pandit Modal */}
      {showPanditModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border-2 border-[#D4AF37] max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading text-xl font-bold text-[#6A0909]">
              {editingPanditId ? 'पंडित जीक जानकारी संपादित करू' : 'नबीन पंडित जी जोडू'}
            </h3>
            <form onSubmit={handleAddEditPandit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">नाम (Name) *</label>
                <input
                  type="text"
                  placeholder="उदा. पंडित शशिधर झा"
                  value={panditForm.name}
                  onChange={(e) => setPanditForm({ ...panditForm, name: e.target.value })}
                  required
                  className="w-full p-3 border rounded-xl font-serif"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">भूमिका (Role) *</label>
                <input
                  type="text"
                  placeholder="उदा. दुर्गा स्थान में पूजा-पाठ करैत छथि।"
                  value={panditForm.role}
                  onChange={(e) => setPanditForm({ ...panditForm, role: e.target.value })}
                  required
                  className="w-full p-3 border rounded-xl font-serif"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">विवरण (Description) *</label>
                <textarea
                  placeholder="पंडित जीक मैथिली परिचय विवरण"
                  rows={3}
                  value={panditForm.description}
                  onChange={(e) => setPanditForm({ ...panditForm, description: e.target.value })}
                  required
                  className="w-full p-3 border rounded-xl font-serif"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">प्रदर्शन क्रम (Display Order)</label>
                  <input
                    type="number"
                    value={panditForm.displayOrder}
                    onChange={(e) => setPanditForm({ ...panditForm, displayOrder: e.target.value })}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input
                      type="checkbox"
                      checked={panditForm.isPublished}
                      onChange={(e) => setPanditForm({ ...panditForm, isPublished: e.target.checked })}
                      className="w-4 h-4 text-[#E65100]"
                    />
                    <span>वेबसाइट पर प्रकाशित करू</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">फ़ोटो (Photo)</label>
                {panditForm.photoUrl && (
                  <div className="mb-2 flex items-center gap-2">
                    <img src={panditForm.photoUrl} alt="वर्तमान फोटो" className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]" />
                    <span className="text-[10px] text-gray-500">वर्तमान फोटो</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPanditFile(e.target.files[0])}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 bg-[#E65100] hover:bg-[#D9531E] text-white font-bold rounded-xl shadow">
                  {editingPanditId ? 'अद्यतन करू (Update)' : 'सहेजू (Save)'}
                </button>
                <button type="button" onClick={() => setShowPanditModal(false)} className="px-4 py-3 bg-gray-200 rounded-xl font-bold">
                  रद्द करू
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
