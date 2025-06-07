
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
      close: 'Close',
      time: {
        minutesAgo: 'm ago',
        hoursAgo: 'h ago',
        daysAgo: 'd ago'
      }
    },
    navigation: {
      addService: 'Add Service',
      adminDashboard: 'Admin Dashboard',
      signOut: 'Sign Out',
      theme: 'Theme'
    },
    notifications: {
      title: 'Notifications',
      empty: 'No notifications yet',
      new: 'New',
      markAllRead: 'Mark All Read',
      allRead: 'All notifications marked as read',
      allReadDescription: 'Your notification center has been updated.',
      booking: {
        newRequest: 'New Booking Request',
        newRequestMessage: 'John Doe has requested a house cleaning service for tomorrow at 2 PM'
      },
      payment: {
        received: 'Payment Received',
        receivedMessage: 'You received ₦15,000 for cleaning service completed on Jan 14'
      },
      message: {
        new: 'New Message',
        newMessage: 'Sarah Johnson sent you a message about the upcoming appointment',
        newCustomerMessage: 'You have received a new message from a customer'
      },
      review: {
        new: 'New Review',
        newReview: 'Mary Smith left a 5-star review for your recent service'
      },
      system: {
        verification: 'Profile Verification',
        verificationComplete: 'Your profile verification is complete! You can now receive more bookings'
      },
      actions: {
        accept: 'Accept',
        decline: 'Decline',
        viewDetails: 'View Details',
        bookingAccepted: 'Booking Accepted',
        bookingAcceptedDescription: 'The booking request has been accepted.',
        bookingDeclined: 'Booking Declined',
        bookingDeclinedDescription: 'The booking request has been declined.',
        redirecting: 'Redirecting',
        redirectingDescription: 'Opening the relevant page...'
      }
    },
    home: {
      hero: {
        title: 'Find trusted local service providers',
        subtitle: 'Connect with verified professionals in your area. From cleaning to tech support, book quality services with confidence.',
        searchPlaceholder: 'What service do you need?',
        searchButton: 'Search Services'
      },
      recommendations: {
        title: 'Recommended for You',
        subtitle: 'Based on your preferences and location'
      },
      categories: {
        title: 'Popular Service Categories',
        subtitle: 'Browse services by category to find what you need',
        cleaning: 'Cleaning',
        beauty: 'Barber & Beauty',
        tech: 'Tech Support',
        events: 'Event Planning',
        repair: 'Home Repair',
        fitness: 'Fitness Training',
        photography: 'Photography',
        tutoring: 'Tutoring',
        providers: 'providers'
      },
      featured: {
        title: 'Featured Services',
        subtitle: 'Top-rated services from verified providers'
      },
      provider: {
        title: 'Ready to start earning?',
        subtitle: 'Join thousands of service providers already earning on Quïp. Create your profile and start getting bookings today.',
        becomeProvider: 'Become a Provider',
        learnMore: 'Learn More'
      },
      stats: {
        activeProviders: 'Active Providers',
        servicesCompleted: 'Services Completed',
        averageRating: 'Average Rating',
        serviceCategories: 'Service Categories'
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
      close: 'Pa',
      time: {
        minutesAgo: 'iṣẹju sẹhin',
        hoursAgo: 'wakati sẹhin',
        daysAgo: 'ọjọ sẹhin'
      }
    },
    navigation: {
      addService: 'Fi iṣẹ kun',
      adminDashboard: 'Pẹpẹ alakoso',
      signOut: 'Jade',
      theme: 'Akopọ'
    },
    notifications: {
      title: 'Awọn iwifun',
      empty: 'Ko si iwifun sibẹ',
      new: 'Tuntun',
      markAllRead: 'Samisi gbogbo bi ti ka',
      allRead: 'Gbogbo awọn iwifun ti samisi bi ti ka',
      allReadDescription: 'Ile-iṣẹ iwifun rẹ ti di imudojuiwọn.',
      booking: {
        newRequest: 'Ibeere ifiṣura tuntun',
        newRequestMessage: 'John Doe ti beere iṣẹ mimọ ile fun ọla ni 2 PM'
      },
      payment: {
        received: 'Owo ti gba',
        receivedMessage: 'O gba ₦15,000 fun iṣẹ mimọ ti o pari ni Jan 14'
      },
      message: {
        new: 'Ifiranṣẹ tuntun',
        newMessage: 'Sarah Johnson fi ifiranṣẹ ranṣẹ si ọ nipa ipade ti nbọ',
        newCustomerMessage: 'O ti gba ifiranṣẹ tuntun lati ọdọ onibara kan'
      },
      review: {
        new: 'Atunwo tuntun',
        newReview: 'Mary Smith fi atunwo irawo marun silẹ fun iṣẹ rẹ to ṣẹṣẹ'
      },
      system: {
        verification: 'Ijẹrisi profaili',
        verificationComplete: 'Ijẹrisi profaili rẹ ti pari! O le gba awọn ifiṣura diẹ sii bayi'
      },
      actions: {
        accept: 'Gba',
        decline: 'Kọ',
        viewDetails: 'Wo alaye',
        bookingAccepted: 'Ifiṣura ti gba',
        bookingAcceptedDescription: 'Ibeere ifiṣura ti gba.',
        bookingDeclined: 'Ifiṣura ti kọ',
        bookingDeclinedDescription: 'Ibeere ifiṣura ti kọ.',
        redirecting: 'N tọ sọna',
        redirectingDescription: 'N ṣi oju-iwe ti o yẹ...'
      }
    },
    home: {
      hero: {
        title: 'Wa awọn olupese iṣẹ ti o gbẹkẹle nitosi',
        subtitle: 'Sopọ pẹlu awọn alamọdaju ti a ti ṣayẹwo ni agbegbe rẹ. Lati mimọ si atilẹyin imọ-ẹrọ, gba awọn iṣẹ didara pẹlu igboya.',
        searchPlaceholder: 'Kini iṣẹ ti o nilo?',
        searchButton: 'Wa awọn iṣẹ'
      },
      recommendations: {
        title: 'Ti a ṣe iṣeduro fun ọ',
        subtitle: 'Da lori awọn ayanfẹ rẹ ati ipo rẹ'
      },
      categories: {
        title: 'Awọn ẹka olokiki iṣẹ',
        subtitle: 'Ṣawari awọn iṣẹ nipasẹ ẹka lati wa ohun ti o nilo',
        cleaning: 'Mimọ',
        beauty: 'Onigbajamu & Ẹwa',
        tech: 'Atilẹyin imọ-ẹrọ',
        events: 'Igbero iṣẹlẹ',
        repair: 'Atunṣe ile',
        fitness: 'Ikẹkọ amọdaju',
        photography: 'Aworan yiya',
        tutoring: 'Ikẹkọ',
        providers: 'awọn olupese'
      },
      featured: {
        title: 'Awọn iṣẹ pataki',
        subtitle: 'Awọn iṣẹ ti o gaju lati ọdọ awọn olupese ti a ṣayẹwo'
      },
      provider: {
        title: 'Ti o ti ṣetan lati bẹrẹ ere?',
        subtitle: 'Darapọ mọ ẹgbẹẹgbẹrun awọn olupese iṣẹ ti o ti n gba ere lori Quïp. Ṣẹda profaili rẹ ki o bẹrẹ gbigba awọn ifiṣura loni.',
        becomeProvider: 'Di olupese',
        learnMore: 'Kọ ẹkọ diẹ sii'
      },
      stats: {
        activeProviders: 'Awọn olupese ti nṣiṣe',
        servicesCompleted: 'Awọn iṣẹ ti o pari',
        averageRating: 'Iwọn aropin',
        serviceCategories: 'Awọn ẹka iṣẹ'
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
      close: 'Rufe',
      time: {
        minutesAgo: 'minti da suka wuce',
        hoursAgo: 'sa\'o\'i da suka wuce',
        daysAgo: 'kwanaki da suka wuce'
      }
    },
    navigation: {
      addService: 'Kara aiki',
      adminDashboard: 'Dashboard Admin',
      signOut: 'Fita',
      theme: 'Jigo'
    },
    notifications: {
      title: 'Sanarwa',
      empty: 'Babu sanarwa har yanzu',
      new: 'Sabon',
      markAllRead: 'Yi duka alamar karanta',
      allRead: 'An yi wa dukan sanarwa alamar karanta',
      allReadDescription: 'An sabunta cibiyar sanarwar ku.',
      booking: {
        newRequest: 'Sabuwar bukatar ajiye',
        newRequestMessage: 'John Doe ya bukaci sabis na tsaftace gida gobe da karfe 2 na yamma'
      },
      payment: {
        received: 'An karbi kudi',
        receivedMessage: 'Kun karbi ₦15,000 don sabis na tsaftacewa da aka kammala a ranar Jan 14'
      },
      message: {
        new: 'Sabuwar sako',
        newMessage: 'Sarah Johnson ta aiko muku da sako game da alkawarin da ke zuwa',
        newCustomerMessage: 'Kun karbi sabuwar sako daga abokin ciniki'
      },
      review: {
        new: 'Sabuwar sharhi',
        newReview: 'Mary Smith ta bar sharhi na taurari 5 don sabis dinku na kwanan nan'
      },
      system: {
        verification: 'Tabbatar bayanan martaba',
        verificationComplete: 'Tabbatar bayanan martaba ya kammala! Yanzu kuna iya karban ƙarin ajiye'
      },
      actions: {
        accept: 'Karba',
        decline: 'Ki',
        viewDetails: 'Duba dalla-dalla',
        bookingAccepted: 'An karbi ajiye',
        bookingAcceptedDescription: 'An karbi bukatar ajiye.',
        bookingDeclined: 'An ki ajiye',
        bookingDeclinedDescription: 'An ki bukatar ajiye.',
        redirecting: 'Ana turawa',
        redirectingDescription: 'Ana buɗe shafin da ya dace...'
      }
    },
    home: {
      hero: {
        title: 'Nemo masu ba da ayyuka da aka tabbatar kusa da ku',
        subtitle: 'Haɗu da ƙwararrun ma\'aikata da aka tabbatar a yankinku. Daga tsaftacewa zuwa tallafin fasaha, yi ajiyar ayyuka masu kyau tare da kwarin gwiwa.',
        searchPlaceholder: 'Wane aiki kuke bukata?',
        searchButton: 'Nemo ayyuka'
      },
      recommendations: {
        title: 'An ba da shawarar ku',
        subtitle: 'Dangane da abubuwan da kuke so da wurin ku'
      },
      categories: {
        title: 'Sanannun nau\'oci na ayyuka',
        subtitle: 'Binciko ayyuka ta nau\'i don nemo abin da kuke bukata',
        cleaning: 'Tsaftacewa',
        beauty: 'Aski da Kyakkyawa',
        tech: 'Tallafin fasaha',
        events: 'Tsarin abubuwan da suka faru',
        repair: 'Gyaran gida',
        fitness: 'Horar da lafiya',
        photography: 'Daukar hoto',
        tutoring: 'Koyarwa',
        providers: 'masu samarwa'
      },
      featured: {
        title: 'Ayyuka masu dacewa',
        subtitle: 'Ayyuka mafi girma daga masu samarwa da aka tabbatar'
      },
      provider: {
        title: 'A shirye don fara samun kuɗi?',
        subtitle: 'Ku shiga dubban masu ba da ayyuka da ke samun kuɗi a kan Quïp. Ƙirƙiri bayanin martaba ku kuma fara samun ajiye a yau.',
        becomeProvider: 'Zama mai samarwa',
        learnMore: 'Koyi ƙari'
      },
      stats: {
        activeProviders: 'Masu samarwa masu aiki',
        servicesCompleted: 'Ayyukan da aka kammala',
        averageRating: 'Matsakaicin kima',
        serviceCategories: 'Nau\'oci na ayyuka'
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
      close: 'Mechie',
      time: {
        minutesAgo: 'nkeji gara aga',
        hoursAgo: 'awa gara aga',
        daysAgo: 'ụbọchị gara aga'
      }
    },
    navigation: {
      addService: 'Tinye ọrụ',
      adminDashboard: 'Dashboard nchịkwa',
      signOut: 'Pụọ',
      theme: 'Isiokwu'
    },
    notifications: {
      title: 'Ọkwa',
      empty: 'Enweghị ọkwa',
      new: 'Ọhụrụ',
      markAllRead: 'Kaa niile dị ka agụrụ',
      allRead: 'Akara niile ọkwa dị ka agụrụ',
      allReadDescription: 'Emelitela ebe ọkwa gị.',
      booking: {
        newRequest: 'Arịrịọ ndebe ọhụrụ',
        newRequestMessage: 'John Doe arịọla ọrụ nhicha ụlọ maka echi na elekere 2 PM'
      },
      payment: {
        received: 'Nnatara ego',
        receivedMessage: 'Ị nwetara ₦15,000 maka ọrụ nhicha emechara na Jan 14'
      },
      message: {
        new: 'Ozi ọhụrụ',
        newMessage: 'Sarah Johnson zitere gị ozi banyere nhọpụta na-abịa',
        newCustomerMessage: 'Ị nwetara ozi ọhụrụ site n\'aka onye ahịa'
      },
      review: {
        new: 'Nyocha ọhụrụ',
        newReview: 'Mary Smith hapụrụ nyocha kpakpando 5 maka ọrụ gị na nso nso a'
      },
      system: {
        verification: 'Nkwenye profaịlụ',
        verificationComplete: 'Nkwenye profaịlụ gị zuru ezu! Ị nwere ike ịnweta ọtụtụ ndebe ugbu a'
      },
      actions: {
        accept: 'Kwere',
        decline: 'Jụ',
        viewDetails: 'Lee nkọwa',
        bookingAccepted: 'Anabatara ndebe',
        bookingAcceptedDescription: 'Anabatara arịrịọ ndebe ahụ.',
        bookingDeclined: 'Ajụrụ ndebe',
        bookingDeclinedDescription: 'Ajụrụ arịrịọ ndebe ahụ.',
        redirecting: 'Na-atụgharị',
        redirectingDescription: 'Na-emepe ibe kwesịrị ekwesị...'
      }
    },
    home: {
      hero: {
        title: 'Chọta ndị na-enye ọrụ obodo kwesịrị ntụkwasị obi',
        subtitle: 'Jikọọ na ndị ọkachamara akwadoro n\'ógbè gị. Site na nhicha ruo na nkwado teknụzụ, debe ọrụ dị mma na ntụkwasị obi.',
        searchPlaceholder: 'Kedu ọrụ ị chọrọ?',
        searchButton: 'Chọọ ọrụ'
      },
      recommendations: {
        title: 'Atụnyere maka gị',
        subtitle: 'Dabere na mmasị gị na ọnọdụ gị'
      },
      categories: {
        title: 'Ụdị ọrụ ndị ama ama',
        subtitle: 'Nyochaa ọrụ site na ụdị iji chọta ihe ị chọrọ',
        cleaning: 'Nhicha',
        beauty: 'Nkata ntutu na ịma mma',
        tech: 'Nkwado teknụzụ',
        events: 'Nhazi mmemme',
        repair: 'Nrụzi ụlọ',
        fitness: 'Ọzụzụ ahụ ike',
        photography: 'Ise foto',
        tutoring: 'Nkuzi',
        providers: 'ndị na-enye'
      },
      featured: {
        title: 'Ọrụ pụrụ iche',
        subtitle: 'Ọrụ kasị mma site na ndị na-enye akwadoro'
      },
      provider: {
        title: 'Dị njikere ịmalite inweta ego?',
        subtitle: 'Sonye na ọtụtụ puku ndị na-enye ọrụ na-enwetalarị ego na Quïp. Mepụta profaịlụ gị ma malite inweta ndebe taa.',
        becomeProvider: 'Bụrụ onye na-enye',
        learnMore: 'Mụtakwuo'
      },
      stats: {
        activeProviders: 'Ndị na-enye na-arụ ọrụ',
        servicesCompleted: 'Ọrụ rụchara',
        averageRating: 'Nkọwa nkezi',
        serviceCategories: 'Ụdị ọrụ'
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
