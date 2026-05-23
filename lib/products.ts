export type Product = {
  key: string;
  number?: string;
  title: string;
  audience: string;
  benefit: string;
  image: string;
  priceEnv: string;
  downloadEnv: string;
  fallbackLink: string;
  buttonLabel: string;
};

export const products: Product[] = [
  {
    key: "101",
    number: "101",
    title: "How to Use Life Insurance to Protect Your Mortgage",
    audience: "Homeowners and families",
    benefit:
      "Learn how a properly planned policy can help protect the roof over your family's head when life changes unexpectedly.",
    image: "/assets/covers/series-101.png",
    priceEnv: "STRIPE_PRICE_101",
    downloadEnv: "DOWNLOAD_URL_101",
    fallbackLink: "https://buy.stripe.com/4gM28r2tv9LM5Vu1Ka6Vq05",
    buttonLabel: "Buy Series 101"
  },
  {
    key: "102",
    number: "102",
    title: "How to Use Life Insurance for College Funding",
    audience: "Parents and guardians",
    benefit:
      "Discover how protection planning can also support long-term education goals and give children a stronger financial start.",
    image: "/assets/covers/series-102.png",
    priceEnv: "STRIPE_PRICE_102",
    downloadEnv: "DOWNLOAD_URL_102",
    fallbackLink: "https://buy.stripe.com/dRmdR9ecdcXY83C88y6Vq06",
    buttonLabel: "Buy Series 102"
  },
  {
    key: "103",
    number: "103",
    title: "How to Use Life Insurance to Raise Capital for Business",
    audience: "Small business owners",
    benefit:
      "See how business owners think about liquidity, access, continuity, and capital without giving up ownership too quickly.",
    image: "/assets/covers/series-103.png",
    priceEnv: "STRIPE_PRICE_103",
    downloadEnv: "DOWNLOAD_URL_103",
    fallbackLink: "https://buy.stripe.com/cNi4gz1pr4rs6Zy9cC6Vq07",
    buttonLabel: "Buy Series 103"
  },
  {
    key: "104",
    number: "104",
    title: "How to Use Life Insurance to Save on Taxes",
    audience: "Tax-aware learners",
    benefit:
      "Understand tax-aware policy concepts in plain language so you can ask better planning questions with confidence.",
    image: "/assets/covers/series-104.png",
    priceEnv: "STRIPE_PRICE_104",
    downloadEnv: "DOWNLOAD_URL_104",
    fallbackLink: "https://buy.stripe.com/cNicN52tv9LMabKbkK6Vq08",
    buttonLabel: "Buy Series 104"
  },
  {
    key: "105",
    number: "105",
    title: "How to Use Life Insurance for Lifetime Income",
    audience: "Retirement planners",
    benefit:
      "Explore how life insurance can fit into conversations about retirement income, access, protection, and peace of mind.",
    image: "/assets/covers/series-105.png",
    priceEnv: "STRIPE_PRICE_105",
    downloadEnv: "DOWNLOAD_URL_105",
    fallbackLink: "https://buy.stripe.com/8x2fZh4BD4rsgA8gF46Vq09",
    buttonLabel: "Buy Series 105"
  },
  {
    key: "106",
    number: "106",
    title: "How to Use Life Insurance to Protect Your Assets",
    audience: "Legacy-minded families",
    benefit:
      "Learn why beneficiary planning, probate awareness, and protection education matter for keeping more wealth in the family.",
    image: "/assets/covers/series-106.png",
    priceEnv: "STRIPE_PRICE_106",
    downloadEnv: "DOWNLOAD_URL_106",
    fallbackLink: "https://buy.stripe.com/eVqeVdecd2jkcjS4Wm6Vq0a",
    buttonLabel: "Buy Series 106"
  },
  {
    key: "107",
    number: "107",
    title: "How to Create a Million-Dollar Baby Using Life Insurance",
    audience: "Parents building early",
    benefit:
      "Understand the power of starting early and building a financial foundation for children with long-term intention.",
    image: "/assets/covers/series-107.png",
    priceEnv: "STRIPE_PRICE_107",
    downloadEnv: "DOWNLOAD_URL_107",
    fallbackLink: "https://buy.stripe.com/3cIeVd7NP7DE97G1Ka6Vq0b",
    buttonLabel: "Buy Series 107"
  },
  {
    key: "108",
    number: "108",
    title: "How to Transfer Generational Wealth Using Life Insurance",
    audience: "First-generation wealth builders",
    benefit:
      "Learn how families can pass on more than money by combining protection, planning, values, and financial education.",
    image: "/assets/covers/series-108.png",
    priceEnv: "STRIPE_PRICE_108",
    downloadEnv: "DOWNLOAD_URL_108",
    fallbackLink: "https://buy.stripe.com/eVq28r9VXf66dnW88y6Vq0c",
    buttonLabel: "Buy Series 108"
  },
  {
    key: "109",
    number: "109",
    title: "How to Become Your Own Bank (Infinite Banking)",
    audience: "Liquidity-focused learners",
    benefit: "Study cash value, disciplined access, and infinite banking concepts without the confusion or hype.",
    image: "/assets/covers/series-109.png",
    priceEnv: "STRIPE_PRICE_109",
    downloadEnv: "DOWNLOAD_URL_109",
    fallbackLink: "https://buy.stripe.com/9B68wPecd9LM0Ba2Oe6Vq0d",
    buttonLabel: "Buy Series 109"
  },
  {
    key: "110",
    number: "110",
    title: "How to Use Life Insurance for Living Benefits",
    audience: "Families seeking flexibility",
    benefit:
      "Learn how living benefits may support families during illness, injury, care needs, or other major life disruptions.",
    image: "/assets/covers/series-110.png",
    priceEnv: "STRIPE_PRICE_110",
    downloadEnv: "DOWNLOAD_URL_110",
    fallbackLink: "https://buy.stripe.com/8x28wP0ln2jkabKcoO6Vq0e",
    buttonLabel: "Buy Series 110"
  }
];

export const bundleProduct: Product = {
  key: "bundle",
  title: "Complete Digital Bundle",
  audience: "Full educational pathway",
  benefit:
    "The full Business Decode series brings all 10 educational topics into one practical collection for protection, income awareness, asset protection, business funding, tax education, and legacy planning.",
  image: "/assets/covers/bundle.png",
  priceEnv: "STRIPE_PRICE_BUNDLE",
  downloadEnv: "DOWNLOAD_URL_BUNDLE",
  fallbackLink: "https://buy.stripe.com/8x2eVd6JLf66gA8ewW6Vq0f",
  buttonLabel: "Buy Complete Bundle"
};

export const allCheckoutProducts = [bundleProduct, ...products];
