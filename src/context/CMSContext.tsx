import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CMSData, CMSRole, CMSUser } from '../types';
import { DEFAULT_CMS_DATA } from '../data/mockData';

interface CMSContextType {
  cmsData: CMSData;
  updateCMSData: (updater: (prev: CMSData) => CMSData) => void;
  saveNow: (overrideData?: CMSData) => Promise<boolean>;
  resetToDefault: () => Promise<void>;
  isSaving: boolean;
  lastSavedAt: string | null;
  serverConnected: boolean;
  isAuthenticated: boolean;
  currentUser: CMSUser;
  currentRole: CMSRole;
  login: (identifier: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  activeRoute: 'site' | 'admin';
  navigateTo: (route: 'site' | 'admin') => void;
  isCMSOpen: boolean;
  setIsCMSOpen: (open: boolean) => void;
  cmsDockMode: 'modal' | 'split';
  setCmsDockMode: (mode: 'modal' | 'split') => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY = 'studentato_emilia_cms_backup_v1';
const AUTH_SESSION_KEY = 'studentato_emilia_cms_auth_user_v1';

function detectInitialRoute(): 'site' | 'admin' {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (
    path.startsWith('/admin') ||
    path.startsWith('/wp-admin') ||
    path.startsWith('/wp-login') ||
    hash === '#admin' ||
    hash === '#wp-admin'
  ) {
    return 'admin';
  }
  return 'site';
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData>(DEFAULT_CMS_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [serverConnected, setServerConnected] = useState(true);

  const [authenticatedUserId, setAuthenticatedUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AUTH_SESSION_KEY);
    } catch {
      return null;
    }
  });

  const [activeRoute, setActiveRoute] = useState<'site' | 'admin'>(detectInitialRoute);
  const [cmsDockMode, setCmsDockMode] = useState<'modal' | 'split'>('modal');

  const saveTimeoutRef = useRef<number | null>(null);

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(detectInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (route: 'site' | 'admin') => {
    setActiveRoute(route);
    try {
      const targetUrl = route === 'admin' ? '/admin' : '/';
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback to hash if history.pushState is restricted
      window.location.hash = route === 'admin' ? '#admin' : '';
    }
  };

  // Load initial CMS data from server (/api/cms)
  useEffect(() => {
    async function loadCMS() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const serverData = await res.json();
          // Ensure users have username/password fields upgraded
          const mergedUsers: CMSUser[] = (serverData.users || DEFAULT_CMS_DATA.users).map(
            (u: CMSUser, idx: number) => {
              const fallback = DEFAULT_CMS_DATA.users[idx] || DEFAULT_CMS_DATA.users[0];
              return {
                ...fallback,
                ...u,
                username: u.username || fallback?.username || `user${idx + 1}`,
                password: u.password || u.pin || fallback?.password || 'admin123',
              };
            }
          );

          const merged: CMSData = {
            ...DEFAULT_CMS_DATA,
            ...serverData,
            users: mergedUsers,
            siteContent: {
              ...DEFAULT_CMS_DATA.siteContent,
              ...(serverData.siteContent || {}),
            },
            theme: {
              ...DEFAULT_CMS_DATA.theme,
              ...(serverData.theme || {}),
            },
          };
          setCmsData(merged);
          setServerConnected(true);
          setLastSavedAt(new Date().toLocaleTimeString());
          return;
        } else if (res.status === 404) {
          await saveToServerInternal(DEFAULT_CMS_DATA);
          return;
        }
      } catch (err) {
        console.warn('CMS server fallback to localStorage:', err);
        setServerConnected(false);
      }

      try {
        const savedLocal = localStorage.getItem(STORAGE_KEY);
        if (savedLocal) {
          const parsed = JSON.parse(savedLocal);
          setCmsData({ ...DEFAULT_CMS_DATA, ...parsed });
        }
      } catch (e) {
        console.error(e);
      }
    }

    loadCMS();
  }, []);

  // Inject dynamic theme & custom CSS variables into document head
  useEffect(() => {
    const styleId = 'cms-dynamic-theme-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    const {
      primaryColor,
      secondaryColor,
      backgroundColor,
      topbarColor,
      footerColor,
      fontFamily,
      customCss,
    } = cmsData.theme;

    styleEl.textContent = `
      :root {
        --cms-primary: ${primaryColor};
        --cms-secondary: ${secondaryColor};
        --cms-bg: ${backgroundColor};
        --cms-topbar: ${topbarColor};
        --cms-footer: ${footerColor};
        --cms-font: ${fontFamily};
      }
      html, body {
        font-family: var(--cms-font) !important;
      }
      /* Exact class token matches - safe from matching after:*, hover:*, focus:*, etc. */
      .bg-\[\#FA5C38\], .bg-\[\#E04D26\], [class~="bg-[#FA5C38]"], [class~="bg-[#E04D26]"] {
        background-color: var(--cms-primary) !important;
      }
      .text-\[\#FA5C38\], .text-\[\#E04D26\], [class~="text-[#FA5C38]"], [class~="text-[#E04D26]"] {
        color: var(--cms-primary) !important;
      }
      .border-\[\#FA5C38\], .border-\[\#E04D26\], [class~="border-[#FA5C38]"], [class~="border-[#E04D26]"] {
        border-color: var(--cms-primary) !important;
      }
      .hover\:bg-\[\#FA5C38\]:hover, .hover\:bg-\[\#E04D26\]:hover, [class~="hover:bg-[#FA5C38]"]:hover, [class~="hover:bg-[#E04D26]"]:hover {
        background-color: var(--cms-primary) !important;
      }
      .hover\:text-\[\#FA5C38\]:hover, .hover\:text-\[\#E04D26\]:hover, [class~="hover:text-[#FA5C38]"]:hover, [class~="hover:text-[#E04D26]"]:hover {
        color: var(--cms-primary) !important;
      }

      .bg-\[\#FFC83B\], .bg-\[\#D99426\], [class~="bg-[#FFC83B]"], [class~="bg-[#D99426]"] {
        background-color: var(--cms-secondary) !important;
      }
      .text-\[\#FFC83B\], .text-\[\#D99426\], [class~="text-[#FFC83B]"], [class~="text-[#D99426]"] {
        color: var(--cms-secondary) !important;
      }
      .border-\[\#FFC83B\], .border-\[\#D99426\], [class~="border-[#FFC83B]"], [class~="border-[#D99426]"] {
        border-color: var(--cms-secondary) !important;
      }

      .bg-\[\#FFF8F0\], .bg-\[\#FAF8F5\], [class~="bg-[#FFF8F0]"], [class~="bg-[#FAF8F5]"] {
        background-color: var(--cms-bg) !important;
      }
      .bg-\[\#18181B\], [class~="bg-[#18181B]"] {
        background-color: var(--cms-topbar) !important;
      }
      .bg-\[\#09090B\], [class~="bg-[#09090B]"] {
        background-color: var(--cms-footer) !important;
      }
      ${customCss || ''}
    `;
  }, [cmsData.theme]);

  const saveToServerInternal = async (dataToSave: CMSData): Promise<boolean> => {
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore
    }

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });
      if (res.ok) {
        setServerConnected(true);
        setLastSavedAt(new Date().toLocaleTimeString());
        setIsSaving(false);
        return true;
      }
    } catch {
      setServerConnected(false);
    }
    setLastSavedAt(new Date().toLocaleTimeString());
    setIsSaving(false);
    return false;
  };

  const updateCMSData = (updater: (prev: CMSData) => CMSData) => {
    setCmsData((prev) => {
      const next = updater(prev);
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = window.setTimeout(() => {
        saveToServerInternal(next);
      }, 350);
      return next;
    });
  };

  const saveNow = async (overrideData?: CMSData): Promise<boolean> => {
    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }
    return await saveToServerInternal(overrideData || cmsData);
  };

  const resetToDefault = async () => {
    try {
      await fetch('/api/cms', { method: 'DELETE' });
    } catch {
      // ignore
    }
    localStorage.removeItem(STORAGE_KEY);
    setCmsData(DEFAULT_CMS_DATA);
    await saveToServerInternal(DEFAULT_CMS_DATA);
  };

  const login = (identifier: string, password: string): { ok: boolean; error?: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    const matchedUser = cmsData.users.find(
      (u) =>
        (u.username?.toLowerCase() === cleanId ||
          u.email.toLowerCase() === cleanId ||
          u.name.toLowerCase() === cleanId) &&
        (u.password === cleanPass || u.pin === cleanPass)
    );

    if (!matchedUser) {
      return {
        ok: false,
        error: 'Username/Email atau Password tidak sesuai. Silakan cek kembali.',
      };
    }

    if (!matchedUser.active) {
      return {
        ok: false,
        error: 'Akun ini sedang dinonaktifkan oleh Administrator.',
      };
    }

    setAuthenticatedUserId(matchedUser.id);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, matchedUser.id);
    } catch {
      // ignore
    }
    return { ok: true };
  };

  const logout = () => {
    setAuthenticatedUserId(null);
    try {
      localStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      // ignore
    }
  };

  const switchUser = (userId: string) => {
    setAuthenticatedUserId(userId);
    try {
      localStorage.setItem(AUTH_SESSION_KEY, userId);
    } catch {
      // ignore
    }
  };

  const currentUser =
    cmsData.users.find((u) => u.id === authenticatedUserId) ||
    cmsData.users[0] ||
    DEFAULT_CMS_DATA.users[0];

  const currentRole =
    cmsData.roles.find((r) => r.id === currentUser.roleId) ||
    cmsData.roles[0] ||
    DEFAULT_CMS_DATA.roles[0];

  const isAuthenticated = Boolean(
    authenticatedUserId && cmsData.users.some((u) => u.id === authenticatedUserId)
  );

  return (
    <CMSContext.Provider
      value={{
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
        activeRoute,
        navigateTo,
        isCMSOpen: activeRoute === 'admin',
        setIsCMSOpen: (open: boolean) => navigateTo(open ? 'admin' : 'site'),
        cmsDockMode,
        setCmsDockMode,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return ctx;
};
