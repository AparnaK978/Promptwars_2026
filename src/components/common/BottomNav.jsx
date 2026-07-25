import React from 'react';
import { Home, Activity, Bot, BookOpen, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useApp();

  const TABS = [
    { id: 'home', label: t('homeTab'), icon: Home },
    { id: 'recovery', label: t('recoveryTab'), icon: Activity },
    { id: 'ai', label: t('aiTab'), icon: Bot },
    { id: 'resources', label: t('resourcesTab'), icon: BookOpen },
    { id: 'profile', label: t('profileTab'), icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-teal-400 font-bold bg-teal-500/10 border border-teal-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={tab.label}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
