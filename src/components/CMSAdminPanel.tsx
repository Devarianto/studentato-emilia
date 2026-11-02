import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Room, Review, FAQItem, CMSRole, CMSUser, AmenityItem } from '../types';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Shield,
  Users,
  Palette,
  FileText,
  BedDouble,
  MessageSquare,
  Lock,
  Download,
  Upload,
  Copy,
  LogOut,
  ExternalLink,
  LayoutDashboard,
  KeyRound,
  UserCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Globe,
} from 'lucide-react';

type CMSTab = 'dashboard' | 'rooms' | 'content' | 'reviews_faq' | 'theme' | 'roles';

export const CMSAdminPanel: React.FC = () => {
  const {
    cmsData,
    updateCMSData,
    saveNow,
    resetToDefault,
    isSaving,
    lastSavedAt,
    serverConnected,
    isAuthenticated,
    currentUser,
    currentRole,
    login,
    logout,
    switchUser,
    navigateTo,
  } = useCMS();

  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard State
  const [activeTab, setActiveTab] = useState<CMSTab>('dashboard');
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [contentSubTab, setContentSubTab] = useState<
    'contact' | 'heroV1' | 'about' | 'offers' | 'services'
  >('heroV1');
  const [reviewFaqSubTab, setReviewFaqSubTab] = useState<'reviews' | 'faqs' | 'locations'>(
    'reviews'
  );
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  // Role & User Creation State
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('#8B5CF6');
  const [newUsername, setNewUsername] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('editor');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 3000);
  };

  // ================= 1. WORDPRESS-STYLE LOGIN SCREEN =================
  if (!isAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError(null);
      const res = login(loginId, loginPassword);
      if (!res.ok) {
        setLoginError(res.error || 'Gagal login');
      } else {
        setLoginId('');
        setLoginPassword('');
      }
    };

    const fillDemoAccount = (u: CMSUser) => {
      setLoginId(u.username || u.email);
      setLoginPassword(u.password || u.pin);
      setLoginError(null);
    };

    return (
      <div className="min-h-screen bg-[#F0F0F1] flex flex-col justify-center items-center p-4 font-sans text-zinc-900">
        <div className="w-full max-w-md space-y-6">
          {/* Brand Logo Header above Login Box (WordPress style) */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#FA5C38] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg border-4 border-[#FFC83B]">
              SE
            </div>
            <h1 className="font-black text-xl tracking-tight text-zinc-900">
              Studentato Emilia <span className="text-[#FA5C38]">CMS</span>
            </h1>
            <p className="text-xs text-zinc-500 font-medium">
              Content Management System & Administration Portal
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-zinc-200/90 space-y-5">
            {loginError && (
              <div className="bg-red-50 border-l-4 border-red-600 p-3.5 rounded-r-xl text-xs text-red-900 font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                  Username atau Alamat Email
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="admin atau admin@studentatoemilia.it"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-zinc-900 focus:bg-white focus:border-[#FA5C38] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 pr-10 text-sm font-semibold text-zinc-900 focus:bg-white focus:border-[#FA5C38] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-600 pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[#FA5C38] rounded"
                  />
                  <span>Ingat Saya (Remember Me)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Log In ke Dashboard CMS</span>
              </button>
            </form>

            {/* Quick Fill Demo Accounts Helper */}
            <div className="pt-4 border-t border-zinc-100 space-y-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                Klik Akun di Bawah untuk Isi Otomatis (Sesuai Role):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cmsData.users.map((u) => {
                  const r = cmsData.roles.find((role) => role.id === u.roleId);
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => fillDemoAccount(u)}
                      className="text-left p-2.5 rounded-xl border border-zinc-200 hover:border-[#FA5C38] hover:bg-amber-50/40 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-xs text-zinc-900 group-hover:text-[#FA5C38] truncate">
                          {u.username || u.name}
                        </span>
                        <span
                          className="text-[9px] font-black text-white px-1.5 py-0.5 rounded uppercase shrink-0"
                          style={{ backgroundColor: r?.badgeColor || '#71717A' }}
                        >
                          {r?.name || u.roleId}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                        Pass: {u.password || u.pin}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Back to Public Website Link */}
          <div className="text-center">
            <button
              onClick={() => navigateTo('site')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-[#FA5C38] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Publik Studentato Emilia</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 2. WORDPRESS-STYLE FULL ADMIN DASHBOARD =================
  const perms = currentRole.permissions;

  const handleManualSave = async () => {
    const ok = await saveNow();
    showToast(
      ok
        ? '✅ Perubahan berhasil disimpan permanen ke server (data/cms-data.json)'
        : '💾 Tersimpan di penyimpanan lokal browser'
    );
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(cmsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studentato-emilia-cms.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📦 File JSON CMS berhasil diunduh');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result));
        updateCMSData((prev) => ({ ...prev, ...parsed }));
        showToast('✅ Data JSON berhasil diimpor & disimpan!');
      } catch {
        alert('Format JSON tidak valid.');
      }
    };
    reader.readAsText(file);
  };

  // Room CRUD
  const handleAddRoom = () => {
    if (!perms.canManageRooms) return;
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: 'New Room Suite - Torino',
      type: 'single_deluxe',
      city: 'Torino',
      priceMonth: 550,
      sizeSqM: 18,
      availableFrom: 'Sept 2025',
      badge: 'New Room',
      description: {
        EN: 'Modern furnished student room at Viale della Rimembranza 2, Torino with high-speed Wi-Fi and study desk.',
        IT: 'Camera moderna arredata per studenti in Viale della Rimembranza 2, Torino con Wi-Fi veloce e scrivania.',
      },
      images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      ],
      features: ['1Gbps Fiber Wi-Fi', 'AC & Heating', 'Study Desk', 'All Bills Included'],
      isPopular: true,
    };
    updateCMSData((prev) => ({
      ...prev,
      rooms: [newRoom, ...prev.rooms],
    }));
    setEditingRoomId(newRoom.id);
    showToast('🛏️ Kamar baru ditambahkan');
  };

  const handleDuplicateRoom = (room: Room) => {
    if (!perms.canManageRooms) return;
    const copy: Room = {
      ...room,
      id: `room-${Date.now()}`,
      name: `${room.name} (Copy)`,
    };
    updateCMSData((prev) => ({
      ...prev,
      rooms: [...prev.rooms, copy],
    }));
    setEditingRoomId(copy.id);
    showToast('📋 Kamar berhasil diduplikat');
  };

  const handleDeleteRoom = (id: string) => {
    if (!perms.canManageRooms) return;
    updateCMSData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.id !== id),
    }));
    if (editingRoomId === id) setEditingRoomId(null);
    showToast('🗑️ Kamar dihapus');
  };

  const handleUpdateRoom = (id: string, patch: Partial<Room>) => {
    if (!perms.canManageRooms) return;
    updateCMSData((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  };

  // Review & FAQ CRUD
  const handleAddReview = () => {
    if (!perms.canManageReviewsFaq) return;
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      studentName: 'Mahasiswa Baru',
      university: 'Politecnico di Torino',
      city: 'Torino',
      roomType: 'Room Type A - Deluxe Single Suite',
      rating: 5,
      date: 'Baru Saja',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: {
        EN: 'Great student residence in Torino with superfast internet and friendly community!',
        IT: 'Ottima residenza per studenti a Torino con internet velocissimo e bella community!',
      },
      verified: true,
    };
    updateCMSData((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews],
    }));
    setEditingReviewId(newRev.id);
    showToast('⭐ Review baru ditambahkan');
  };

  const handleAddFaq = () => {
    if (!perms.canManageReviewsFaq) return;
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      category: 'booking',
      question: {
        EN: 'New Frequently Asked Question?',
        IT: 'Nuova Domanda Frequente?',
      },
      answer: {
        EN: 'Write the detailed answer in English here.',
        IT: 'Scrivi qui la risposta dettagliata in Italiano.',
      },
    };
    updateCMSData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFaq],
    }));
    setEditingFaqId(newFaq.id);
    showToast('❓ Pertanyaan FAQ baru ditambahkan');
  };

  // Role & User CRUD
  const handleToggleRolePermission = (
    roleId: string,
    permKey: keyof CMSRole['permissions']
  ) => {
    if (!perms.canManageRolesUsers) return;
    updateCMSData((prev) => ({
      ...prev,
      roles: prev.roles.map((r) => {
        if (r.id !== roleId) return r;
        if (r.id === 'super_admin' && permKey === 'canManageRolesUsers') return r;
        return {
          ...r,
          permissions: {
            ...r.permissions,
            [permKey]: !r.permissions[permKey],
          },
        };
      }),
    }));
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perms.canManageRolesUsers || !newRoleName.trim()) return;
    const roleId =
      newRoleName.toLowerCase().replace(/[^a-z0-9]/g, '_') +
      '_' +
      Date.now().toString().slice(-3);
    const newRole: CMSRole = {
      id: roleId,
      name: newRoleName.trim(),
      badgeColor: newRoleColor,
      description: newRoleDesc.trim() || 'Custom CMS Role',
      isSystem: false,
      permissions: {
        canManageRooms: true,
        canEditContent: true,
        canManageReviewsFaq: false,
        canCustomizeTheme: false,
        canManageRolesUsers: false,
      },
    };
    updateCMSData((prev) => ({
      ...prev,
      roles: [...prev.roles, newRole],
    }));
    setNewRoleName('');
    setNewRoleDesc('');
    showToast(`🛡️ Role "${newRole.name}" berhasil dibuat`);
  };

  const handleDeleteRole = (roleId: string) => {
    if (!perms.canManageRolesUsers) return;
    updateCMSData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r.id !== roleId || r.isSystem),
      users: prev.users.map((u) => (u.roleId === roleId ? { ...u, roleId: 'viewer' } : u)),
    }));
    showToast('🗑️ Role dihapus');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perms.canManageRolesUsers || !newUserName.trim() || !newUsername.trim()) return;
    const newUser: CMSUser = {
      id: `user-${Date.now()}`,
      username: newUsername.trim().toLowerCase(),
      name: newUserName.trim(),
      email: newUserEmail.trim() || `${newUsername.trim().toLowerCase()}@studentatoemilia.it`,
      roleId: newUserRole,
      password: newUserPassword || '123456',
      pin: newUserPassword || '123456',
      active: true,
    };
    updateCMSData((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
    }));
    setNewUsername('');
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
    showToast(`👤 User "${newUser.username}" berhasil ditambahkan`);
  };

  const renderPermissionDenied = (moduleName: string) => (
    <div className="bg-white border-2 border-red-200 rounded-2xl p-8 text-center my-6 space-y-3 max-w-xl mx-auto shadow-xs">
      <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
        <Lock className="w-6 h-6" />
      </div>
      <h4 className="font-black text-base text-red-950">
        Akses Dibatasi untuk Role: <span className="underline">{currentRole.name}</span>
      </h4>
      <p className="text-xs text-zinc-600 leading-relaxed">
        Akun Anda saat ini (<strong>{currentUser.name}</strong> —{' '}
        <code>{currentUser.username}</code>) tidak memiliki izin untuk mengubah{' '}
        <strong>{moduleName}</strong>. Silakan logout dan masuk sebagai{' '}
        <strong>Super Admin (`admin`)</strong> untuk membuka seluruh fitur.
      </p>
      <div className="pt-2">
        <button
          onClick={logout}
          className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow inline-flex items-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout & Ganti Akun Admin</span>
        </button>
      </div>
    </div>
  );

  const sidebarItems = [
    {
      id: 'dashboard' as CMSTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      allowed: true,
    },
    {
      id: 'rooms' as CMSTab,
      label: `Rooms / Kamar (${cmsData.rooms.length})`,
      icon: BedDouble,
      allowed: perms.canManageRooms,
    },
    {
      id: 'content' as CMSTab,
      label: 'Pages & Konten',
      icon: FileText,
      allowed: perms.canEditContent,
    },
    {
      id: 'reviews_faq' as CMSTab,
      label: 'Reviews & FAQ',
      icon: MessageSquare,
      allowed: perms.canManageReviewsFaq,
    },
    {
      id: 'theme' as CMSTab,
      label: 'Appearance / Tema',
      icon: Palette,
      allowed: perms.canCustomizeTheme,
    },
    {
      id: 'roles' as CMSTab,
      label: 'Users & Roles',
      icon: Users,
      allowed: perms.canManageRolesUsers,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0F1] flex flex-col font-sans text-zinc-900">
      {/* 1. WORDPRESS-STYLE TOP ADMIN BAR */}
      <header className="bg-[#1D2327] text-white h-12 px-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FA5C38] flex items-center justify-center font-black text-xs text-white">
              SE
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-tight hidden sm:inline">
              Studentato Emilia CMS
            </span>
          </div>

          {/* Visit Public Site Link */}
          <button
            onClick={() => navigateTo('site')}
            className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-[#FA5C38] text-zinc-200 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Lihat Website Publik</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </button>

          {/* Server Status Indicator */}
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span
              className={`w-2 h-2 rounded-full ${
                serverConnected ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            {isSaving
              ? 'Menyimpan ke server...'
              : serverConnected
              ? `Tersimpan di Server ${lastSavedAt ? `(${lastSavedAt})` : ''}`
              : 'Mode Lokal'}
          </span>
        </div>

        {/* Right User Profile & Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSave}
            className="inline-flex items-center gap-1.5 bg-[#FA5C38] hover:bg-[#E04B28] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-lg shadow transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simpan Perubahan</span>
          </button>

          <div className="h-5 w-[1px] bg-zinc-700 hidden sm:block" />

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden lg:inline text-zinc-300">
              Halo, <strong className="text-white">{currentUser.name}</strong>
            </span>
            <span
              className="text-[10px] font-black uppercase px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: currentRole.badgeColor }}
            >
              {currentRole.name}
            </span>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
            title="Logout dari CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* TOAST BANNER */}
      {toastMsg && (
        <div className="bg-emerald-600 text-white text-xs font-extrabold px-4 py-2.5 text-center shadow">
          {toastMsg}
        </div>
      )}

      {/* 2. MAIN BODY: LEFT SIDEBAR + RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Navigation Sidebar (WordPress Dark Menu) */}
        <aside className="w-full md:w-60 bg-[#1D2327] text-zinc-300 shrink-0 flex flex-col justify-between border-r border-zinc-800">
          <nav className="p-2 md:p-3 flex md:flex-col gap-1 overflow-x-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#FA5C38] text-white shadow-sm'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {!item.allowed && <Lock className="w-3.5 h-3.5 text-zinc-500" />}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Tools (Export / Import / Reset) */}
          <div className="hidden md:block p-4 border-t border-zinc-800 space-y-2 text-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
              Backup & Tools
            </span>
            <button
              onClick={handleExportJSON}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold"
            >
              <Download className="w-3.5 h-3.5 text-[#FFC83B]" />
              <span>Export Database JSON</span>
            </button>
            <label className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#FFC83B]" />
              <span>Import Database JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
            {perms.canManageRolesUsers && (
              <button
                onClick={async () => {
                  if (window.confirm('Reset seluruh data CMS kembali ke default awal?')) {
                    await resetToDefault();
                    showToast('🔄 Data CMS di-reset ke default');
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/50 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Data Default</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl">
          {/* ================= TAB 0: DASHBOARD OVERVIEW ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-zinc-900">Dashboard</h1>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Selamat datang di panel administrasi Studentato Emilia,{' '}
                    <strong>{currentUser.name}</strong> ({currentRole.name}).
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('site')}
                  className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow"
                >
                  <Globe className="w-4 h-4 text-[#FFC83B]" />
                  <span>Buka Halaman Depan Website</span>
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('rooms')}
                  className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <span className="text-xs font-bold text-zinc-500 block">Total Kamar Aktif</span>
                  <span className="text-3xl font-black text-[#FA5C38] mt-1 block">
                    {cmsData.rooms.length}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-600 mt-2 block">
                    Kelola Katalog Kamar →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('reviews_faq')}
                  className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <span className="text-xs font-bold text-zinc-500 block">Ulasan Mahasiswa</span>
                  <span className="text-3xl font-black text-amber-500 mt-1 block">
                    {cmsData.reviews.length}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-600 mt-2 block">
                    Kelola Review & FAQ →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('theme')}
                  className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <span className="text-xs font-bold text-zinc-500 block">Tema & Gaya Visual</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className="w-6 h-6 rounded-full border border-zinc-300"
                      style={{ backgroundColor: cmsData.theme.primaryColor }}
                    />
                    <span className="text-base font-black text-zinc-900">
                      Torinese Editorial
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-600 mt-2 block">
                    Kustomisasi Tampilan →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('roles')}
                  className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <span className="text-xs font-bold text-zinc-500 block">
                    Pengguna & Role Terdaftar
                  </span>
                  <span className="text-3xl font-black text-emerald-600 mt-1 block">
                    {cmsData.users.length} User
                  </span>
                  <span className="text-[11px] font-bold text-zinc-600 mt-2 block">
                    {cmsData.roles.length} Role Terkonfigurasi →
                  </span>
                </div>
              </div>

              {/* Active User Role Permissions Card */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                  <div>
                    <h3 className="font-black text-sm text-zinc-900">
                      Status Sesi Login & Hak Akses Anda Saat Ini
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Login sebagai <strong>{currentUser.name}</strong> (Username:{' '}
                      <code>{currentUser.username}</code> • Email: {currentUser.email})
                    </p>
                  </div>
                  <span
                    className="text-xs font-black text-white px-3 py-1 rounded-full uppercase"
                    style={{ backgroundColor: currentRole.badgeColor }}
                  >
                    Role: {currentRole.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                  {[
                    { label: 'Kelola Kamar', ok: perms.canManageRooms },
                    { label: 'Edit Konten Teks', ok: perms.canEditContent },
                    { label: 'Kelola Review & FAQ', ok: perms.canManageReviewsFaq },
                    { label: 'Tema & CSS', ok: perms.canCustomizeTheme },
                    { label: 'Kelola Role & User', ok: perms.canManageRolesUsers },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border font-bold flex items-center gap-2 ${
                        p.ok
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                      }`}
                    >
                      <span>{p.ok ? '✅' : '🔒'}</span>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 1: ROOMS CATALOG ================= */}
          {activeTab === 'rooms' && (
            <div>
              {!perms.canManageRooms ? (
                renderPermissionDenied('Katalog Kamar & Harga')
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="font-black text-xl text-zinc-900">
                        Rooms / Katalog Kamar ({cmsData.rooms.length})
                      </h2>
                      <p className="text-xs text-zinc-500">
                        Tambah, edit harga, foto, fasilitas, dan deskripsi kamar (EN & IT).
                      </p>
                    </div>
                    <button
                      onClick={handleAddRoom}
                      className="inline-flex items-center gap-1.5 bg-[#FA5C38] hover:bg-[#E04B28] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Kamar Baru</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cmsData.rooms.map((room) => {
                      const isEditing = editingRoomId === room.id;
                      return (
                        <div
                          key={room.id}
                          className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden"
                        >
                          <div className="p-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={room.images[0]}
                                alt={room.name}
                                className="w-14 h-14 rounded-xl object-cover bg-zinc-200 shrink-0 border border-zinc-200"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-extrabold text-sm text-zinc-900 truncate">
                                    {room.name}
                                  </h4>
                                  {room.badge && (
                                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                                      {room.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                  <strong className="text-[#FA5C38]">€{room.priceMonth}/bln</strong>{' '}
                                  • {room.sizeSqM} m² • {room.city} • {room.availableFrom}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => setEditingRoomId(isEditing ? null : room.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 ${
                                  isEditing
                                    ? 'bg-zinc-900 text-white'
                                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                                }`}
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{isEditing ? 'Tutup' : 'Edit'}</span>
                              </button>
                              <button
                                onClick={() => handleDuplicateRoom(room)}
                                className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                                title="Duplikat Kamar"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRoom(room.id)}
                                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                                title="Hapus Kamar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isEditing && (
                            <div className="p-4 pt-3 border-t border-zinc-100 bg-zinc-50/70 space-y-3 text-xs">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Nama Kamar
                                  </label>
                                  <input
                                    type="text"
                                    value={room.name}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, { name: e.target.value })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                  />
                                </div>
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Label Badge (Opsional)
                                  </label>
                                  <input
                                    type="text"
                                    value={room.badge || ''}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, { badge: e.target.value })
                                    }
                                    placeholder="e.g. Popular in Torino"
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Harga (€ / bln)
                                  </label>
                                  <input
                                    type="number"
                                    value={room.priceMonth}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, {
                                        priceMonth: Number(e.target.value) || 0,
                                      })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                  />
                                </div>
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Luas (m²)
                                  </label>
                                  <input
                                    type="number"
                                    value={room.sizeSqM}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, {
                                        sizeSqM: Number(e.target.value) || 0,
                                      })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                  />
                                </div>
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">Kota</label>
                                  <input
                                    type="text"
                                    value={room.city}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, { city: e.target.value })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                  />
                                </div>
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Tipe Kamar
                                  </label>
                                  <select
                                    value={room.type}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, {
                                        type: e.target.value as Room['type'],
                                      })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                  >
                                    <option value="single_deluxe">Single Deluxe</option>
                                    <option value="single_standard">Single Standard</option>
                                    <option value="shared_twin">Shared Twin</option>
                                    <option value="studio">Studio Apt</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Deskripsi (English - EN)
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={room.description.EN}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, {
                                        description: {
                                          ...room.description,
                                          EN: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-medium"
                                  />
                                </div>
                                <div>
                                  <label className="font-bold text-zinc-700 block mb-1">
                                    Deskripsi (Italiano - IT)
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={room.description.IT}
                                    onChange={(e) =>
                                      handleUpdateRoom(room.id, {
                                        description: {
                                          ...room.description,
                                          IT: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-medium"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="font-bold text-zinc-700 block mb-1">
                                  Fasilitas Kamar (pisahkan dengan koma)
                                </label>
                                <input
                                  type="text"
                                  value={room.features.join(', ')}
                                  onChange={(e) =>
                                    handleUpdateRoom(room.id, {
                                      features: e.target.value
                                        .split(',')
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                    })
                                  }
                                  className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-semibold"
                                />
                              </div>

                              <div>
                                <label className="font-bold text-zinc-700 block mb-1">
                                  URL Foto Kamar (1 URL per baris)
                                </label>
                                <textarea
                                  rows={2}
                                  value={room.images.join('\n')}
                                  onChange={(e) =>
                                    handleUpdateRoom(room.id, {
                                      images: e.target.value
                                        .split('\n')
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                    })
                                  }
                                  className="w-full bg-white border border-zinc-300 rounded-xl p-2 font-mono text-[11px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: SITE CONTENT & CONTACT ================= */}
          {activeTab === 'content' && (
            <div>
              {!perms.canEditContent ? (
                renderPermissionDenied('Konten Teks & Info Kontak')
              ) : (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-black text-xl text-zinc-900">
                      Pages & Konten Halaman (EN & IT)
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Pilih seksi halaman yang ingin Anda sesuaikan teks, gambar, atau kontaknya.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-2xl border border-zinc-200">
                    {[
                      { id: 'heroV1', label: 'Hero Banner Utama' },
                      { id: 'about', label: 'About Us & Stats' },
                      { id: 'offers', label: 'Promo 15%' },
                      { id: 'services', label: 'Layanan (01-05)' },
                      { id: 'contact', label: 'Kontak & Footer' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setContentSubTab(st.id as any)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                          contentSubTab === st.id
                            ? 'bg-[#FA5C38] text-white'
                            : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {contentSubTab === 'heroV1' && (
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4 text-xs">
                      <h4 className="font-black text-sm text-zinc-900 border-b pb-2">
                        Edit Banner Utama (Hero Section)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Badge Atas (EN)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.heroV1.badge.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    badge: {
                                      ...prev.siteContent.heroV1.badge,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Badge Atas (IT)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.heroV1.badge.IT}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    badge: {
                                      ...prev.siteContent.heroV1.badge,
                                      IT: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Judul Highlight Oranye (EN)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.heroV1.titleHighlight.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    titleHighlight: {
                                      ...prev.siteContent.heroV1.titleHighlight,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Judul Highlight Oranye (IT)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.heroV1.titleHighlight.IT}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    titleHighlight: {
                                      ...prev.siteContent.heroV1.titleHighlight,
                                      IT: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Sub-Judul Baris Ke-2 (EN)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.heroV1.titleSub.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    titleSub: {
                                      ...prev.siteContent.heroV1.titleSub,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Sub-Judul Baris Ke-2 (IT)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.heroV1.titleSub.IT}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    titleSub: {
                                      ...prev.siteContent.heroV1.titleSub,
                                      IT: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Deskripsi (EN)
                          </label>
                          <textarea
                            rows={3}
                            value={cmsData.siteContent.heroV1.description.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    description: {
                                      ...prev.siteContent.heroV1.description,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Deskripsi (IT)
                          </label>
                          <textarea
                            rows={3}
                            value={cmsData.siteContent.heroV1.description.IT}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  heroV1: {
                                    ...prev.siteContent.heroV1,
                                    description: {
                                      ...prev.siteContent.heroV1.description,
                                      IT: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">
                          URL Foto Utama Hero V1
                        </label>
                        <input
                          type="text"
                          value={cmsData.siteContent.heroV1.heroImage}
                          onChange={(e) =>
                            updateCMSData((prev) => ({
                              ...prev,
                              siteContent: {
                                ...prev.siteContent,
                                heroV1: {
                                  ...prev.siteContent.heroV1,
                                  heroImage: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full border border-zinc-300 rounded-xl p-2 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  )}



                  {contentSubTab === 'about' && (
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4 text-xs">
                      <h4 className="font-black text-sm text-zinc-900 border-b pb-2">
                        Edit Seksi About Us & Angka Statistik
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Judul About (EN)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.about.heading.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  about: {
                                    ...prev.siteContent.about,
                                    heading: {
                                      ...prev.siteContent.about.heading,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Judul About (IT)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.about.heading.IT}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  about: {
                                    ...prev.siteContent.about,
                                    heading: {
                                      ...prev.siteContent.about.heading,
                                      IT: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Paragraf 1 (EN)
                          </label>
                          <textarea
                            rows={3}
                            value={cmsData.siteContent.about.paragraph1.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  about: {
                                    ...prev.siteContent.about,
                                    paragraph1: {
                                      ...prev.siteContent.about.paragraph1,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Paragraf 1 (IT)
                          </label>
                          <textarea
                            rows={3}
                            value={cmsData.siteContent.about.paragraph1.IT}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  about: {
                                    ...prev.siteContent.about,
                                    paragraph1: {
                                      ...prev.siteContent.about.paragraph1,
                                      IT: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {contentSubTab === 'offers' && (
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4 text-xs">
                      <h4 className="font-black text-sm text-zinc-900 border-b pb-2">
                        Edit Banner Promo Spesial (Last Minute Deals)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Judul Promo (EN)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.offers.titleHighlight.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  offers: {
                                    ...prev.siteContent.offers,
                                    titleHighlight: {
                                      ...prev.siteContent.offers.titleHighlight,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Sub-Judul Kuning (EN)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.offers.titleSub.EN}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  offers: {
                                    ...prev.siteContent.offers,
                                    titleSub: {
                                      ...prev.siteContent.offers.titleSub,
                                      EN: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">Kode Kupon</label>
                          <input
                            type="text"
                            value={cmsData.siteContent.offers.promoCode}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  offers: {
                                    ...prev.siteContent.offers,
                                    promoCode: e.target.value,
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-black text-[#FA5C38]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {contentSubTab === 'services' && (
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-black text-sm text-zinc-900">
                          Edit Poin Keunggulan / Services (01 - 05)
                        </h4>
                        <button
                          onClick={() => {
                            const nextNum = String(cmsData.amenities.length + 1).padStart(2, '0');
                            const newItem: AmenityItem = {
                              number: nextNum,
                              title: { EN: 'New Service Benefit', IT: 'Nuovo Servizio Incluso' },
                              desc: {
                                EN: 'Description of this student housing benefit.',
                                IT: 'Descrizione di questo servizio per gli studenti.',
                              },
                            };
                            updateCMSData((prev) => ({
                              ...prev,
                              amenities: [...prev.amenities, newItem],
                            }));
                          }}
                          className="bg-[#FA5C38] text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Tambah Poin
                        </button>
                      </div>

                      <div className="space-y-3">
                        {cmsData.amenities.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-black text-sm text-[#FA5C38]">
                                #{item.number}
                              </span>
                              <button
                                onClick={() =>
                                  updateCMSData((prev) => ({
                                    ...prev,
                                    amenities: prev.amenities.filter((_, i) => i !== idx),
                                  }))
                                }
                                className="text-red-600 hover:underline text-[11px] font-bold"
                              >
                                Hapus
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={item.title.EN}
                                onChange={(e) => {
                                  const next = [...cmsData.amenities];
                                  next[idx] = {
                                    ...next[idx],
                                    title: { ...next[idx].title, EN: e.target.value },
                                  };
                                  updateCMSData((prev) => ({ ...prev, amenities: next }));
                                }}
                                placeholder="Judul (EN)"
                                className="bg-white border border-zinc-300 rounded-lg p-2 font-bold"
                              />
                              <input
                                type="text"
                                value={item.title.IT}
                                onChange={(e) => {
                                  const next = [...cmsData.amenities];
                                  next[idx] = {
                                    ...next[idx],
                                    title: { ...next[idx].title, IT: e.target.value },
                                  };
                                  updateCMSData((prev) => ({ ...prev, amenities: next }));
                                }}
                                placeholder="Judul (IT)"
                                className="bg-white border border-zinc-300 rounded-lg p-2 font-bold"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {contentSubTab === 'contact' && (
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4 text-xs">
                      <h4 className="font-black text-sm text-zinc-900 border-b pb-2">
                        Edit Informasi Kontak, Topbar, & Footer
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Teks Lokasi Topbar Atas
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.contact.topLocationText}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  contact: {
                                    ...prev.siteContent.contact,
                                    topLocationText: e.target.value,
                                  },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Nomor Telepon
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.contact.phone}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  contact: { ...prev.siteContent.contact, phone: e.target.value },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">Alamat Email</label>
                          <input
                            type="text"
                            value={cmsData.siteContent.contact.email}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  contact: { ...prev.siteContent.contact, email: e.target.value },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-zinc-700 block mb-1">
                            Alamat Lengkap (Footer)
                          </label>
                          <input
                            type="text"
                            value={cmsData.siteContent.contact.address}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                siteContent: {
                                  ...prev.siteContent,
                                  contact: { ...prev.siteContent.contact, address: e.target.value },
                                },
                              }))
                            }
                            className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: REVIEWS, FAQ & LOCATION ================= */}
          {activeTab === 'reviews_faq' && (
            <div>
              {!perms.canManageReviewsFaq ? (
                renderPermissionDenied('Ulasan Mahasiswa, FAQ & Lokasi')
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-zinc-200">
                    <button
                      onClick={() => setReviewFaqSubTab('reviews')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                        reviewFaqSubTab === 'reviews'
                          ? 'bg-[#FA5C38] text-white'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      ⭐ Ulasan Mahasiswa ({cmsData.reviews.length})
                    </button>
                    <button
                      onClick={() => setReviewFaqSubTab('faqs')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                        reviewFaqSubTab === 'faqs'
                          ? 'bg-[#FA5C38] text-white'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      ❓ Daftar FAQ ({cmsData.faqs.length})
                    </button>
                    <button
                      onClick={() => setReviewFaqSubTab('locations')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold ${
                        reviewFaqSubTab === 'locations'
                          ? 'bg-[#FA5C38] text-white'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      📍 Lokasi & Google Maps
                    </button>
                  </div>

                  {reviewFaqSubTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-black text-base text-zinc-900">
                          Daftar Testimoni Mahasiswa
                        </h4>
                        <button
                          onClick={handleAddReview}
                          className="bg-[#FA5C38] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 shadow"
                        >
                          <Plus className="w-3.5 h-3.5" /> Tambah Review
                        </button>
                      </div>

                      {cmsData.reviews.map((rev) => {
                        const isOpen = editingReviewId === rev.id;
                        return (
                          <div
                            key={rev.id}
                            className="bg-white rounded-2xl border border-zinc-200 p-4 space-y-3 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={rev.avatar}
                                  alt={rev.studentName}
                                  className="w-9 h-9 rounded-full object-cover"
                                />
                                <div>
                                  <span className="font-extrabold text-zinc-900 block">
                                    {rev.studentName} ({rev.rating}★)
                                  </span>
                                  <span className="text-zinc-500 text-[11px]">
                                    {rev.university} • {rev.city}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => setEditingReviewId(isOpen ? null : rev.id)}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 font-bold"
                                >
                                  {isOpen ? 'Tutup' : 'Edit'}
                                </button>
                                <button
                                  onClick={() =>
                                    updateCMSData((prev) => ({
                                      ...prev,
                                      reviews: prev.reviews.filter((r) => r.id !== rev.id),
                                    }))
                                  }
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {isOpen && (
                              <div className="pt-3 border-t border-zinc-100 space-y-2.5">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <input
                                    type="text"
                                    value={rev.studentName}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        reviews: prev.reviews.map((r) =>
                                          r.id === rev.id
                                            ? { ...r, studentName: e.target.value }
                                            : r
                                        ),
                                      }))
                                    }
                                    placeholder="Nama Mahasiswa"
                                    className="border border-zinc-300 rounded-lg p-2 font-semibold"
                                  />
                                  <input
                                    type="text"
                                    value={rev.university}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        reviews: prev.reviews.map((r) =>
                                          r.id === rev.id
                                            ? { ...r, university: e.target.value }
                                            : r
                                        ),
                                      }))
                                    }
                                    placeholder="Universitas"
                                    className="border border-zinc-300 rounded-lg p-2 font-semibold"
                                  />
                                  <select
                                    value={rev.rating}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        reviews: prev.reviews.map((r) =>
                                          r.id === rev.id
                                            ? { ...r, rating: Number(e.target.value) }
                                            : r
                                        ),
                                      }))
                                    }
                                    className="border border-zinc-300 rounded-lg p-2 font-bold"
                                  >
                                    {[5, 4, 3, 2, 1].map((n) => (
                                      <option key={n} value={n}>
                                        {n} Bintang (★)
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <textarea
                                    rows={2}
                                    value={rev.comment.EN}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        reviews: prev.reviews.map((r) =>
                                          r.id === rev.id
                                            ? {
                                                ...r,
                                                comment: { ...r.comment, EN: e.target.value },
                                              }
                                            : r
                                        ),
                                      }))
                                    }
                                    placeholder="Komentar (EN)"
                                    className="border border-zinc-300 rounded-lg p-2"
                                  />
                                  <textarea
                                    rows={2}
                                    value={rev.comment.IT}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        reviews: prev.reviews.map((r) =>
                                          r.id === rev.id
                                            ? {
                                                ...r,
                                                comment: { ...r.comment, IT: e.target.value },
                                              }
                                            : r
                                        ),
                                      }))
                                    }
                                    placeholder="Komentar (IT)"
                                    className="border border-zinc-300 rounded-lg p-2"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {reviewFaqSubTab === 'faqs' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-black text-base text-zinc-900">
                          Daftar Pertanyaan Umum (FAQ)
                        </h4>
                        <button
                          onClick={handleAddFaq}
                          className="bg-[#FA5C38] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 shadow"
                        >
                          <Plus className="w-3.5 h-3.5" /> Tambah FAQ
                        </button>
                      </div>

                      {cmsData.faqs.map((faq) => {
                        const isOpen = editingFaqId === faq.id;
                        return (
                          <div
                            key={faq.id}
                            className="bg-white rounded-2xl border border-zinc-200 p-4 space-y-2.5 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-extrabold text-zinc-900">
                                {faq.question.EN}
                              </span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => setEditingFaqId(isOpen ? null : faq.id)}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 font-bold"
                                >
                                  {isOpen ? 'Tutup' : 'Edit'}
                                </button>
                                <button
                                  onClick={() =>
                                    updateCMSData((prev) => ({
                                      ...prev,
                                      faqs: prev.faqs.filter((f) => f.id !== faq.id),
                                    }))
                                  }
                                  className="p-1.5 rounded-lg bg-red-50 text-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {isOpen && (
                              <div className="pt-3 border-t border-zinc-100 space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={faq.question.EN}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        faqs: prev.faqs.map((f) =>
                                          f.id === faq.id
                                            ? {
                                                ...f,
                                                question: { ...f.question, EN: e.target.value },
                                              }
                                            : f
                                        ),
                                      }))
                                    }
                                    placeholder="Pertanyaan (EN)"
                                    className="border border-zinc-300 rounded-lg p-2 font-bold"
                                  />
                                  <input
                                    type="text"
                                    value={faq.question.IT}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        faqs: prev.faqs.map((f) =>
                                          f.id === faq.id
                                            ? {
                                                ...f,
                                                question: { ...f.question, IT: e.target.value },
                                              }
                                            : f
                                        ),
                                      }))
                                    }
                                    placeholder="Pertanyaan (IT)"
                                    className="border border-zinc-300 rounded-lg p-2 font-bold"
                                  />
                                  <textarea
                                    rows={3}
                                    value={faq.answer.EN}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        faqs: prev.faqs.map((f) =>
                                          f.id === faq.id
                                            ? { ...f, answer: { ...f.answer, EN: e.target.value } }
                                            : f
                                        ),
                                      }))
                                    }
                                    placeholder="Jawaban (EN)"
                                    className="border border-zinc-300 rounded-lg p-2"
                                  />
                                  <textarea
                                    rows={3}
                                    value={faq.answer.IT}
                                    onChange={(e) =>
                                      updateCMSData((prev) => ({
                                        ...prev,
                                        faqs: prev.faqs.map((f) =>
                                          f.id === faq.id
                                            ? { ...f, answer: { ...f.answer, IT: e.target.value } }
                                            : f
                                        ),
                                      }))
                                    }
                                    placeholder="Jawaban (IT)"
                                    className="border border-zinc-300 rounded-lg p-2"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {reviewFaqSubTab === 'locations' && (
                    <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3 text-xs">
                      <h4 className="font-black text-sm text-zinc-900 border-b pb-2">
                        Edit Lokasi Kampus & Peta Google Maps
                      </h4>
                      {cmsData.locations.map((loc, idx) => (
                        <div key={idx} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-zinc-700 block mb-1">Kota</label>
                              <input
                                type="text"
                                value={loc.city}
                                onChange={(e) => {
                                  const next = [...cmsData.locations];
                                  next[idx] = { ...next[idx], city: e.target.value };
                                  updateCMSData((prev) => ({ ...prev, locations: next }));
                                }}
                                className="w-full border border-zinc-300 rounded-xl p-2 font-bold"
                              />
                            </div>
                            <div>
                              <label className="font-bold text-zinc-700 block mb-1">
                                Alamat Lengkap
                              </label>
                              <input
                                type="text"
                                value={loc.address}
                                onChange={(e) => {
                                  const next = [...cmsData.locations];
                                  next[idx] = { ...next[idx], address: e.target.value };
                                  updateCMSData((prev) => ({ ...prev, locations: next }));
                                }}
                                className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-bold text-zinc-700 block mb-1">
                              Google Maps Embed URL
                            </label>
                            <input
                              type="text"
                              value={loc.mapEmbedUrl}
                              onChange={(e) => {
                                const next = [...cmsData.locations];
                                next[idx] = { ...next[idx], mapEmbedUrl: e.target.value };
                                updateCMSData((prev) => ({ ...prev, locations: next }));
                              }}
                              className="w-full border border-zinc-300 rounded-xl p-2 font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: THEME & VISUAL CSS ================= */}
          {activeTab === 'theme' && (
            <div>
              {!perms.canCustomizeTheme ? (
                renderPermissionDenied('Appearance / Tema & CSS Visual')
              ) : (
                <div className="space-y-5 text-xs">
                  <div>
                    <h2 className="font-black text-xl text-zinc-900">
                      Appearance / Kustomisasi Tema & CSS
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Atur palet warna website, jenis font, layout default, hingga injeksi kode CSS.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-3">
                    <h4 className="font-black text-sm text-zinc-900">
                      🎨 Preset Tema Warna Instan (1-Klik)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          name: 'Terracotta Emilia (Default)',
                          primary: '#FA5C38',
                          secondary: '#FFC83B',
                          bg: '#FFF8F0',
                        },
                        {
                          name: 'Royal Torino Blue',
                          primary: '#2563EB',
                          secondary: '#FACC15',
                          bg: '#F8FAFC',
                        },
                        {
                          name: 'Emerald Green Campus',
                          primary: '#059669',
                          secondary: '#FBBF24',
                          bg: '#F0FDF4',
                        },
                        {
                          name: 'Luxury Violet Residence',
                          primary: '#7C3AED',
                          secondary: '#F472B6',
                          bg: '#FAF5FF',
                        },
                        {
                          name: 'Crimson University',
                          primary: '#DC2626',
                          secondary: '#FDE047',
                          bg: '#FEF2F2',
                        },
                        {
                          name: 'Warm Espresso Gold',
                          primary: '#9A3412',
                          secondary: '#F59E0B',
                          bg: '#FEFCE8',
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() =>
                            updateCMSData((prev) => ({
                              ...prev,
                              theme: {
                                ...prev.theme,
                                primaryColor: preset.primary,
                                secondaryColor: preset.secondary,
                                backgroundColor: preset.bg,
                              },
                            }))
                          }
                          className="p-3 rounded-xl border border-zinc-200 hover:border-zinc-900 bg-zinc-50 flex items-center gap-2.5 text-left transition-all"
                        >
                          <div className="flex -space-x-1 shrink-0">
                            <span
                              className="w-5 h-5 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: preset.primary }}
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: preset.secondary }}
                            />
                          </div>
                          <span className="font-bold text-xs text-zinc-800">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-4">
                    <h4 className="font-black text-sm text-zinc-900">
                      Kustomisasi Warna & Tipografi
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">
                          Warna Utama (Primary Accent)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={cmsData.theme.primaryColor}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, primaryColor: e.target.value },
                              }))
                            }
                            className="w-10 h-10 rounded-lg cursor-pointer border border-zinc-300"
                          />
                          <input
                            type="text"
                            value={cmsData.theme.primaryColor}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, primaryColor: e.target.value },
                              }))
                            }
                            className="flex-1 border border-zinc-300 rounded-xl p-2 font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">
                          Warna Sekunder (Highlight)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={cmsData.theme.secondaryColor}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, secondaryColor: e.target.value },
                              }))
                            }
                            className="w-10 h-10 rounded-lg cursor-pointer border border-zinc-300"
                          />
                          <input
                            type="text"
                            value={cmsData.theme.secondaryColor}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, secondaryColor: e.target.value },
                              }))
                            }
                            className="flex-1 border border-zinc-300 rounded-xl p-2 font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">
                          Warna Background Halaman
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={cmsData.theme.backgroundColor}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, backgroundColor: e.target.value },
                              }))
                            }
                            className="w-10 h-10 rounded-lg cursor-pointer border border-zinc-300"
                          />
                          <input
                            type="text"
                            value={cmsData.theme.backgroundColor}
                            onChange={(e) =>
                              updateCMSData((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, backgroundColor: e.target.value },
                              }))
                            }
                            className="flex-1 border border-zinc-300 rounded-xl p-2 font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">
                          Jenis Font (Font Family)
                        </label>
                        <select
                          value={cmsData.theme.fontFamily}
                          onChange={(e) =>
                            updateCMSData((prev) => ({
                              ...prev,
                              theme: { ...prev.theme, fontFamily: e.target.value },
                            }))
                          }
                          className="w-full border border-zinc-300 rounded-xl p-2.5 font-semibold"
                        >
                          <option value='system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'>
                            System Modern Sans (Default)
                          </option>
                          <option value='Georgia, Cambria, "Times New Roman", Times, serif'>
                            Editorial Classic Serif
                          </option>
                          <option value='"Trebuchet MS", "Lucida Sans Unicode", sans-serif'>
                            Geometric Humanist Sans
                          </option>
                          <option value='ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'>
                            Technical Monospace
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">
                          Default Bahasa Saat Dibuka
                        </label>
                        <select
                          value={cmsData.theme.defaultLanguage}
                          onChange={(e) =>
                            updateCMSData((prev) => ({
                              ...prev,
                              theme: {
                                ...prev.theme,
                                defaultLanguage: e.target.value as 'EN' | 'IT',
                              },
                            }))
                          }
                          className="w-full border border-zinc-300 rounded-xl p-2.5 font-semibold"
                        >
                          <option value="EN">English (ENG)</option>
                          <option value="IT">Italiano (ITA)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-zinc-200 space-y-2">
                    <label className="font-black text-sm text-zinc-900 block">
                      💻 Custom CSS Tambahan (Additional CSS)
                    </label>
                    <textarea
                      rows={5}
                      value={cmsData.theme.customCss}
                      onChange={(e) =>
                        updateCMSData((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, customCss: e.target.value },
                        }))
                      }
                      placeholder={`/* Contoh: */\n/* h1 { letter-spacing: -0.04em; } */`}
                      className="w-full bg-zinc-950 text-emerald-400 font-mono text-xs p-3.5 rounded-xl border border-zinc-800 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: USERS & ROLES MANAGEMENT ================= */}
          {activeTab === 'roles' && (
            <div>
              {!perms.canManageRolesUsers ? (
                renderPermissionDenied('Users & Roles Management')
              ) : (
                <div className="space-y-6 text-xs">
                  <div>
                    <h2 className="font-black text-xl text-zinc-900">
                      Users & Roles (Manajemen Pengguna & Hak Akses)
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Tambah akun login pengguna baru, ubah password, dan atur matriks hak akses setiap Role.
                    </p>
                  </div>

                  {/* 1. USER ACCOUNTS MANAGEMENT */}
                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
                    <h4 className="font-black text-sm text-zinc-900">
                      👥 Daftar Akun Pengguna CMS ({cmsData.users.length} User)
                    </h4>

                    <div className="space-y-2.5">
                      {cmsData.users.map((u) => {
                        const isCurrent = u.id === currentUser.id;
                        const userRole = cmsData.roles.find((r) => r.id === u.roleId);
                        return (
                          <div
                            key={u.id}
                            className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                              isCurrent
                                ? 'bg-amber-50/70 border-[#FA5C38]'
                                : 'bg-zinc-50 border-zinc-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-xl text-white font-black flex items-center justify-center text-xs shrink-0"
                                style={{
                                  backgroundColor: userRole?.badgeColor || '#FA5C38',
                                }}
                              >
                                {u.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-zinc-900">{u.name}</span>
                                  <code className="bg-zinc-200/80 text-zinc-800 px-1.5 py-0.5 rounded text-[11px] font-bold">
                                    @{u.username}
                                  </code>
                                  {isCurrent && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                                      Sedang Login
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-zinc-500 block mt-0.5">
                                  {u.email} • Password: <code>{u.password || u.pin}</code>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={u.roleId}
                                onChange={(e) =>
                                  updateCMSData((prev) => ({
                                    ...prev,
                                    users: prev.users.map((usr) =>
                                      usr.id === u.id ? { ...usr, roleId: e.target.value } : usr
                                    ),
                                  }))
                                }
                                className="bg-white border border-zinc-300 rounded-xl px-2.5 py-1.5 font-bold text-xs"
                              >
                                {cmsData.roles.map((r) => (
                                  <option key={r.id} value={r.id}>
                                    Role: {r.name}
                                  </option>
                                ))}
                              </select>

                              {!isCurrent && (
                                <button
                                  onClick={() => {
                                    switchUser(u.id);
                                    showToast(`👤 Beralih sesi login ke ${u.name}`);
                                  }}
                                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                                >
                                  Login sbg User Ini
                                </button>
                              )}

                              {u.id !== 'user-1' && (
                                <button
                                  onClick={() =>
                                    updateCMSData((prev) => ({
                                      ...prev,
                                      users: prev.users.filter((usr) => usr.id !== u.id),
                                    }))
                                  }
                                  className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                                  title="Hapus User"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add New User Form */}
                    <form
                      onSubmit={handleCreateUser}
                      className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-end"
                    >
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">Username</label>
                        <input
                          type="text"
                          required
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder="e.g. sofia"
                          className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="e.g. Sofia Rossi"
                          className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">Password</label>
                        <input
                          type="text"
                          required
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          placeholder="e.g. sofia123"
                          className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">Pilih Role</label>
                        <select
                          value={newUserRole}
                          onChange={(e) => setNewUserRole(e.target.value)}
                          className="w-full border border-zinc-300 rounded-xl p-2 font-bold"
                        >
                          {cmsData.roles.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="bg-[#FA5C38] hover:bg-[#E04B28] text-white font-extrabold py-2.5 px-4 rounded-xl shadow"
                      >
                        + Tambah User
                      </button>
                    </form>
                  </div>

                  {/* 2. ROLE PERMISSIONS MATRIX */}
                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
                    <div>
                      <h4 className="font-black text-sm text-zinc-900">
                        🛡️ Matriks Izin & Role (Role-Based Access Control)
                      </h4>
                      <p className="text-zinc-500 mt-0.5">
                        Atur hak akses setiap role dengan mencentang modul yang diizinkan.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-200 text-[11px] font-black uppercase text-zinc-500">
                            <th className="py-2.5 pr-3">Nama Role</th>
                            <th className="py-2.5 px-2 text-center">Kamar</th>
                            <th className="py-2.5 px-2 text-center">Konten Teks</th>
                            <th className="py-2.5 px-2 text-center">Review & FAQ</th>
                            <th className="py-2.5 px-2 text-center">Tema & CSS</th>
                            <th className="py-2.5 px-2 text-center">Role & User</th>
                            <th className="py-2.5 pl-2 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          {cmsData.roles.map((role) => (
                            <tr key={role.id} className="hover:bg-zinc-50/80">
                              <td className="py-3 pr-3">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{ backgroundColor: role.badgeColor }}
                                  />
                                  <div>
                                    <span className="font-extrabold text-zinc-900 block">
                                      {role.name}
                                    </span>
                                    <span className="text-[10px] text-zinc-500">
                                      {role.description}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              {(
                                [
                                  'canManageRooms',
                                  'canEditContent',
                                  'canManageReviewsFaq',
                                  'canCustomizeTheme',
                                  'canManageRolesUsers',
                                ] as Array<keyof CMSRole['permissions']>
                              ).map((permKey) => (
                                <td key={permKey} className="py-3 px-2 text-center">
                                  <input
                                    type="checkbox"
                                    checked={role.permissions[permKey]}
                                    disabled={
                                      role.id === 'super_admin' &&
                                      permKey === 'canManageRolesUsers'
                                    }
                                    onChange={() =>
                                      handleToggleRolePermission(role.id, permKey)
                                    }
                                    className="w-4 h-4 accent-[#FA5C38] rounded cursor-pointer"
                                  />
                                </td>
                              ))}
                              <td className="py-3 pl-2 text-right">
                                {!role.isSystem ? (
                                  <button
                                    onClick={() => handleDeleteRole(role.id)}
                                    className="text-red-600 hover:underline font-bold text-[11px]"
                                  >
                                    Hapus
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-zinc-400 font-semibold">
                                    System
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <form
                      onSubmit={handleCreateRole}
                      className="pt-3 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end"
                    >
                      <div>
                        <label className="font-bold text-zinc-700 block mb-1">Nama Role Baru</label>
                        <input
                          type="text"
                          required
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          placeholder="e.g. Marketing Staff"
                          className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-bold text-zinc-700 block mb-1">
                          Deskripsi Singkat
                        </label>
                        <input
                          type="text"
                          value={newRoleDesc}
                          onChange={(e) => setNewRoleDesc(e.target.value)}
                          placeholder="e.g. Mengelola promo dan konten halaman"
                          className="w-full border border-zinc-300 rounded-xl p-2 font-semibold"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={newRoleColor}
                          onChange={(e) => setNewRoleColor(e.target.value)}
                          className="w-9 h-9 rounded-lg border border-zinc-300 cursor-pointer shrink-0"
                        />
                        <button
                          type="submit"
                          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold py-2.5 px-3 rounded-xl"
                        >
                          + Buat Role
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
