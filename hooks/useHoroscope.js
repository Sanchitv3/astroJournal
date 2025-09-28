import { useState, useEffect } from 'react';
import { fetchHoroscope } from '../services/HoroscopeService';

export const useHoroscope = (sign) => {
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHoroscope = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHoroscope(sign);
      setHoroscope(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sign) {
      loadHoroscope();
    }
  }, [sign]);

  return { horoscope, loading, error, refetch: loadHoroscope };
};