export const zodiacSigns = [
    { label: 'Aries', value: 'aries', dateRange: 'Mar 21 - Apr 19', emoji: '♈' },
    { label: 'Taurus', value: 'taurus', dateRange: 'Apr 20 - May 20', emoji: '♉' },
    { label: 'Gemini', value: 'gemini', dateRange: 'May 21 - Jun 20', emoji: '♊' },
    { label: 'Cancer', value: 'cancer', dateRange: 'Jun 21 - Jul 22', emoji: '♋' },
    { label: 'Leo', value: 'leo', dateRange: 'Jul 23 - Aug 22', emoji: '♌' },
    { label: 'Virgo', value: 'virgo', dateRange: 'Aug 23 - Sep 22', emoji: '♍' },
    { label: 'Libra', value: 'libra', dateRange: 'Sep 23 - Oct 22', emoji: '♎' },
    { label: 'Scorpio', value: 'scorpio', dateRange: 'Oct 23 - Nov 21', emoji: '♏' },
    { label: 'Sagittarius', value: 'sagittarius', dateRange: 'Nov 22 - Dec 21', emoji: '♐' },
    { label: 'Capricorn', value: 'capricorn', dateRange: 'Dec 22 - Jan 19', emoji: '♑' },
    { label: 'Aquarius', value: 'aquarius', dateRange: 'Jan 20 - Feb 18', emoji: '♒' },
    { label: 'Pisces', value: 'pisces', dateRange: 'Feb 19 - Mar 20', emoji: '♓' },
  ];
  
  export const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  export const getTodayKey = () => {
    return new Date().toISOString().split('T')[0];
  };