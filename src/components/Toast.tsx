import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-forest dark:bg-dark-forest text-white px-5 py-3 rounded-2xl shadow-lift text-sm font-body">
        {message}
      </div>
    </div>
  );
}
