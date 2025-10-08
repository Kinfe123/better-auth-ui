// components/tab-context.tsx
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const tabOptions = [
  { value: 'all', label: 'All' },
  { value: 'credential', label: 'Credential' },
  { value: 'social-providers', label: 'Social Providers' },
  { value: 'organization', label: 'Organization' },
  { value: 'plugins', label: 'Plugins' },
  { value: 'others', label: 'Others' },
];

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = React.createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTabInternal] = React.useState('all');

  const setActiveTab = (tab: string) => {
    setActiveTabInternal(tab);
    // Update URL for deep linking (e.g., /credential)
    const newPath = tab === 'all' ? pathname.split('/')[1] || '/' : `/${tab}`;
    router.replace(newPath, { scroll: false });
  };

  // Sync from URL on load (e.g., /credential -> activeTab = 'credential')
  React.useEffect(() => {
    const currentPath = pathname.split('/')[1] || 'all';
    if (tabOptions.some((opt) => opt.value === currentPath)) {
      setActiveTabInternal(currentPath);
    }
  }, [pathname]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = React.useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
}