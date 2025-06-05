
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'yo' | 'ha' | 'ig';

interface Translation {
  [key: string]: string | Translation;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  en: {
    common: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      login: 'Sign In',
      register: 'Get Started',
      search: 'Search services...',
      location: 'Lagos, NG',
      bookNow: 'Book Now',
      viewAll: 'View All',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      close: 'Close'
    },
    home: {
      hero: {
        title: 'Find Quality Services Near You',
        subtitle: 'Connect with verified service providers in Lagos and beyond',
        cta: 'Explore Services'
      },
      categories: {
        title: 'Popular Categories',
        beauty: 'Beauty & Wellness',
        home: 'Home Services',
        tech: 'Tech Support',
        health: 'Healthcare',
        education: 'Education',
        events: 'Events'
      },
      featured: {
        title: 'Featured Services',
        subtitle: 'Top-rated services in your area'
      }
    },
    dashboard: {
      welcome: 'Welcome back',
      overview: 'Overview',
      bookings: 'Bookings',
      earnings: 'Earnings',
      analytics: 'Analytics',
      settings: 'Settings',
      totalServices: 'Total Services',
      totalBookings: 'Total Bookings',
      monthlyEarnings: 'Monthly Earnings',
      averageRating: 'Average Rating'
    }
  },
  yo: {
    common: {
      home: 'Ile',
      services: 'Awọn iṣẹ',
      about: 'Nipa wa',
      contact: 'Kan si wa',
      login: 'Wọle',
      register: 'Bẹrẹ',
      search: 'Wa awọn iṣẹ...',
      location: 'Eko, Naijiria',
      bookNow: 'Gba ni bayi',
      viewAll: 'Wo gbogbo',
      loading: 'N gbe...',
      error: 'Aṣiṣe',
      success: 'Aṣeyọri',
      cancel: 'Fagilee',
      save: 'Fi pamọ',
      edit: 'Ṣatunṣe',
      delete: 'Pa rẹ',
      confirm: 'Jẹrisi',
      back: 'Pada',
      next: 'Tẹle',
      submit: 'Fi silẹ',
      close: 'Pa'
    },
    home: {
      hero: {
        title: 'Wa awọn iṣẹ to dara nitosi ọ',
        subtitle: 'Sopọ pẹlu awọn olupese iṣẹ ti a ti ṣayẹwo ni Eko ati kaakiri',
        cta: 'Ṣawari awọn iṣẹ'
      },
      categories: {
        title: 'Awọn ẹka olokiki',
        beauty: 'Ẹwa & Ilera',
        home: 'Awọn iṣẹ ile',
        tech: 'Atilẹyin imọ-ẹrọ',
        health: 'Ilera',
        education: 'Ẹkọ',
        events: 'Awọn iṣẹlẹ'
      },
      featured: {
        title: 'Awọn iṣẹ pataki',
        subtitle: 'Awọn iṣẹ ti o ni iwọn giga julọ ni agbegbe rẹ'
      }
    },
    dashboard: {
      welcome: 'Kaabo pada',
      overview: 'Akopọ',
      bookings: 'Awọn ifiṣura',
      earnings: 'Awọn ere',
      analytics: 'Itupalẹ',
      settings: 'Awọn eto',
      totalServices: 'Awọn iṣẹ lapapọ',
      totalBookings: 'Awọn ifiṣura lapapọ',
      monthlyEarnings: 'Awọn ere oṣu',
      averageRating: 'Iwọn aropin'
    }
  },
  ha: {
    common: {
      home: 'Gida',
      services: 'Ayyuka',
      about: 'Game da mu',
      contact: 'Tuntube mu',
      login: 'Shiga',
      register: 'Fara',
      search: 'Nemo ayyuka...',
      location: 'Lagos, Najeriya',
      bookNow: 'Yi yanzu',
      viewAll: 'Duba duka',
      loading: 'Ana lodi...',
      error: 'Kuskure',
      success: 'Nasara',
      cancel: 'Soke',
      save: 'Ajiye',
      edit: 'Gyara',
      delete: 'Share',
      confirm: 'Tabbatar',
      back: 'Koma baya',
      next: 'Na gaba',
      submit: 'Aika',
      close: 'Rufe'
    },
    home: {
      hero: {
        title: 'Nemo ingantattun ayyuka kusa da ku',
        subtitle: 'Haɗu da masu ba da ayyuka da aka tabbatar a Lagos da sauransu',
        cta: 'Binciko ayyuka'
      },
      categories: {
        title: 'Sanannun nau\'oci',
        beauty: 'Kyau da lafiya',
        home: 'Ayyukan gida',
        tech: 'Tallafin fasaha',
        health: 'Kiwon lafiya',
        education: 'Ilimi',
        events: 'Abubuwan da suka faru'
      },
      featured: {
        title: 'Ayyuka masu dacewa',
        subtitle: 'Ayyuka mafi girma a yankinku'
      }
    },
    dashboard: {
      welcome: 'Maraba da komowa',
      overview: 'Bayyani',
      bookings: 'Ajiye',
      earnings: 'Riba',
      analytics: 'Bincike',
      settings: 'Saiti',
      totalServices: 'Jimlar ayyuka',
      totalBookings: 'Jimlar ajiye',
      monthlyEarnings: 'Ribar wata',
      averageRating: 'Matsakaicin kima'
    }
  },
  ig: {
    common: {
      home: 'Ụlọ',
      services: 'Ọrụ',
      about: 'Maka anyị',
      contact: 'Kpọtụrụ anyị',
      login: 'Banye',
      register: 'Malite',
      search: 'Chọọ ọrụ...',
      location: 'Lagos, Naịjirịa',
      bookNow: 'Debe ugbu a',
      viewAll: 'Lee niile',
      loading: 'Na-ebu...',
      error: 'Njehie',
      success: 'Ihe ịga nke ọma',
      cancel: 'Kagbuo',
      save: 'Chekwaa',
      edit: 'Dezie',
      delete: 'Hichapụ',
      confirm: 'Kwenye',
      back: 'Laghachi azụ',
      next: 'Ọzọ',
      submit: 'Zipu',
      close: 'Mechie'
    },
    home: {
      hero: {
        title: 'Chọta ọrụ dị mma n\'akụkụ gị',
        subtitle: 'Jikọọ na ndị na-enye ọrụ akwadoro na Lagos na ebe ndị ọzọ',
        cta: 'Nyochaa ọrụ'
      },
      categories: {
        title: 'Ụdị ndị ama ama',
        beauty: 'Ịma mma na ahụ ike',
        home: 'Ọrụ ụlọ',
        tech: 'Nkwado teknụzụ',
        health: 'Nlekọta ahụ ike',
        education: 'Agụmakwụkwọ',
        events: 'Ihe omume'
      },
      featured: {
        title: 'Ọrụ pụrụ iche',
        subtitle: 'Ọrụ ndị kasị mma n\'ógbè gị'
      }
    },
    dashboard: {
      welcome: 'Nnọọ nlaghachi',
      overview: 'Nlele',
      bookings: 'Ndebe',
      earnings: 'Ego enwetara',
      analytics: 'Nyocha',
      settings: 'Ntọala',
      totalServices: 'Ngụkọta ọrụ',
      totalBookings: 'Ngụkọta ndebe',
      monthlyEarnings: 'Ego ọnwa',
      averageRating: 'Nkọwa nkezi'
    }
  }
};

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
