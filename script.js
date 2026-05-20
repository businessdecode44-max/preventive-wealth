const products = [
  {
    number: "101",
    title: "How to Use Life Insurance to Protect Your Mortgage",
    audience: "Homeowners and families",
    benefit: "Learn how a properly planned policy can help protect the roof over your family's head when life changes unexpectedly.",
    image: "assets/covers/series-101.png",
    link: "https://buy.stripe.com/4gM28r2tv9LM5Vu1Ka6Vq05"
  },
  {
    number: "102",
    title: "How to Use Life Insurance for College Funding",
    audience: "Parents and guardians",
    benefit: "Discover how protection planning can also support long-term education goals and give children a stronger financial start.",
    image: "assets/covers/series-102.png",
    link: "https://buy.stripe.com/dRmdR9ecdcXY83C88y6Vq06"
  },
  {
    number: "103",
    title: "How to Use Life Insurance to Raise Capital for Business",
    audience: "Small business owners",
    benefit: "See how business owners think about liquidity, access, continuity, and capital without giving up ownership too quickly.",
    image: "assets/covers/series-103.png",
    link: "https://buy.stripe.com/cNi4gz1pr4rs6Zy9cC6Vq07"
  },
  {
    number: "104",
    title: "How to Use Life Insurance to Save on Taxes",
    audience: "Tax-aware learners",
    benefit: "Understand tax-aware policy concepts in plain language so you can ask better planning questions with confidence.",
    image: "assets/covers/series-104.png",
    link: "https://buy.stripe.com/cNicN52tv9LMabKbkK6Vq08"
  },
  {
    number: "105",
    title: "How to Use Life Insurance for Lifetime Income",
    audience: "Retirement planners",
    benefit: "Explore how life insurance can fit into conversations about retirement income, access, protection, and peace of mind.",
    image: "assets/covers/series-105.png",
    link: "https://buy.stripe.com/8x2fZh4BD4rsgA8gF46Vq09"
  },
  {
    number: "106",
    title: "How to Use Life Insurance to Protect Your Assets",
    audience: "Legacy-minded families",
    benefit: "Learn why beneficiary planning, probate awareness, and protection education matter for keeping more wealth in the family.",
    image: "assets/covers/series-106.png",
    link: "https://buy.stripe.com/eVqeVdecd2jkcjS4Wm6Vq0a"
  },
  {
    number: "107",
    title: "How to Create a Million-Dollar Baby Using Life Insurance",
    audience: "Parents building early",
    benefit: "Understand the power of starting early and building a financial foundation for children with long-term intention.",
    image: "assets/covers/series-107.png",
    link: "https://buy.stripe.com/3cIeVd7NP7DE97G1Ka6Vq0b"
  },
  {
    number: "108",
    title: "How to Transfer Generational Wealth Using Life Insurance",
    audience: "First-generation wealth builders",
    benefit: "Learn how families can pass on more than money by combining protection, planning, values, and financial education.",
    image: "assets/covers/series-108.png",
    link: "https://buy.stripe.com/eVq28r9VXf66dnW88y6Vq0c"
  },
  {
    number: "109",
    title: "How to Become Your Own Bank (Infinite Banking)",
    audience: "Liquidity-focused learners",
    benefit: "Study cash value, disciplined access, and infinite banking concepts without the confusion or hype.",
    image: "assets/covers/series-109.png",
    link: "https://buy.stripe.com/9B68wPecd9LM0Ba2Oe6Vq0d"
  },
  {
    number: "110",
    title: "How to Use Life Insurance for Living Benefits",
    audience: "Families seeking flexibility",
    benefit: "Learn how living benefits may support families during illness, injury, care needs, or other major life disruptions.",
    image: "assets/covers/series-110.png",
    link: "https://buy.stripe.com/8x28wP0ln2jkabKcoO6Vq0e"
  }
];

const resourcePacks = {
  "Family protection": [
    "Family Protection Starter Checklist",
    "1. List the monthly income your household depends on.",
    "2. Identify the mortgage, rent, childcare, food, transportation, and debt payments that would still need to be covered.",
    "3. Review who depends on your income and for how long.",
    "4. Confirm that beneficiary names are current.",
    "5. Ask how living benefits, income replacement, and mortgage protection may fit your family plan.",
    "Recommended next guide: Series 101 - Mortgage Protection and Series 110 - Living Benefits."
  ],
  "Business funding": [
    "Business Capital Readiness Checklist",
    "1. List the major expenses your business must cover during slow months.",
    "2. Identify whether your business depends heavily on one owner, partner, or key employee.",
    "3. Review current emergency reserves and available credit lines.",
    "4. Ask how cash value, collateral conversations, and business continuity planning may work together.",
    "5. Separate personal protection needs from business protection needs.",
    "Recommended next guide: Series 103 - Raise Capital for Business and Series 109 - Infinite Banking."
  ],
  "Tax education": [
    "Tax-Aware Planning Conversation Checklist",
    "1. Write down the difference between taxable, tax-deferred, and potentially tax-advantaged money.",
    "2. Ask what rules apply before accessing money from any policy.",
    "3. Review how loans and withdrawals may affect policy values and benefits.",
    "4. Discuss tax questions with a qualified tax professional before making decisions.",
    "5. Focus on education first, not promises of savings.",
    "Recommended next guide: Series 104 - Save on Taxes and Series 105 - Lifetime Income."
  ],
  "Generational wealth": [
    "Generational Wealth Planning Prompts",
    "1. Define what legacy means beyond money: values, education, stability, and opportunity.",
    "2. List the people or causes you want your planning to protect.",
    "3. Review beneficiaries and ownership arrangements with qualified professionals.",
    "4. Discuss how children or grandchildren can be taught financial responsibility early.",
    "5. Identify one planning conversation your family has been delaying.",
    "Recommended next guide: Series 107 - Million-Dollar Baby and Series 108 - Generational Wealth."
  ],
  "Living benefits": [
    "Living Benefits Awareness Checklist",
    "1. Ask what benefits may be available during illness, injury, or major care needs.",
    "2. Review what conditions, waiting periods, and policy rules apply.",
    "3. Understand that access may reduce death benefit and cash value.",
    "4. Discuss care costs, income interruption, and family support needs.",
    "5. Keep policy documents organized and easy for trusted family members to find.",
    "Recommended next guide: Series 110 - Living Benefits and Series 106 - Asset Protection."
  ]
};

const articles = [
  ["101", "Mortgage Protection", "How families can think about keeping the home protected when income is interrupted."],
  ["102", "College Planning", "Why education funding conversations should include protection, time, and flexibility."],
  ["103", "Business Capital", "How entrepreneurs can prepare for capital needs before the pressure arrives."],
  ["104", "Tax Education", "Plain-language ideas for understanding tax-deferred growth and tax-aware planning."],
  ["105", "Lifetime Income", "How protection tools can connect to retirement income and lifestyle confidence."],
  ["106", "Asset Protection", "What families should know about beneficiaries, probate, privacy, and legacy transfer."],
  ["107", "Million-Dollar Baby", "A family-centered look at starting early, building discipline, and preparing children for opportunity."],
  ["108", "Generational Wealth", "How legacy education helps families protect values, assets, and opportunity across generations."],
  ["109", "Infinite Banking", "A beginner-friendly explanation of cash value, access, borrowing, and financial discipline."],
  ["110", "Living Benefits", "Why life insurance education should include what can happen while you are still living."]
];

const productGrid = document.querySelector("#product-grid");
const articleGrid = document.querySelector("#article-grid");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const leadForm = document.querySelector("#lead-form");
const formNote = document.querySelector("#form-note");

productGrid.innerHTML = products
  .map(
    (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="Series ${product.number} cover: ${product.title}" loading="lazy" />
        <div class="product-body">
          <span class="product-meta">Series ${product.number} | ${product.audience}</span>
          <h3>${product.title}</h3>
          <p>${product.benefit}</p>
          <a class="button button-secondary" href="${product.link}" target="_blank" rel="noopener">Buy Series ${product.number}</a>
        </div>
      </article>
    `
  )
  .join("");

articleGrid.innerHTML = articles
  .map(
    ([number, title, description]) => `
      <article class="article-card">
        <span>Series ${number}</span>
        <h3>${title}</h3>
        <p>${description}</p>
      </article>
    `
  )
  .join("");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const lead = {
    name: formData.get("name"),
    email: formData.get("email"),
    interest: formData.get("interest"),
    createdAt: new Date().toISOString()
  };
  const leads = JSON.parse(localStorage.getItem("preventiveWealthLeads") || "[]");
  leads.push(lead);
  localStorage.setItem("preventiveWealthLeads", JSON.stringify(leads));

  const selectedPack = resourcePacks[lead.interest] || resourcePacks["Family protection"];
  const checklist = [
    "Preventive Wealth Resource Pack",
    "Prepared for: " + lead.name,
    "Email: " + lead.email,
    "Main interest: " + lead.interest,
    "",
    "Resource 1: 10 Benefits of Life Insurance Beyond the Death Benefit",
    "",
    "1. Protect income and family stability.",
    "2. Support mortgage protection planning.",
    "3. Build education funding awareness.",
    "4. Strengthen business continuity conversations.",
    "5. Understand tax-aware financial literacy.",
    "6. Explore lifetime income education.",
    "7. Learn asset protection basics.",
    "8. Start legacy planning early.",
    "9. Study cash value and infinite banking concepts.",
    "10. Understand living benefits while you are alive.",
    "",
    "Resource 2: Questions to Ask Before Choosing a Policy",
    "",
    "1. What problem am I trying to solve first: protection, income, education, business capital, tax awareness, or legacy?",
    "2. Who depends on this decision financially?",
    "3. What happens if income stops for 3, 6, or 12 months?",
    "4. What benefits are available while I am alive?",
    "5. How do policy loans, withdrawals, premiums, and beneficiaries work?",
    "6. Which qualified professional should review this with me before I act?",
    "",
    "Resource 3: Interest-Based Starter Guide",
    "",
    ...selectedPack,
    "",
    "Resource 4: Next Learning Path",
    "",
    "Families: Start with Series 101, 102, 106, and 110.",
    "Business owners: Start with Series 103, 104, 106, and 109.",
    "First-generation wealth builders: Start with Series 107, 108, 109, and 110.",
    "Retirement-minded learners: Start with Series 104, 105, 106, and 110.",
    "",
    "Visit preventivewealth.com to explore the full Business Decode Series 101-110.",
    "Questions: info@businessdecodellc.com",
    "",
    "Educational content only. Not financial, tax, legal, or insurance advice."
  ].join("\n");

  const blob = new Blob([checklist], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "preventive-wealth-resource-pack.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  formNote.textContent = "Checklist downloaded. Check your downloads folder for the guide.";
  leadForm.reset();
});
