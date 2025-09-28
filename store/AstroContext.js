import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getStoredData, storeData } from '../services/StorageService';

const AstroContext = createContext();

const initialState = {
  selectedSign: 'aries',
  horoscope: null,
  journalEntries: {},
  loading: false,
  error: null,
};

const astroReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SELECTED_SIGN':
      return { ...state, selectedSign: action.payload };
    case 'SET_HOROSCOPE':
      return { ...state, horoscope: action.payload, loading: false, error: null };
    case 'SET_JOURNAL_ENTRIES':
      return { ...state, journalEntries: action.payload };
    case 'ADD_JOURNAL_ENTRY':
      const updatedEntries = {
        ...state.journalEntries,
        [action.payload.date]: action.payload.content
      };
      return { ...state, journalEntries: updatedEntries };
    default:
      return state;
  }
};

export const AstroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(astroReducer, initialState);

  // Load stored data on app start
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedSign = await getStoredData('selectedSign');
      const storedEntries = await getStoredData('journalEntries');
      
      if (storedSign) {
        dispatch({ type: 'SET_SELECTED_SIGN', payload: storedSign });
      }
      if (storedEntries) {
        dispatch({ type: 'SET_JOURNAL_ENTRIES', payload: storedEntries });
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const setSelectedSign = async (sign) => {
    dispatch({ type: 'SET_SELECTED_SIGN', payload: sign });
    await storeData('selectedSign', sign);
  };

  const addJournalEntry = async (date, content) => {
    dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: { date, content } });
    const updatedEntries = { ...state.journalEntries, [date]: content };
    await storeData('journalEntries', updatedEntries);
  };

  const value = {
    ...state,
    setSelectedSign,
    addJournalEntry,
    dispatch,
  };

  return (
    <AstroContext.Provider value={value}>
      {children}
    </AstroContext.Provider>
  );
};

export const useAstro = () => {
  const context = useContext(AstroContext);
  if (!context) {
    throw new Error('useAstro must be used within an AstroProvider');
  }
  return context;
};