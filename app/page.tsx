import Image from "next/image";
import { AffiliateSection } from "@/components/AffiliateSection";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { ProductGrid } from "@/components/ProductGrid";
import { TrackedLink } from "@/components/TrackedLink";
import { VideoLibrary } from "@/components/VideoLibrary";
import { bundleProduct } from "@/lib/products";

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

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="series-label">Business Decode Series 101-110</p>
            <h1>Financial Literacy as Prevention</h1>
            <p className="hero-statement">
              Life insurance is not just for when you die. It is a wealth literacy tool for how you live,
              protect, build, and leave a legacy.
            </p>
            <p className="hero-proof">
              This 10-part digital series shows families, professionals, and business owners how the wealthy think
              about protection, access, tax awareness, business capital, living benefits, and multi-generational legacy.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <CheckoutButton productKey="bundle" productName={bundleProduct.title}>
                Get the Complete Bundle
              </CheckoutButton>
              <a className="button button-secondary" href="#series">
                Explore the Series
              </a>
              <a className="button button-text" href="#videos">
                Watch Free Lessons
              </a>
            </div>
            <div className="trust-strip" aria-label="Core audiences">
              <span>Families</span>
              <span>Young Professionals</span>
              <span>Business Owners</span>
              <span>First-Generation Wealth Builders</span>
            </div>
          </div>
          <figure className="hero-media">
            <Image
              src="/assets/covers/bundle.png"
              alt="The 10 Benefits of Life Insurance Beyond the Death Benefit complete digital bundle"
              width={1080}
              height={1600}
              priority
            />
          </figure>
        </section>

        <section className="section intro-band" aria-labelledby="positioning-title">
          <div>
            <h2 id="positioning-title">A public education platform for protection-based wealth literacy.</h2>
          </div>
          <p>
            Preventive Wealth helps individuals and families understand how money, protection, debt, taxes,
            insurance literacy, and legacy work together before financial emergencies happen.
          </p>
        </section>

        <section className="section persuasion-section" aria-labelledby="why-title">
          <div className="section-heading">
            <p className="section-kicker">Why This Series Matters</p>
            <h2 id="why-title">Most people own life insurance. Few are taught how to understand it.</h2>
            <p>
              These guides simplify advanced planning ideas into practical education so you can ask better questions,
              avoid costly assumptions, and prepare your family before pressure or crisis forces a decision.
            </p>
          </div>
          <div className="proof-grid">
            <article>
              <h3>Protect What You Are Building</h3>
              <p>
                Learn how protection planning connects to your mortgage, income, family stability, assets, and business
                continuity.
              </p>
            </article>
            <article>
              <h3>Use Wealth Tools With Clarity</h3>
              <p>
                Understand cash value, access, tax awareness, living benefits, and infinite banking concepts without
                confusing jargon.
              </p>
            </article>
            <article>
              <h3>Think Beyond One Generation</h3>
              <p>
                Build financial literacy around college funding, early planning for children, and intentional legacy
                transfer.
              </p>
            </article>
          </div>
        </section>

        <section id="series" className="section series-section" aria-labelledby="series-title">
          <div className="section-heading">
            <p className="section-kicker">eBook Series</p>
            <h2 id="series-title">10 focused guides. One complete strategy map.</h2>
            <p>
              Start with the guide that matches your current question, or choose the complete bundle for the full
              educational pathway.
            </p>
          </div>

          <article className="bundle-feature">
            <Image src="/assets/covers/bundle.png" alt="Complete bundle graphic" width={1080} height={1600} />
            <div>
              <h3>Complete Digital Bundle</h3>
              <p>
                The full Business Decode series brings all 10 educational topics into one practical collection for
                protection, income awareness, asset protection, business funding, tax education, and legacy planning.
              </p>
              <p>
                If you want the full picture instead of learning one strategy at a time, the bundle is the clearest
                place to start. It helps you see how each benefit connects to the next: protect today, grow with
                discipline, access wisely, and leave a stronger foundation.
              </p>
              <CheckoutButton productKey="bundle" productName={bundleProduct.title}>
                Buy Complete Bundle
              </CheckoutButton>
            </div>
          </article>

          <ProductGrid />
        </section>

        <section id="blog" className="section learning-section" aria-labelledby="blog-title">
          <div className="section-heading align-left">
            <p className="section-kicker">Blog</p>
            <h2 id="blog-title">Read before you buy. Learn before you decide.</h2>
            <p>
              Explore practical lessons on protection, debt, taxes, income, and legacy so you can make more informed
              financial decisions for your family, business, and future.
            </p>
          </div>
          <div className="article-grid">
            {articles.map(([number, title, description]) => (
              <article className="article-card" key={number}>
                <span>Series {number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <VideoLibrary />
        <AffiliateSection />

        <section id="checklist" className="section checklist-section" aria-labelledby="checklist-title">
          <div className="checklist-copy">
            <p className="section-kicker">Free Resource</p>
            <h2 id="checklist-title">Download Your Preventive Wealth Resource Pack</h2>
            <p>
              Enter your details to receive a practical starter pack with checklists, planning prompts, and a topic
              guide matched to your main area of interest.
            </p>
            <ul className="benefit-list">
              <li>10 benefits beyond the death benefit.</li>
              <li>Questions to ask before choosing a policy.</li>
              <li>Protection planning checklist for families and business owners.</li>
              <li>Interest-based guide for your next learning step.</li>
            </ul>
          </div>
          <LeadForm />
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">Book A Session</p>
            <h2 id="contact-title">Teach first. Build trust. Then invite the next step.</h2>
            <p>
              Schedule a free 30-minute financial literacy session to discuss which topic in the series best matches
              your goals, questions, and current season of life.
            </p>
          </div>
          <div className="contact-panel">
            <h3>Suggested session title</h3>
            <p>Free Financial Literacy Session: Understanding Protection, Debt, Taxes, and Legacy Before Crisis Happens.</p>
            <TrackedLink
              className="button button-primary"
              href="https://calendly.com/businessdecode44/30min"
              target="_blank"
              rel="noopener"
              eventName="calendly_click"
              eventPayload={{ location: "contact_section" }}
            >
              Request A Session
            </TrackedLink>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Preventive Wealth</strong>
          <p>Financial Literacy as Prevention</p>
          <p>
            <a href="mailto:info@businessdecodellc.com">info@businessdecodellc.com</a>
          </p>
        </div>
        <p>
          Educational content only. Not financial, tax, legal, or insurance advice. Consult qualified professionals
          before making financial decisions.
        </p>
      </footer>
    </>
  );
}
