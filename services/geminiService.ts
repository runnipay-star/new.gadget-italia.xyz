
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ProductDetails, GeneratedContent, FormFieldConfig, Testimonial, UiTranslation, PageTone, AIImageStyle } from "../types";

const DISCLAIMER_BASE = "Il nostro sito web agisce esclusivamente come affiliato e si concentra sulla promozione dei prodotti tramite campagne pubblicitarie. Non ci assumiamo alcuna responsabilità per la spedizione, la qualità o qualsiasi altra questione riguardante i prodotti venduti tramite link di affiliazione. Ti preghiamo di notare che le immagini utilizzate a scopo illustrativo potrebbero non corrispondere alla reale immagine del prodotto acquistato. Ti invitiamo a contattare il servizio assistenza clienti dopo aver inserito i dati nel modulo per chiedere qualsiasi domanda o informazione sul prodotto prima di confermare l’ordine. Ti informiamo inoltre che i prodotti in omaggio proposti sul sito possono essere soggetti a disponibilità limitata, senza alcuna garanzia di disponibilità da parte del venditore che spedisce il prodotto. Ricorda che, qualora sorgessero problemi relativi alle spedizioni o alla qualità dei prodotti, la responsabilità ricade direttamente sull’azienda fornitrice.";

export const TIKTOK_SLIDER_HTML = `
<style>
    .slider-containerv8 {
        position: relative;
        width: 100%;
        overflow-x: auto;
        display: flex;
        align-items: center;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding: 40px 10px;
        overscroll-behavior-x: contain;
    }
    .sliderv8 {
        display: flex;
        gap: 15px;
        padding-right: 40px;
    }
    .slidev8 {
        flex: 0 0 75%;
        max-width: 320px;
        scroll-snap-align: center;
        scroll-snap-stop: always;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        will-change: transform;
        transform: translateZ(0);
    }
    @media screen and (min-width: 769px){
        .slidev8 {
            flex: 0 0 25%;
            max-width: 260px;
        }
    }
    .tiktok-videov8 {
        width: 100%;
        height: auto;
        aspect-ratio: 9 / 16;
        border-radius: 15px;
        display: block;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        background: #000;
        object-fit: cover;
    }
    .slider-containerv8::-webkit-scrollbar { height: 4px; }
    .slider-containerv8::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    .slider-containerv8::-webkit-scrollbar-track { background: transparent; }
    .with-borderv8 {
        padding: 4px;
        border-radius: 18px;
        background: linear-gradient(0deg, #fe2d52, #28ffff);
        width: 100%;
        pointer-events: none;
    }
    .with-borderv8 > video { pointer-events: auto; }
</style>
<div class="slider-containerv8">
    <div class="sliderv8">
        <div class="slidev8">
           <div class="with-borderv8">
            <video class="tiktok-videov8" playsinline loop muted preload="metadata">
                <source src="https://cdn.shopify.com/videos/c/o/v/0e7bd7ed6340476b9b94ab12a8e5ab12.mp4">
            </video>
            </div>
        </div>
        <div class="slidev8">
            <div class="with-borderv8">
            <video class="tiktok-videov8" playsinline loop muted preload="metadata">
                <source src="https://cdn.shopify.com/videos/c/o/v/d4dfdd955f2840b1b63b223ecc77cafd.mp4" type="video/mp4">
            </video>
            </div>
        </div>
        <div class="slidev8">
            <div class="with-borderv8">
            <video class="tiktok-videov8" playsinline loop muted preload="metadata">
                <source src="https://cdn.shopify.com/videos/c/o/v/171162a47d1b44f1a042656ad7f85d02.mp4" type="video/mp4">
            </video>
            </div>
        </div>
        <div class="slidev8">
            <div class="with-borderv8">
            <video class="tiktok-videov8" playsinline loop muted preload="metadata">
                <source src="https://cdn.shopify.com/videos/c/o/v/d8d1ca1c53114802a2d840e57fcd7e75.mp4" type="video/mp4">
            </video>
            </div>
        </div>
    </div>
</div>
<script>
    (function() {
        const videos = document.querySelectorAll(".tiktok-videov8");
        
        videos.forEach(v => {
            v.addEventListener('click', () => {
                if (v.paused) v.play();
                else v.pause();
                v.muted = false;
            });
        });

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.6 });

            videos.forEach(v => obs.observe(v));
        } else {
            videos.forEach(v => v.play().catch(() => {}));
        }
    })();
</script>
`;

const COMMON_UI_DEFAULTS: Record<string, Partial<UiTranslation>> = {
    'Italiano': {
        reviews: "Recensioni",
        cardErrorTitle: "Attenzione",
        cardErrorMsg: "Al momento non possiamo accettare pagamenti con carta. Scegli come procedere:",
        switchToCod: "Paga comodamente alla consegna",
        mostPopular: "Più scelto",
        giveUpOffer: "Rinuncia all'offerta e allo sconto",
        confirmCod: "Conferma Contrassegno",
        card: "Carta di Credito",
        cod: "Pagamento alla Consegna",
        paymentMethod: "Metodo di Pagamento",
        shippingInfo: "Dati per la Spedizione",
        checkoutHeader: "Checkout",
        completeOrder: "Completa l'Ordine",
        backToShop: "Torna allo Shop",
        socialProof: "altre {x} persone hanno acquistato",
        shippingInsurance: "Assicurazione Spedizione",
        gadgetLabel: "Aggiungi Gadget",
        shippingInsuranceDescription: "Pacco protetto contro furto e smarrimento.",
        gadgetDescription: "Aggiungilo al tuo ordine.",
        freeLabel: "Gratis",
        summaryProduct: "Prodotto:",
        summaryShipping: "Spedizione:",
        summaryInsurance: "Assicurazione:",
        summaryGadget: "Gadget:",
        summaryTotal: "Totale:",
        socialProofAction: "ha appena acquistato",
        socialProofFrom: "da",
        socialProofBadgeName: "Alessandro",
        onlyLeft: "Solo {x} rimasti a magazzino",
        original: "Originale",
        express: "Espresso",
        warranty: "Garanzia",
        certified: "Acquisto Verificato",
        techDesign: "Tecnologia & Design",
        localizedCities: ["Roma", "Milano", "Napoli", "Torino", "Palermo", "Genova", "Bologna", "Firenze", "Bari", "Catania"],
        localizedNames: ["Alessandro", "Marco", "Giulia", "Luca", "Sofia", "Alessandro", "Francesca", "Matteo", "Chiara", "Lorenzo"],
        timelineOrdered: "Ordinato",
        timelineReady: "Ordine Pronto",
        timelineDelivered: "Consegnato",
        thankYouTitle: "Grazie per il tuo acquisto {name}! ",
        thankYouMsg: " Il tuo ordine è in fase di elaborazione. Verrai contattato telefonicamente o su whatsapp al numero {phone} per la conferma."
    },
    'English (UK)': {
        reviews: "Reviews",
        cardErrorTitle: "Attention",
        cardErrorMsg: "Card payments are currently unavailable. Please choose an alternative:",
        switchToCod: "Pay on Delivery",
        mostPopular: "Most Popular",
        giveUpOffer: "Decline offer and discount",
        confirmCod: "Confirm Cash on Delivery",
        card: "Credit Card",
        cod: "Cash on Delivery",
        paymentMethod: "Payment Method",
        shippingInfo: "Shipping Details",
        checkoutHeader: "Checkout",
        completeOrder: "Complete Order",
        backToShop: "Back to Shop",
        socialProof: "{x} others have purchased",
        shippingInsurance: "Shipping Insurance",
        gadgetLabel: "Add Free Gift",
        shippingInsuranceDescription: "Package protection against theft or loss.",
        gadgetDescription: "Add this to your order.",
        freeLabel: "Free",
        summaryProduct: "Product:",
        summaryShipping: "Shipping:",
        summaryInsurance: "Insurance:",
        summaryGadget: "Gift:",
        summaryTotal: "Total:",
        socialProofAction: "just purchased",
        socialProofFrom: "from",
        socialProofBadgeName: "James",
        onlyLeft: "Only {x} left in stock",
        original: "Original",
        express: "Express",
        warranty: "Warranty",
        certified: "Verified Purchase",
        techDesign: "Tech & Design",
        localizedCities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Glasgow", "Sheffield", "Bristol", "Leicester", "Edinburgh"],
        localizedNames: ["James", "Oliver", "George", "Harry", "Noah", "Jack", "Leo", "Arthur", "Muhammad", "Leo"],
        timelineOrdered: "Ordered",
        timelineReady: "Ready for Dispatch",
        timelineDelivered: "Delivered",
        thankYouTitle: "Thank you for your purchase {name}!",
        thankYouMsg: "Your order is being processed. We will contact you via phone or WhatsApp at {phone} for confirmation."
    },
    'English (US)': {
        reviews: "Reviews",
        cardErrorTitle: "Notice",
        cardErrorMsg: "We cannot accept card payments right now. Please choose how to proceed:",
        switchToCod: "Pay with Cash on Delivery",
        mostPopular: "Best Seller",
        giveUpOffer: "Decline offer and discount",
        confirmCod: "Confirm Cash on Delivery",
        card: "Credit Card",
        cod: "Cash on Delivery",
        paymentMethod: "Payment Method",
        shippingInfo: "Shipping Information",
        checkoutHeader: "Checkout",
        completeOrder: "Complete Order",
        backToShop: "Back to Shop",
        socialProof: "{x} other people bought this",
        shippingInsurance: "Shipping Insurance",
        gadgetLabel: "Add Free Gift",
        shippingInsuranceDescription: "Protection against theft or loss.",
        gadgetDescription: "Add to your order.",
        freeLabel: "Free",
        summaryProduct: "Product:",
        summaryShipping: "Shipping:",
        summaryInsurance: "Insurance:",
        summaryGadget: "Gift:",
        summaryTotal: "Total:",
        socialProofAction: "just bought",
        socialProofFrom: "in",
        socialProofBadgeName: "Michael",
        onlyLeft: "Only {x} left in stock",
        original: "Original",
        express: "Express",
        warranty: "Warranty",
        certified: "Verified Purchase",
        techDesign: "Tech & Design",
        localizedCities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin"],
        localizedNames: ["Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore"],
        timelineOrdered: "Ordered",
        timelineReady: "Package Ready",
        timelineDelivered: "Delivered",
        thankYouTitle: "Thank you for your order {name}!",
        thankYouMsg: "Your order is being processed. You will be contacted at {phone} for confirmation."
    }
};

const getAIInstance = () => {
    // In un ambiente browser/Vite, process.env.API_KEY viene popolato dal nostro bridge in index.tsx
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("L'API Key di Gemini non è stata trovata. Assicurati che VITE_API_KEY sia impostata correttamente su Vercel.");
    }
    return new GoogleGenAI({ apiKey });
};

export const getLanguageConfig = (lang: string) => {
    const configs: Record<string, any> = {
        'Italiano': { currency: '€', locale: 'it-IT', country: 'Italia' },
        'English (UK)': { currency: '£', locale: 'en-GB', country: 'United Kingdom' },
        'English (US)': { currency: '$', locale: 'en-US', country: 'United States' },
    };
    return configs[lang] || configs['Italiano'];
};

const cleanJson = (text: any) => {
    if (typeof text !== 'string') return '{}';
    let cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');
    let startIdx = -1;
    let endChar = '';
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        startIdx = firstBrace;
        endChar = '}';
    } else if (firstBracket !== -1) {
        startIdx = firstBracket;
        endChar = ']';
    }
    if (startIdx !== -1) {
        const lastIdx = cleaned.lastIndexOf(endChar);
        if (lastIdx !== -1) {
            return cleaned.substring(startIdx, lastIdx + 1);
        }
    }
    return cleaned;
};

export const generateLandingPage = async (product: ProductDetails, reviewCount: number): Promise<GeneratedContent> => {
    const ai = getAIInstance();
    const selectedLang = product.language || 'Italiano';
    const langConfig = getLanguageConfig(selectedLang);
    
    const thankYouOption = product.generateThankYou ? "'GENERA ANCHE THANK YOU PAGE'" : "'NON GENERARE THANK YOU PAGE'";
    const richness = product.textRichness || 'medium';

    const prompt = `
    Generate a high-converting landing page JSON for a product with the following details:
    Name: ${product.name}
    Niche: ${product.niche}
    Target: ${product.targetAudience}
    Description: ${product.description}
    Tone: ${product.tone}
    Language: ${selectedLang}
    Country Context: ${langConfig.country}
    Features Count: ${product.featureCount || 3}
    Currency Symbol: ${langConfig.currency}

    ### ISTRUZIONI SULLA VERBOSITÀ DEL TESTO
    LIVELLO ATTUALE: ${richness}
    - 'short': Conciso (15-20 parole/paragrafo).
    - 'medium': Bilanciato (40-50 parole/paragrafo).
    - 'rich': Dettagliato (80-100 parole/paragrafo).

    Instructions:
    - All text content must be in ${selectedLang}.
    - Focus on product-specific benefits and clear calls to action.
    - Follow the GeneratedContent interface structure strictly.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    headline: { type: Type.STRING },
                    subheadline: { type: Type.STRING },
                    ctaText: { type: Type.STRING },
                    ctaSubtext: { type: Type.STRING },
                    benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                    features: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                showCta: { type: Type.BOOLEAN }
                            },
                            required: ["title", "description"]
                        }
                    },
                    uiTranslation: { 
                        type: Type.OBJECT,
                        properties: {
                            reviews: { type: Type.STRING },
                            checkoutHeader: { type: Type.STRING },
                            completeOrder: { type: Type.STRING },
                            shippingInsurance: { type: Type.STRING },
                            shippingInsuranceDescription: { type: Type.STRING },
                            gadgetLabel: { type: Type.STRING },
                            gadgetDescription: { type: Type.STRING },
                            paymentMethod: { type: Type.STRING },
                            cod: { type: Type.STRING },
                            card: { type: Type.STRING },
                            shippingInfo: { type: Type.STRING },
                            onlyLeft: { type: Type.STRING },
                            socialProof: { type: Type.STRING },
                            summaryProduct: { type: Type.STRING },
                            summaryShipping: { type: Type.STRING },
                            summaryInsurance: { type: Type.STRING },
                            summaryGadget: { type: Type.STRING },
                            summaryTotal: { type: Type.STRING },
                            thankYouTitle: { type: Type.STRING },
                            thankYouMsg: { type: Type.STRING },
                            localizedCities: { type: Type.ARRAY, items: { type: Type.STRING } },
                            localizedNames: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    },
                    price: { type: Type.STRING },
                    originalPrice: { type: Type.STRING },
                    thankYouConfig: {
                        type: Type.OBJECT,
                        properties: {
                            enabled: { type: Type.BOOLEAN }
                        }
                    }
                }
            }
        }
    });

    const responseText = response.text || '{}';
    const baseContent = JSON.parse(cleanJson(responseText)) as any;
    
    return {
        ...baseContent,
        language: selectedLang,
        currency: langConfig.currency,
        niche: product.niche,
        templateId: 'gadget-cod',
        colorScheme: 'blue',
        backgroundColor: '#ffffff',
        buttonColor: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200',
        checkoutButtonColor: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200',
        announcementBgColor: '#0f172a',
        announcementTextColor: '#ffffff',
        stockConfig: { enabled: true, quantity: 13, textOverride: baseContent.uiTranslation?.onlyLeft || "Only {x} left in stock" },
        socialProofConfig: { enabled: true, intervalSeconds: 10, maxShows: 4 },
        socialProofCount: 856,
        showSocialProofBadge: true,
        showDeliveryTimeline: true,
        extraLandingHtml: TIKTOK_SLIDER_HTML, 
        insuranceConfig: { enabled: true, label: baseContent.uiTranslation?.shippingInsurance || "Shipping Insurance", cost: "4.90", defaultChecked: true },
        gadgetConfig: { enabled: true, label: baseContent.uiTranslation?.gadgetLabel || "Free Gift", cost: "0.00", defaultChecked: true },
        boxContent: { enabled: true, title: "Cosa trovi nella confezione?", items: ["1x " + product.name, "Manuale d'uso", "Cavo di ricarica"] },
        bottomOffer: { enabled: true, title: "ULTIMA OCCASIONE", subtitle: "Prendilo ora prima che finiscano le scorte!", ctaText: "ORDINA ORA CON SCONTO", scarcityText: "OFFERTA VALIDA SOLO PER OGGI" },
        assistantConfig: { enabled: true, message: "Ciao! Sono qui per aiutarti a completare l'ordine." },
        paymentConfig: { codEnabled: true, cardEnabled: true, defaultMethod: 'cod' },
        formConfiguration: [
            { id: 'name', label: 'Nome e Cognome', enabled: true, required: true, type: 'text', width: 12 },
            { id: 'phone', label: 'Cellulare', enabled: true, required: true, type: 'tel', width: 12 },
            { id: 'address', label: 'Indirizzo', enabled: true, required: true, type: 'text', width: 9 },
            { id: 'address_number', label: 'N°', enabled: true, required: true, type: 'text', width: 3 },
            { id: 'city', label: 'Città', enabled: true, required: true, type: 'text', width: 8 },
            { id: 'province', label: 'Prov', enabled: true, required: true, type: 'text', width: 4 },
            { id: 'cap', label: 'CAP', enabled: true, required: true, type: 'text', width: 12 },
        ],
        uiTranslation: {
            ...COMMON_UI_DEFAULTS[selectedLang],
            ...baseContent.uiTranslation,
            legalDisclaimer: baseContent.uiTranslation?.legalDisclaimer || DISCLAIMER_BASE,
        } as UiTranslation
    };
};

export const generateReviews = async (product: ProductDetails, lang: string, count: number): Promise<Testimonial[]> => {
    const ai = getAIInstance();
    const batchSize = 50; // Aumentato batch per efficienza
    const batches = Math.ceil(count / batchSize);
    const allReviews: Testimonial[] = [];
    const langConfig = getLanguageConfig(lang);

    for (let i = 0; i < batches; i++) {
        const currentCount = Math.min(batchSize, count - allReviews.length);
        if (currentCount <= 0) break;

        const prompt = `Generate ${currentCount} unique and extremely realistic product reviews in ${lang} for ${langConfig.country} context:
        Product: ${product.name}
        Niche: ${product.niche}
        Return ONLY a JSON array with objects: {name, text, rating, date, role, title}.`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                text: { type: Type.STRING },
                                rating: { type: Type.NUMBER },
                                date: { type: Type.STRING },
                                role: { type: Type.STRING },
                                title: { type: Type.STRING }
                            }
                        }
                    }
                }
            });
            const parsed = JSON.parse(response.text || '[]');
            allReviews.push(...parsed);
            
            // Pausa per evitare rate limits durante generazioni massive
            if (batches > 1) await new Promise(r => setTimeout(r, 600));
            
        } catch (e) {
            console.error(`Batch ${i+1} reviews error:`, e);
            continue;
        }
    }

    return allReviews;
};

export const generateActionImages = async (product: ProductDetails, styles: AIImageStyle[], count: number, customPrompt?: string): Promise<string[]> => {
    const ai = getAIInstance();
    const images: string[] = [];

    for (let i = 0; i < count; i++) {
        const style = styles[i % styles.length];
        const prompt = customPrompt || `A high-quality ${style} professional photo of ${product.name}. Focus on product details and high-end aesthetic. 4k resolution.`;
        
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { imageConfig: { aspectRatio: "1:1" } }
            });

            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    images.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
                }
            }
        } catch (e) {
            console.error(`Error generating AI image ${i + 1}:`, e);
        }
    }
    return images;
};

export const translateLandingPage = async (content: GeneratedContent, targetLang: string): Promise<GeneratedContent> => {
    const ai = getAIInstance();
    const prompt = `Translate the following landing page JSON content into ${targetLang}. Keep the exact same JSON structure and keys. 
    JSON: ${JSON.stringify(content)}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });

    try {
        return JSON.parse(cleanJson(response.text));
    } catch (e) {
        return content;
    }
};

export const rewriteLandingPage = async (content: GeneratedContent, tone: PageTone): Promise<GeneratedContent> => {
    const ai = getAIInstance();
    const prompt = `Rewrite all headlines, subheadlines, and feature descriptions in this landing page JSON to have a ${tone} marketing tone. 
    JSON: ${JSON.stringify(content)}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });

    try {
        return JSON.parse(cleanJson(response.text));
    } catch (e) {
        return content;
    }
};
