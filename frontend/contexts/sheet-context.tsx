'use client'
import {createContext, ReactNode, useContext, useState} from "react";
import {Sheet} from "@/components/ui/sheet";

interface SheetContextType {
    openSheet: (content: ReactNode) => void;
    closeSheet: () => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const useSheet = () => {
    const context = useContext(SheetContext);
    if (!context) {
        throw new Error("useSheet must be used within a SheetProvider");
    }
    return context;
};

export const SheetProvider = ({children}: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);

    const openSheet = (content: ReactNode) => {
        setContent(content);
        setIsOpen(true);
    };

    const closeSheet = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <SheetContext.Provider value={{openSheet, closeSheet}}>
            {children}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                {content}
            </Sheet>
        </SheetContext.Provider>
    );
};