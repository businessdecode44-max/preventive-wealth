"use client";

import { FormEvent, useState } from "react";

const resourcePacks: Record<string, string[]> = {
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

export function LeadForm() {
  const [note, setNote] = useState("Your resource pack will download instantly after you submit the form.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const interest = String(formData.get("interest") || "Family protection");

    const lead = {
      name,
      email,
      interest,
      createdAt: new Date().toISOString()
    };
    const leads = JSON.parse(localStorage.getItem("preventiveWealthLeads") || "[]") as typeof lead[];
    leads.push(lead);
    localStorage.setItem("preventiveWealthLeads", JSON.stringify(leads));

    const selectedPack = resourcePacks[interest] || resourcePacks["Family protection"];
    const checklist = [
      "Preventive Wealth Resource Pack",
      "Prepared for: " + name,
      "Email: " + email,
      "Main interest: " + interest,
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

    setNote("Checklist downloaded. Check your downloads folder for the guide.");
    form.reset();
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </label>
      <label>
        Main interest
        <select name="interest">
          <option>Family protection</option>
          <option>Business funding</option>
          <option>Tax education</option>
          <option>Generational wealth</option>
          <option>Living benefits</option>
        </select>
      </label>
      <button className="button button-primary" type="submit">
        Get the Checklist
      </button>
      <p className="form-note">{note}</p>
    </form>
  );
}
