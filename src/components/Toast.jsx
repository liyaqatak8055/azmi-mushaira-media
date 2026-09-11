import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="system-toast-message active" id="platformToast">
      {toastMessage}
    </div>
  );
}
