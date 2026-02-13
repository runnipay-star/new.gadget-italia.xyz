
export interface UserSession {
  id: string;
  email: string;
}

export enum PageTone {
  PROFESSIONAL = 'Professional',
  URGENT = 'Urgent/Hype',
  FRIENDLY = 'Friendly/Personal',
  LUXURY = 'Luxury'
}

export type TemplateId = 'classic' | 'modern-split' | 'luxury' | 'advertorial' | 'high-impact' | 'gadget-cod' | 'shopify-clean' | 'premium-brand' | 'mobile-optimized';

export type AIImageStyle = 'lifestyle' | 'technical' | 'informative';

export interface SiteConfig {
  siteName: string;
  footerText: string;
  storageBucketName?: string; 
  phone?: string; 
  vatNumber?: string; 
  email?: string; 
  browserTitle?: string; 
  faviconUrl?: string; 
  adminPanelName?: string; 
}

export interface ProductDetails {
  name: string;
  niche: string;
  description: string;
  targetAudience: string;
  tone: PageTone;
  language: string; 
  image?: string; 
  images?: string[]; 
  featureCount?: number; 
  selectedImageStyles?: AIImageStyle[]; 
  generateThankYou?: boolean; 
  textRichness?: 'short' | 'medium' | 'rich';
}

export interface FormFieldConfig {
  id: 'name' | 'phone' | 'email' | 'address' | 'address_number' | 'city' | 'province' | 'cap' | 'notes';
  label: string;
  enabled: boolean;
  required: boolean;
  type: 'text' | 'tel' | 'email' | 'textarea';
  width?: number; 
  validationType?: 'none' | 'numeric' | 'alpha' | 'alphanumeric'; 
}

export interface Testimonial {
  name: string;
  title?: string; 
  text: string;
  role: string;
  rating?: number;
  date?: string; 
  image?: string; 
  images?: string[]; 
}

export interface TypographyConfig {
  fontFamily: 'sans' | 'serif' | 'mono';
  h1Size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; 
  h2Size: 'sm' | 'md' | 'lg' | 'xl';
  bodySize: 'sm' | 'md' | 'lg';
}

export interface UiTranslation {
    reviews: string;
    offer: string;
    onlyLeft: string; 
    secure: string;
    returns: string;
    original: string;
    express: string;
    warranty: string;
    checkoutHeader: string;
    paymentMethod: string;
    cod: string; 
    card: string; 
    shippingInfo: string;
    completeOrder: string;
    orderReceived: string;
    orderReceivedMsg: string;
    techDesign: string;
    discountLabel: string; 
    certified: string; 
    currencyPos: 'before' | 'after';
    legalDisclaimer: string; 
    privacyPolicy: string;
    termsConditions: string;
    cookiePolicy: string;
    rightsReserved: string;
    generatedPageNote: string;
    cardErrorTitle: string;
    cardErrorMsg: string;
    switchToCod: string;
    mostPopular: string; 
    giveUpOffer: string;
    confirmCod: string; 
    thankYouTitle: string; 
    thankYouMsg: string; 
    backToShop: string;
    socialProof: string; 
    shippingInsurance: string; 
    gadgetLabel: string; 
    shippingInsuranceDescription: string;
    gadgetDescription: string;
    freeLabel: string;
    summaryProduct: string;
    summaryShipping: string;
    summaryInsurance: string;
    summaryGadget: string;
    summaryTotal: string;
    socialProofAction: string; 
    socialProofFrom: string; 
    localizedCities: string[]; 
    localizedNames: string[]; 
    socialProofBadgeName: string; 
    timelineOrdered: string;
    timelineReady: string;
    timelineDelivered: string;
}

export interface OnlineUser {
    id: string;
    lat?: number;
    lon?: number;
    city?: string;
    country?: string;
    ip?: string;
    online_at: string;
    action?: 'purchased';
    pageUrl?: string;
}

export interface AnnouncementItem {
  text: string;
  icon?: string;
  iconSize?: number;
}

export interface FinalOfferSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  ctaText: string;
  scarcityText: string;
  price?: string;
  originalPrice?: string;
  bgClass?: string; 
  bgColor?: string; 
}

export interface GeneratedContent {
  templateId?: TemplateId; 
  language?: string; 
  currency?: string; 
  headline: string;
  subheadline: string;
  heroImagePrompt: string; 
  heroImageBase64?: string; 
  generatedImages?: string[]; 
  
  announcementBarText?: string; 
  announcements?: AnnouncementItem[]; 
  announcementInterval?: number; 
  announcementFontSize?: number; 
  announcementBgColor?: string; 
  announcementBgClass?: string; 
  announcementTextColor?: string; 

  stockConfig?: {
    enabled: boolean;
    quantity: number;
    textOverride?: string; 
  };
  
  socialProofConfig?: {
      enabled: boolean;
      intervalSeconds: number;
      maxShows: number;
  };

  showFeatureIcons?: boolean;
  showSocialProofBadge?: boolean; 
  showDeliveryTimeline?: boolean; 
  socialProofCount?: number; 
  socialProofBadgeConfig?: { 
      name?: string;
      text?: string;
      avatarUrls?: string[];
  };

  benefits: string[];
  features: Array<{ title: string; description: string; image?: string; showCta?: boolean }>; 
  reviewsPosition?: number; 

  testimonial?: Testimonial; 
  testimonials?: Testimonial[];

  boxContent?: {
      enabled: boolean;
      title: string; 
      items: string[];
      image?: string; 
  };

  bottomOffer?: FinalOfferSection;

  ctaText: string;
  ctaSubtext: string;
  colorScheme: 'blue' | 'green' | 'red' | 'purple' | 'dark' | 'gold';
  buttonColor?: string; 
  checkoutButtonColor?: string; 
  backgroundColor?: string; 
  niche: string;
  
  price?: string;
  originalPrice?: string;
  showDiscount?: boolean;
  shippingCost?: string; 
  enableShippingCost?: boolean; 

  insuranceConfig?: {
    enabled: boolean;
    label: string;
    cost: string;
    defaultChecked: boolean;
  };
  
  gadgetConfig?: {
    enabled: boolean;
    label: string;
    cost: string;
    defaultChecked: boolean;
  };

  // NUOVO: Configurazione Metodi di Pagamento
  paymentConfig?: {
    codEnabled: boolean;
    cardEnabled: boolean;
    defaultMethod: 'cod' | 'card';
  };

  priceStyles?: {
      color?: string; 
      fontSize?: string; 
      className?: string; 
  };
  customTypography?: {
      h1?: string; 
      h2?: string; 
      h3?: string; 
      body?: string; 
      small?: string; 
      cta?: string; 
  };
  
  webhookUrl?: string;
  formType?: 'classic' | 'html';
  customFormHtml?: string;
  htmlFormConfig?: { 
    showName?: boolean;
    showProductLine?: boolean;
    showTotalLine?: boolean;
  };

  metaLandingHtml?: string;     
  tiktokLandingHtml?: string;   
  metaThankYouHtml?: string;    
  tiktokThankYouHtml?: string;  
  
  customHeadHtml?: string; 
  customHeadHtml2?: string; 
  customThankYouHtml?: string; 
  customThankYouUrl?: string; 
  thankYouImageLink?: string; 
  
  extraLandingHtml?: string;
  extraThankYouHtml?: string;

  formConfiguration?: FormFieldConfig[];

  typography?: TypographyConfig;

  uiTranslation?: UiTranslation;

  thankYouConfig?: {
    enabled: boolean;
    slugSuffix?: string; 
  };

  assistantConfig?: {
    enabled: boolean;
    message: string;
    avatarUrl?: string;
    videoUrl?: string;
  };

  customFooterCopyrightText?: string; 
}

export interface LandingPageRow {
  id: string;
  created_at: string;
  product_name: string;
  slug?: string; 
  thank_you_slug?: string; 
  niche: string;
  content: GeneratedContent;
  thank_you_content?: GeneratedContent; 
  is_published: boolean;
  custom_head_html?: string;
  custom_thankyou_html?: string;
}
