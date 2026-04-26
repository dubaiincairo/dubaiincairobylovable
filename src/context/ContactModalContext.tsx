import { createContext, useContext, useState, ReactNode } from "react";

type ContactModalContextType = {
  isOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  openContactModal: () => {},
  closeContactModal: () => {},
});

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        openContactModal: () => setIsOpen(true),
        closeContactModal: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => useContext(ContactModalContext);
