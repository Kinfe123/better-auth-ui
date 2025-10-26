'use client';

import * as React from 'react';
import { CommandMenu } from './command-menu';

interface CommandPaletteContextType {
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextType | undefined>(undefined);

export function useCommandPalette() {
  const context = React.useContext(CommandPaletteContext);
  if (context === undefined) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  return context;
}

export const CommandPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <CommandPaletteContext.Provider value={{ setOpen }}>
            {children}
            <CommandMenu open={open} onOpenChange={setOpen} />
        </CommandPaletteContext.Provider>
    );
};