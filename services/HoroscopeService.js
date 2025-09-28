import { zodiacSigns } from '../utils/constants';

// Mock horoscope data for offline functionality
const mockHoroscopes = {
  aries: "Today brings dynamic energy and new opportunities. Trust your instincts and take bold action toward your goals.",
  taurus: "Patience and persistence will serve you well today. Focus on building solid foundations for future success.",
  gemini: "Communication is key today. Share your ideas and connect with others to expand your horizons.",
  cancer: "Trust your intuition and nurture your emotional well-being. Home and family take priority today.",
  leo: "Your natural charisma shines bright today. Step into the spotlight and share your creative talents.",
  virgo: "Attention to detail and organization will lead to productive outcomes. Focus on practical matters.",
  libra: "Seek balance and harmony in all your relationships today. Your diplomatic skills are highlighted.",
  scorpio: "Deep transformation is possible today. Embrace change and let go of what no longer serves you.",
  sagittarius: "Adventure and learning call to you today. Expand your knowledge and explore new territories.",
  capricorn: "Your ambition and discipline will help you climb new heights. Focus on long-term goals.",
  aquarius: "Innovation and humanitarian efforts take center stage. Think outside the box today.",
  pisces: "Your intuition and creativity are heightened today. Trust your dreams and artistic vision."
};

export const fetchHoroscope = async (sign = 'aries', day = 'today') => {
  try {
    // Try to fetch from real API first
    const response = await fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=${day}`, {
      method: 'POST',
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        description: data.description,
        compatibility: data.compatibility,
        mood: data.mood,
        color: data.color,
        luckyNumber: data.lucky_number,
        luckyTime: data.lucky_time,
        date: data.date_range,
      };
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    console.warn('Using mock horoscope data:', error.message);
    // Fallback to mock data for offline functionality
    return {
      description: mockHoroscopes[sign] || mockHoroscopes.aries,
      compatibility: zodiacSigns.find(s => s.value !== sign)?.label || 'Virgo',
      mood: 'Optimistic',
      color: 'Blue',
      luckyNumber: Math.floor(Math.random() * 50) + 1,
      luckyTime: '2pm - 4pm',
      date: zodiacSigns.find(s => s.value === sign)?.dateRange || 'Mar 21 - Apr 19',
    };
  }
};