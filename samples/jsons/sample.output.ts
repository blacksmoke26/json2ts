export interface Sample {
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
  person: Person;
}

interface Person {
  id: number;
  name: string;
  phones: Phones;
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
  emergencyContacts: [object, object, object, object];
  employment: Employment;
  education: [object, object];
  health: Health;
  financial: Financial;
  preferences: Preferences;
  devices: [object, object, object, object];
  subscriptions: [object, object, object, object];
  travel: Travel;
  socialConnections: SocialConnections;
  skills: [object, object, object];
  projects: [object, object, object];
  achievements: [object, object, object];
  hobbies: [object, object, object];
}

interface SocialConnections {
  friends: number;
  followers: number;
  following: number;
  connections: [object, object, object];
}

interface Travel {
  passport: Passport;
  frequentFlyer: [object, object, object];
  recentTrips: [object, object];
}

interface Passport {
  number: string;
  issueDate: string;
  expiryDate: string;
  country: string;
}

interface Preferences {
  notifications: Notifications;
  privacy: Privacy;
  theme: string;
  language: string;
  timezone: string;
}

interface Privacy {
  shareData: boolean;
  analytics: boolean;
  cookies: string;
  location: boolean;
}

interface Notifications {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

interface Financial {
  bankAccounts: [object, object];
  creditCards: [object, object];
  investments: Investments;
}

interface Investments {
  retirement: Retirement;
  stocks: [object, object, object];
  realEstate: RealEstate;
}

interface RealEstate {
  primaryResidence: PrimaryResidence;
}

interface PrimaryResidence {
  address: string;
  purchasePrice: number;
  currentValue: number;
  mortgage: number;
}

interface Retirement {
  "401k": number;
  ira: number;
  rothIRA: number;
}

interface Health {
  vitals: Vitals;
  appointments: [object, object];
  medications: [object, object];
}

interface Vitals {
  height: string;
  weight: number;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
}

interface Employment {
  current: Current;
  previous: [object, object];
}

interface Current {
  company: string;
  position: string;
  department: string;
  startDate: string;
  salary: number;
  manager: Manager;
  projects: [object, object];
}

interface Manager {
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface Phones {
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
}
