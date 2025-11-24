export interface Sample2 {
  product: string;
  version: number;
  releaseDate: string;
  demo: boolean;
  favoriteNumbers: number[];
  favoriteColors: string[];
  booleanFlags: boolean[];
  mixedValues: [number, string, boolean, null];
  singleValueArray: string[];
  primitiveTypes: [number, string, boolean];
  edgeCases: [null, string];
  person: {
    id: number;
    name: string;
    phones: {
      home: string;
      mobile: string;
      work: string;
      fax: string;
      pager: string;
      emergency: string;
      international: string;
      voip: string;
      satellite: string;
      telex: string;
    };
    favoriteNumbers: number[];
    favoriteColors: string[];
    booleanFlags: boolean[];
    mixedValues: [number, string, boolean, null];
    singleValueArray: string[];
    primitiveTypes: [number, string, boolean];
    edgeCases: [null, string];
    email: string[];
    dateOfBirth: string;
    registered: boolean;
    emergencyContacts: {
      name: string;
      phone: string;
      relationship: string;
      emails: string[];
      addresses: {
        type: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        coordinates: {
          lat: number;
          lng: number;
        };
      }[];
      alternatePhones: {
        mobile: string;
        work: string;
        international: string;
      };
    }[];
    employment: {
      current: {
        company: string;
        position: string;
        department: string;
        startDate: string;
        salary: number;
        manager: {
          name: string;
          title: string;
          email: string;
          phone: string;
        };
        projects: {
          name: string;
          status: string;
          technologies: string[];
          teamSize: number;
          deadline: string;
        }[];
      };
      previous: {
        company: string;
        position: string;
        duration: string;
        achievements: string[];
      }[];
    };
    education: {
      institution: string;
      degree: string;
      major: string;
      graduationYear: number;
      gpa: number;
      honors: string[];
      activities: string[];
    }[];
    health: {
      vitals: {
        height: string;
        weight: number;
        bloodPressure: string;
        heartRate: number;
        temperature: number;
      };
      appointments: {
        date: string;
        type: string;
        doctor: string;
        clinic: string;
      }[];
      medications: {
        name: string;
        dosage: string;
        frequency: string;
        prescribed: string;
      }[];
    };
    financial: {
      bankAccounts: {
        type: string;
        bank: string;
        accountNumber: string;
        routingNumber: string;
        balance: number;
      }[];
      creditCards: {
        issuer: string;
        type: string;
        lastFour: string;
        limit: number;
        balance: number;
        dueDate: string;
      }[];
      investments: {
        retirement: {
          "401k": number;
          ira: number;
          rothIRA: number;
        };
        stocks: {
          symbol: string;
          shares: number;
          purchasePrice: number;
          currentPrice: number;
        }[];
        realEstate: {
          primaryResidence: {
            address: string;
            purchasePrice: number;
            currentValue: number;
            mortgage: number;
          };
        };
      };
    };
    preferences: {
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
        marketing: boolean;
      };
      privacy: {
        shareData: boolean;
        analytics: boolean;
        cookies: string;
        location: boolean;
      };
      theme: string;
      language: string;
      timezone: string;
    };
    devices: {
      type: string;
      brand: string;
      model: string;
      os: string;
      lastUsed: string;
      apps: string[];
    }[];
    subscriptions: {
      service: string;
      plan: string;
      cost: number;
      billingCycle: string;
      nextPayment: string;
    }[];
    travel: {
      passport: {
        number: string;
        issueDate: string;
        expiryDate: string;
        country: string;
      };
      frequentFlyer: {
        airline: string;
        number: string;
        miles: number;
      }[];
      recentTrips: {
        destination: string;
        dates: string;
        purpose: string;
        hotel: string;
        flights: string[];
      }[];
    };
    socialConnections: {
      friends: number;
      followers: number;
      following: number;
      connections: {
        platform: string;
        connections: number;
        profileViews: number;
        postImpressions: number;
      }[];
    };
    skills: {
      category: string;
      items: {
        name: string;
        proficiency: string;
        years: number;
      }[];
    }[];
    projects: {
      name: string;
      description: string;
      technologies: string[];
      status: string;
      url: string;
      github: string;
    }[];
    achievements: {
      title: string;
      organization: string;
      year: number;
      description: string;
    }[];
    hobbies: {
      category: string;
      activities: {
        name: string;
        frequency: string;
        level: string;
      }[];
    }[];
  };
}
