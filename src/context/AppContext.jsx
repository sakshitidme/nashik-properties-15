import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('np15_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare State (Max 4 properties)
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('np15_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Schedule Visit Modal
  const [scheduleModal, setScheduleModal] = useState({
    isOpen: false,
    property: null
  });

  // Callback Modal
  const [callbackModal, setCallbackModal] = useState({
    isOpen: false,
    property: null
  });

  // Quick Toast Notification
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' | 'info' | 'warning'
  });

  // Recently Viewed Properties
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('np15_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist Compare
  useEffect(() => {
    localStorage.setItem('np15_compare', JSON.stringify(compareList));
  }, [compareList]);

  // Toast Trigger
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Toggle Favorite
  const toggleFavorite = (property) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        showToast(`Removed "${property.title}" from Favorites`, 'info');
        return prev.filter(item => item.id !== property.id);
      } else {
        showToast(`Added "${property.title}" to Favorites`, 'success');
        return [...prev, property];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  // Toggle Compare
  const toggleCompare = (property) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        showToast(`Removed "${property.title}" from Comparison`, 'info');
        return prev.filter(item => item.id !== property.id);
      } else {
        if (prev.length >= 4) {
          showToast(`You can compare maximum 4 properties at a time`, 'warning');
          return prev;
        }
        showToast(`Added "${property.title}" to Compare list`, 'success');
        return [...prev, property];
      }
    });
  };

  const isCompared = (id) => {
    return compareList.some(item => item.id === id);
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(item => item.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Track Recently Viewed
  const addToRecentlyViewed = (property) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== property.id);
      return [property, ...filtered].slice(0, 6);
    });
  };

  // Open/Close Modals
  const openScheduleModal = (property = null) => {
    setScheduleModal({ isOpen: true, property });
  };
  const closeScheduleModal = () => {
    setScheduleModal({ isOpen: false, property: null });
  };

  const openCallbackModal = (property = null) => {
    setCallbackModal({ isOpen: true, property });
  };
  const closeCallbackModal = () => {
    setCallbackModal({ isOpen: false, property: null });
  };

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      compareList,
      toggleCompare,
      isCompared,
      removeFromCompare,
      clearCompare,
      scheduleModal,
      openScheduleModal,
      closeScheduleModal,
      callbackModal,
      openCallbackModal,
      closeCallbackModal,
      toast,
      showToast,
      recentlyViewed,
      addToRecentlyViewed
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
