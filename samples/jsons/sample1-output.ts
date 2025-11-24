export interface Sample1 {
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
  emergencyContacts: EmergencyContacts[];
  employment: Employment;
  education: Education[];
  health: Health;
  financial: Financial;
  preferences: Preferences;
  devices: Devices[];
  subscriptions: Subscriptions[];
  travel: Travel;
  socialConnections: SocialConnections;
  skills: Skills[];
  projects: Projects[];
  achievements: Achievements[];
  hobbies: Hobbies[];
}

interface Hobbies {
  category: string;
  activities: Activities[];
}

interface Activities {
  name: string;
  frequency: string;
  level: string;
}

interface Achievements {
  title: string;
  organization: string;
  year: number;
  description: string;
}

interface Skills {
  category: string;
  items: Items[];
}

interface Items {
  name: string;
  proficiency: string;
  years: number;
}

interface SocialConnections {
  friends: number;
  followers: number;
  following: number;
  connections: Connections[];
}

interface Connections {
  platform: string;
  connections: number;
  profileViews: number;
  postImpressions: number;
}

interface Travel {
  passport: Passport;
  frequentFlyer: FrequentFlyer[];
  recentTrips: RecentTrips[];
}

interface RecentTrips {
  destination: string;
  dates: string;
  purpose: string;
  hotel: string;
  flights: string[];
}

interface FrequentFlyer {
  airline: string;
  number: string;
  miles: number;
}

interface Passport {
  number: string;
  issueDate: string;
  expiryDate: string;
  country: string;
}

interface Subscriptions {
  service: string;
  plan: string;
  cost: number;
  billingCycle: string;
  nextPayment: string;
}

interface Devices {
  type: string;
  brand: string;
  model: string;
  os: string;
  lastUsed: string;
  apps: string[];
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
  bankAccounts: BankAccounts[];
  creditCards: CreditCards[];
  investments: Investments;
}

interface Investments {
  retirement: Retirement;
  stocks: Stocks[];
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

interface Stocks {
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
}

interface Retirement {
  '401k': number;
  ira: number;
  rothIRA: number;
}

interface CreditCards {
  issuer: string;
  type: string;
  lastFour: string;
  limit: number;
  balance: number;
  dueDate: string;
}

interface BankAccounts {
  type: string;
  bank: string;
  accountNumber: string;
  routingNumber: string;
  balance: number;
}

interface Health {
  vitals: Vitals;
  appointments: Appointments[];
  medications: Medications[];
}

interface Medications {
  name: string;
  dosage: string;
  frequency: string;
  prescribed: string;
}

interface Appointments {
  date: string;
  type: string;
  doctor: string;
  clinic: string;
}

interface Vitals {
  height: string;
  weight: number;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
}

interface Education {
  institution: string;
  degree: string;
  major: string;
  graduationYear: number;
  gpa: number;
  honors: string[];
  activities: string[];
}

interface Employment {
  current: Current;
  previous: Previous[];
}

interface Previous {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
}

interface Current {
  company: string;
  position: string;
  department: string;
  startDate: string;
  salary: number;
  manager: Manager;
  projects: Projects[];
}

interface Projects {
  name: string;
  status: string;
  technologies: string[];
  teamSize: number;
  deadline: string;
}

interface Manager {
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface EmergencyContacts {
  name: string;
  phone: string;
  relationship: string;
  emails: string[];
  addresses: Addresses[];
  alternatePhones: AlternatePhones;
}

interface AlternatePhones {
  mobile: string;
  work: string;
  international: string;
}

interface Addresses {
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  coordinates: Coordinates;
}

interface Coordinates {
  lat: number;
  lng: number;
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
