const path = require('path');
const productsData = require('../data/products.json');

// Load seeded questions dataset (3000 questions across 30 intents)
let questionsData = [];
try {
  questionsData = require('../data/questions.json');
} catch (err) {
  console.warn('⚠️ Could not load local questions.json dataset:', err.message);
}

// Helper to format products catalog for context
const getCatalogContext = () => {
  return productsData.map(p => 
    `• [ID: ${p.id}] ${p.name} | Category: ${p.category} | Price: ₹${p.price.toLocaleString('en-IN')} | Specs: ${p.specs} | Rating: ${p.rating}★ | Stock: ${p.inStock ? 'Available' : 'Out of Stock'}`
  ).join('\n');
};

const getSystemPrompt = () => `You are KathaaAI, the official AI Shopping Assistant for BS3 Electronics.
Your tone must be polite, helpful, enthusiastic, professional, and trustworthy.

STORE IDENTITY & POLICIES:
- Store Name: BS3 Electronics (Next-Gen Tech. Unbeatable Prices.)
- Assistant Name: KathaaAI
- Delivery Policy: Free express delivery across India on orders above ₹1,000. Delivered within 2-4 working days.
- Return & Refund Policy: 7-day hassle-free replacement or refund for damaged, defective, or incorrect products.
- Warranty Policy: 1-Year comprehensive brand warranty on all laptops, mobiles, audio devices, smartwatches, and electronics.
- Customer Care: Available Monday to Saturday (10:00 AM - 8:00 PM) via contact page or support@bs3electronics.in.

BS3 ELECTRONICS PRODUCT CATALOG:
${getCatalogContext()}

YOUR INSTRUCTIONS:
1. Always introduce yourself as KathaaAI when greeting a customer.
2. Answer politely and recommend products from the BS3 Electronics catalog above when appropriate.
3. When recommending any product from the catalog, ALWAYS include its exact ID in square brackets like [bs3-lap-01] or [bs3-pho-01]. The website frontend will automatically transform any [ID] tag into an interactive Product Card with an 'Add to Cart' button!
4. Answer questions about shopping, electronics specifications, warranty, delivery, and return policy clearly.
5. If you do not know the answer to a question, or if information is unavailable, you MUST reply EXACTLY with:
"Sorry, as a bot I couldn’t find an answer for that.

You can rephrase your question, or talk to our team"
6. Keep formatting clean with Markdown (bullet points, bold highlights).`;


// Stopwords to filter out during keyword scoring against seeded questions
const STOPWORDS = new Set(['what', 'how', 'when', 'where', 'which', 'who', 'why', 'can', 'the', 'is', 'are', 'for', 'and', 'with', 'have', 'has', 'does', 'do', 'will', 'would', 'should', 'could', 'about', 'from', 'that', 'this', 'there', 'their', 'our', 'your', 'you', 'please', 'tell', 'show', 'any']);

const DOMAIN_KEYWORDS = new Set(['laptop', 'mobile', 'phone', 'smartphone', 'samsung', 'iphone', 'apple', 'oneplus', 'headphone', 'earphone', 'audio', 'airpod', 'boat', 'sony', 'earbud', 'watch', 'smartwatch', 'tv', 'television', 'monitor', 'mouse', 'keyboard', 'asus', 'lenovo', 'hp', 'dell', 'lg', 'xiaomi', 'realme', 'intel', 'ryzen', 'nvidia', 'speaker', 'soundbar', 'camera', 'tablet', 'ipad', 'charger', 'cable', 'warranty', 'guarantee', 'refund', 'replace', 'replacement', 'return', 'cancel', 'cancellation', 'shipping', 'delivery', 'deliver', 'track', 'tracking', 'order', 'discount', 'offer', 'coupon', 'promo', 'sale', 'emi', 'finance', 'loan', 'payment', 'support', 'contact', 'care', 'customer', 'complaint', 'review', 'rating', 'wishlist', 'cart', 'policy']);

// Match user message against seeded 3000-question intent dataset
const matchQuestionIntent = (userMessage) => {
  if (!questionsData || questionsData.length === 0) return null;
  const text = userMessage.toLowerCase().trim();

  // 1. Check exact string match in questions dataset
  for (const item of questionsData) {
    if (item.question && text === item.question.toLowerCase().trim()) {
      return item.intent;
    }
  }

  // 2. Score by domain keyword overlap against the 3000 questions
  const words = text.split(/[^a-z0-9]/).filter(w => w.length >= 3 && !STOPWORDS.has(w) && DOMAIN_KEYWORDS.has(w));
  if (words.length === 0) return null;

  let bestIntent = null;
  let maxMatches = 0;

  for (const item of questionsData) {
    if (!item.question) continue;
    const qWords = new Set(item.question.toLowerCase().split(/[^a-z0-9]/));
    let count = 0;
    for (const w of words) {
      if (qWords.has(w)) count++;
    }
    if (count > maxMatches && count >= 1) {
      maxMatches = count;
      bestIntent = item.intent;
    }
  }

  return bestIntent;
};

// Reusable Gemini API integration service
const callGeminiAPI = async (userMessage, chatHistory = []) => {
  // 1. Strictly prioritize our 3,000-question intent dataset & store policies/products for accurate responses
  // If no match in dataset, returns exact fallback message: "Sorry, as a bot I couldn’t find an answer for that..."
  const matchedIntent = matchQuestionIntent(userMessage);
  return generateKathaaLocalReply(userMessage, matchedIntent);
};

const generateKathaaLocalReply = (message, matchedIntentParam = null) => {
  const text = message.toLowerCase();
  const matchedIntent = matchedIntentParam || matchQuestionIntent(message);


  // 1. Store Policies & Customer Service Intents (17 CSVs)
  if (matchedIntent === 'cancellation_policy' || text.includes('cancel')) {
    return `You can cancel your order easily from the **My Orders** section (\`/orders\`) before it is dispatched! Once canceled, refunds are processed automatically within **3-5 business days** to your original payment source.`;
  }

  if (matchedIntent === 'compatibility' || text.includes('compatible')) {
    return `All **BS3 Electronics** accessories, monitors, and audio gear are universally compatible with **Windows**, **macOS**, **Android**, and **iOS** devices via USB-C, Bluetooth 5.3, or HDMI 2.1!`;
  }

  if (matchedIntent === 'coupons' || matchedIntent === 'gift_cards' || text.includes('coupon') || text.includes('voucher') || text.includes('gift card')) {
    return `You can apply coupon codes and **BS3 Gift Cards** directly at checkout! Try our college demo coupon code **COLLEGE10** for an instant 10% student discount on your entire order.`;
  }

  if (matchedIntent === 'customer_support' || matchedIntent === 'technical_support' || matchedIntent === 'troubleshooting' || matchedIntent === 'installation' || text.includes('support') || text.includes('customer care') || text.includes('contact') || text.includes('install')) {
    return `Our dedicated **BS3 Technical & Customer Support Team** is available Monday to Saturday (10:00 AM – 8:00 PM) via email at **support@bs3electronics.in** or toll-free at **1800-240-7000**. We also offer doorstep installation assistance for televisions and appliances!`;
  }

  if (matchedIntent === 'emi_finance' || matchedIntent === 'payment_methods' || text.includes('payment') || text.includes('cod') || text.includes('emi') || text.includes('upi') || text.includes('card') || text.includes('finance')) {
    return `We accept all major payment methods including **UPI (GPay, PhonePe, Paytm)**, **Credit/Debit Cards**, **Net Banking**, and **No-Cost EMI**. **Cash on Delivery (COD)** is also available on verified orders!`;
  }

  if (matchedIntent === 'privacy_security' || matchedIntent === 'account_login' || text.includes('privacy') || text.includes('security') || text.includes('password') || text.includes('login') || text.includes('account')) {
    return `At **BS3 Electronics**, your account and transactions are secured with 256-bit SSL encryption and JWT authentication. Your personal details are never shared with third parties. You can log in using your student/college demo account!`;
  }

  if (matchedIntent === 'replacement_policy' || matchedIntent === 'return_policy' || text.includes('return') || text.includes('refund') || text.includes('replace')) {
    return `Our **7-Day Return & Refund Policy** ensures a hassle-free experience! If you receive a defective, damaged, or incorrect product, you can initiate a return or replacement within 7 days of delivery with full refund guarantee.`;
  }

  if (matchedIntent === 'reviews_ratings' || matchedIntent === 'seller_information' || text.includes('review') || text.includes('rating') || text.includes('genuine') || text.includes('seller')) {
    return `All products sold on **BS3 Electronics** are 100% genuine and sourced directly from authorized brand manufacturers (ASUS, Sony, Samsung, Apple) with verified buyer ratings!`;
  }

  if (matchedIntent === 'shipping_delivery' || text.includes('delivery') || text.includes('shipping') || text.includes('time')) {
    return `We offer **Free Express Shipping** across India on orders above ₹1,000! Most orders are delivered securely within **2 to 4 working days** with live order tracking.`;
  }

  if (matchedIntent === 'subscriptions' || text.includes('newsletter') || text.includes('subscribe')) {
    return `Subscribe to our BS3 Electronics newsletter in the footer to receive instant updates on flash sales, new product drops, and exclusive student discounts!`;
  }

  if (matchedIntent === 'warranty' || text.includes('warranty')) {
    return `At **BS3 Electronics**, we offer a **1-Year comprehensive brand warranty** on all laptops, smartphones, audio gear, smartwatches, and electronics. You can claim warranty assistance directly through our authorized brand service partners!`;
  }

  if (matchedIntent === 'wishlist_cart' || text.includes('wishlist') || text.includes('cart')) {
    return `You can save your favorite items to your Cart anytime! Prices and discounts are locked when you proceed to checkout.`;
  }

  if (matchedIntent === 'greetings' || matchedIntent === 'small_talk' || /^(hi|hello|hey|start|greetings|good morning|good afternoon|good evening|good night|namaste|hola|howdy|sup|what'?s up|hi there|hello friend)$/i.test(text.trim())) {
    return `Hello! 👋 I am **KathaaAI**, your AI Shopping Assistant at **BS3 Electronics**.\n\nHow can I help you today? I can recommend best-selling electronics, show you our **top discounted deals & offers**, compare specifications, or answer questions about our warranty, delivery, and 7-day refund policies!`;
  }

  if (matchedIntent === 'thanks' || /^(thanks|thank you|thx|tq|thank u|dhanyawad|shukriya|much appreciated|thanks a lot|thankyou|thanks bot|thank you so much)/i.test(text.trim())) {
    return `You’re very welcome! 😊 Always happy to help you shop at **BS3 Electronics**! Let me know if you need any other electronics recommendations, discount offers, or help with your orders!`;
  }

  if (matchedIntent === 'sorry' || /^(sorry|my bad|oops|apologies|so sorry|maaf karna|i am sorry|sorry bot|sorry about that)/i.test(text.trim())) {
    return `No need to apologize at all! 😄 I’m here 24/7 to help you out. Feel free to ask me anything about our laptops, mobiles, audio gear, or store policies!`;
  }

  if (matchedIntent === 'who_are_you' || /who (are|r) (you|u)|what is your name|your name|who is kathaa|what are you|are you ai|are you a bot|who made you|what is kathaaai/i.test(text)) {
    return `I am **KathaaAI** 🤖, the official AI Shopping Assistant for **BS3 Electronics**! My mission is to help you discover top electronics from our catalog, compare specs, find college demo discounts, and assist with store policies.`;
  }

  if (matchedIntent === 'why_are_you_here' || /why (are|r) (you|u) here|what do you do|what is your purpose|what can you do|how can you help|what are your capabilities|why do you exist/i.test(text)) {
    return `I am here to make your shopping experience at **BS3 Electronics** effortless and smart! 🚀\n\nHere’s what I can do for you:\n• **Recommend** best-selling Laptops, Smartphones, Audio gear, and Smartwatches\n• **Show you** live discounts, college demo coupons, and student offers\n• **Explain** our 7-Day Refund, Warranty, EMI, and Delivery policies\n• **Help you** navigate the store and pick the right tech\n\nWhat would you like to explore today?`;
  }


  if (matchedIntent === 'how_are_you' || /how are you|how r u|how are u|how do you do|how are you doing|kaise ho|kaisa hai|hows it going/i.test(text)) {
    return `I’m doing fantastic and ready to help you shop! ⚡ Thank you for asking! How can I assist you today at **BS3 Electronics**?`;
  }

  if (matchedIntent === 'goodbye' || /^(bye|goodbye|see you|ttyl|cya|alvida|tata|exit|close|bye bye)/i.test(text.trim())) {
    return `Goodbye! 👋 Have a wonderful day ahead! Thank you for visiting **BS3 Electronics**. Whenever you're ready to shop again, I'll be right here!`;
  }


  // 2. Accessories CSV Handler
  if (matchedIntent === 'accessories' || text.includes('charger') || text.includes('cable') || text.includes('accessory') || text.includes('mouse') || text.includes('keyboard')) {
    const accProducts = productsData.filter(p => p.category === 'Accessories');
    const displayAcc = (accProducts.length > 0 ? accProducts : productsData).slice(0, 3);
    let reply = `Yes! We offer a full range of genuine **BS3 Electronics Accessories** including fast chargers, USB-C/HDMI cables, laptop sleeves, and wireless peripherals. All accessories come with our **1-Year Brand Warranty**:\n\n`;
    displayAcc.forEach(p => {
      const discount = p.discountPercent || Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) || 15;
      reply += `• **${p.name}** — **₹${p.price.toLocaleString('en-IN')}** *(Save **${discount}% OFF**!)*\n  *${p.specs}* [${p.id}]\n\n`;
    });
    reply += `Click **Add to Cart** on any card above to order!`;
    return reply;
  }

  // 3. Category-aware discounts and offers search
  if (matchedIntent === 'discounts_offers' || text.includes('discount') || text.includes('offer') || text.includes('sale') || text.includes('deal') || text.includes('cheap') || text.includes('save') || text.includes('mrp') || text.includes('price')) {
    let categoryFilter = null;
    let categoryLabel = '';
    if (text.includes('laptop') || text.includes('coding') || text.includes('macbook') || text.includes('asus') || text.includes('computer')) {
      categoryFilter = 'Laptops';
      categoryLabel = ' in Laptops';
    } else if (text.includes('mobile') || text.includes('phone') || text.includes('smartphone') || text.includes('samsung') || text.includes('iphone') || text.includes('5g') || text.includes('oneplus')) {
      categoryFilter = 'Smartphones';
      categoryLabel = ' in Smartphones & Mobiles';
    } else if (text.includes('headphone') || text.includes('earphone') || text.includes('audio') || text.includes('airpod') || text.includes('boat') || text.includes('sony') || text.includes('earbud')) {
      categoryFilter = 'Audio';
      categoryLabel = ' in Audio & Headphones';
    } else if (text.includes('watch') || text.includes('smartwatch') || text.includes('fitness')) {
      categoryFilter = 'Smartwatches';
      categoryLabel = ' in Smartwatches';
    } else if (text.includes('tv') || text.includes('television') || text.includes('4k') || text.includes('oled')) {
      categoryFilter = 'Televisions';
      categoryLabel = ' in Televisions';
    } else if (text.includes('monitor') || text.includes('mouse') || text.includes('keyboard') || text.includes('accessory')) {
      categoryFilter = 'Accessories';
      categoryLabel = ' in Accessories';
    }

    const sourceProducts = categoryFilter 
      ? productsData.filter(p => p.category === categoryFilter)
      : productsData;

    // Sort products by discount percent descending
    const sortedByDiscount = [...sourceProducts].sort((a, b) => (b.discountPercent || 15) - (a.discountPercent || 15));
    const topDeals = sortedByDiscount.slice(0, 3);

    let reply = `Here are the **Top Discounted Deals & Offers${categoryLabel}** currently live on **BS3 Electronics**:\n\n`;
    topDeals.forEach(p => {
      const discount = p.discountPercent || Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) || 20;
      reply += `• **${p.name}** — **₹${p.price.toLocaleString('en-IN')}** *(MRP: ₹${p.originalPrice.toLocaleString('en-IN')} | Save **${discount}% OFF**!)*\n  *${p.specs}* [${p.id}]\n\n`;
    });
    reply += `All deals include **Free Express Delivery** and **1-Year Brand Warranty**. Click **Add to Cart** on any card above to claim this discount!`;
    return reply;
  }

  // 4. Product discovery, comparison, specifications, and availability search across all 160+ products
  let categoryFilter = null;
  if (text.includes('laptop') || text.includes('coding') || text.includes('macbook') || text.includes('asus') || text.includes('computer')) {
    categoryFilter = 'Laptops';
  } else if (text.includes('mobile') || text.includes('phone') || text.includes('smartphone') || text.includes('samsung') || text.includes('iphone') || text.includes('5g') || text.includes('oneplus')) {
    categoryFilter = 'Smartphones';
  } else if (text.includes('headphone') || text.includes('earphone') || text.includes('audio') || text.includes('airpod') || text.includes('boat') || text.includes('sony') || text.includes('earbud')) {
    categoryFilter = 'Audio';
  } else if (text.includes('watch') || text.includes('smartwatch') || text.includes('fitness')) {
    categoryFilter = 'Smartwatches';
  } else if (text.includes('tv') || text.includes('television') || text.includes('4k') || text.includes('oled')) {
    categoryFilter = 'Televisions';
  } else if (text.includes('monitor') || text.includes('mouse') || text.includes('keyboard') || text.includes('accessory')) {
    categoryFilter = 'Accessories';
  }

  const PRODUCT_KEYWORDS = ['laptop', 'mobile', 'phone', 'smartphone', 'samsung', 'iphone', 'apple', 'oneplus', 'headphone', 'earphone', 'audio', 'airpod', 'boat', 'sony', 'earbud', 'watch', 'smartwatch', 'tv', 'television', 'monitor', 'mouse', 'keyboard', 'asus', 'lenovo', 'hp', 'dell', 'lg', 'xiaomi', 'realme', 'intel', 'ryzen', 'nvidia', 'speaker', 'soundbar', 'camera', 'tablet', 'ipad', 'charger', 'cable'];

  let matchingProducts = [];
  if (categoryFilter) {
    matchingProducts = productsData.filter(p => p.category === categoryFilter);
  } else {
    const hasProductKeyword = PRODUCT_KEYWORDS.some(kw => text.includes(kw));
    if (hasProductKeyword) {
      matchingProducts = productsData.filter(p =>
        PRODUCT_KEYWORDS.some(kw =>
          text.includes(kw) && (
            (p.name && p.name.toLowerCase().includes(kw)) ||
            (p.brand && p.brand.toLowerCase().includes(kw)) ||
            (p.category && p.category.toLowerCase().includes(kw))
          )
        )
      );
    }
  }

  if (!matchingProducts || matchingProducts.length === 0) {
    return `Sorry, as a bot I couldn’t find an answer for that.\n\nYou can rephrase your question, or talk to our team`;
  }




  let introText = `Here are some fantastic electronics recommendations from **BS3 Electronics**:\n\n`;
  if (matchedIntent === 'product_comparison') {
    introText = `I can help you compare specifications, pricing, and performance! Here are our top electronics to compare:\n\n`;
  } else if (matchedIntent === 'product_specifications') {
    introText = `Our electronics feature cutting-edge specifications including AMOLED displays, high-speed processors, and fast charging:\n\n`;
  } else if (matchedIntent === 'product_availability') {
    introText = `We maintain real-time warehouse inventory! Here are our in-stock bestsellers ready for immediate dispatch:\n\n`;
  } else if (matchedIntent === 'product_price') {
    introText = `At **BS3 Electronics**, we offer unbeatable manufacturer-direct pricing! Here are our best value deals:\n\n`;
  } else if (matchedIntent === 'product_discovery') {
    introText = `Here are our **Top Bestselling Products** handpicked for quality and performance:\n\n`;
  }

  let reply = introText;
  matchingProducts.slice(0, 3).forEach(p => {
    const discount = p.discountPercent || Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) || 15;
    reply += `• **${p.name}** — **₹${p.price.toLocaleString('en-IN')}** *(Save **${discount}% OFF**!)*\n  *${p.specs}* [${p.id}]\n\n`;
  });
  reply += `Would you like more details about any of these? You can click **Add to Cart** directly on the card!`;

  return reply;
};

module.exports = { callGeminiAPI, getSystemPrompt, matchQuestionIntent };
