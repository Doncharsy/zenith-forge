import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import { contactEmail } from "@/lib/site";

const legalName = "Zenith Forge LTD";

export const metadata: Metadata = {
  title: "Does My Website Need a Privacy Policy?",
  description:
    "Short answer: yes, if you collect any personal data at all, even just an email address. Here's what that means in practice, plus Zenith Forge LTD's own privacy policy for zenithforgestudio.com.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Cursor />
      <Nav solid />

      <article className="zf-article">
        <Link href="/" className="zf-article__back">
          ← BACK TO HOME
        </Link>

        <h1 className="zf-article__title">Privacy Policy</h1>
        <p className="zf-article__excerpt">
          Last updated August 2026. This page explains what data {legalName} collects,
          why we collect it, how we use it, and the rights you have over it.
        </p>

        <div className="zf-prose">
          <h2>Does my website need a privacy policy?</h2>
          <p>
            Short answer: almost certainly yes. If your site or app collects any personal
            data at all, even just an email address through a newsletter or contact form,
            you need a privacy policy under laws like Nigeria&apos;s Data Protection Act
            and, if you have users in Europe, GDPR. It is one of a small stack of
            compliance documents most sites end up needing; we cover the rest, including
            terms of service, cookie consent, and app store requirements, in{" "}
            <Link href="/blog/your-site-is-live-is-it-legal">
              Your Site Is Live. Is It Legal?
            </Link>
            .
          </p>
          <p>
            Below is our own privacy policy for zenithforgestudio.com, which doubles as a
            plain-language example of what one should actually cover.
          </p>

          <h2>Who we are</h2>
          <p>
            {legalName} (&ldquo;Zenith Forge&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) is a tech company and consultancy building websites, apps,
            AI agents and data pipelines. This policy applies to everyone who visits
            zenithforgestudio.com or subscribes to our newsletter, and explains our
            practices in plain language.
          </p>

          <h2>The personal data we collect</h2>
          <p>
            We keep this deliberately narrow. The only personal data we collect is the{" "}
            <strong>email address</strong> you give us when you subscribe to our
            newsletter, The Forge Dispatch. We do not ask for your name, phone number,
            physical address, or any other personal detail to subscribe, and we do not
            require an account or login to use this website.
          </p>
          <p>
            We do not sell, rent, or trade your data to anyone, for any reason.
          </p>

          <h2>Device and technical information</h2>
          <p>
            Like most websites, we may automatically collect some general technical
            information when you browse the site, such as your device type, browser,
            approximate location, and which pages you visit. This is used only in
            aggregate, to help us understand how the site is performing and to improve
            the experience. It is not used to build a profile of you or to identify you
            personally.
          </p>

          <h2>How we use your data</h2>
          <p>Your email address is used to:</p>
          <ul>
            <li>Send you our newsletter, The Forge Dispatch.</li>
            <li>Send you promotional material about our services and offers.</li>
            <li>Send you educative content, guides, and updates we think are useful to you.</li>
            <li>Send operational messages related to your subscription, such as unsubscribe confirmations.</li>
          </ul>
          <p>
            We process your email address on the basis of your consent, given when you
            submit the subscription form. You are free to withdraw that consent at any
            time, as explained under &ldquo;Your rights&rdquo; below.
          </p>

          <h2>Sharing your data</h2>
          <p>
            We do not sell your data. We do not share your email address with third
            parties for their own marketing purposes. We may use trusted service
            providers strictly to help us operate the newsletter and the website (for
            example, to send emails or host the site); these providers only process
            data on our instructions and are not permitted to use it for anything else.
          </p>

          <h2>How long we keep your data</h2>
          <p>
            We keep your email address for as long as you remain subscribed. If you
            unsubscribe, or ask us to delete your data, we remove it or anonymise it
            within a reasonable timeframe, except where we are required to retain a
            minimal record (such as proof of consent or an unsubscribe request) to
            comply with our legal obligations.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, data protection laws such as the EU/UK General
            Data Protection Regulation (GDPR) and Nigeria&apos;s Data Protection Act /
            NDPR give you a number of rights over your personal data. We honour these
            rights for all our subscribers, wherever they are based. You have the right
            to:
          </p>
          <ul>
            <li>
              <strong>Access</strong> — ask us to confirm whether we hold data about you,
              and request a copy of it.
            </li>
            <li>
              <strong>Rectification</strong> — ask us to correct any inaccurate or
              incomplete data we hold about you.
            </li>
            <li>
              <strong>Erasure</strong> (&ldquo;the right to be forgotten&rdquo;) — ask us
              to delete your email address and any associated data from our records.
            </li>
            <li>
              <strong>Restriction</strong> — ask us to pause or limit how we use your
              data while a request or dispute is resolved.
            </li>
            <li>
              <strong>Object</strong> — object to us processing your data, including for
              promotional or educative material, at any time and for any reason.
            </li>
            <li>
              <strong>Withdraw consent</strong> — withdraw your consent to receive our
              newsletter at any time, free of charge, without affecting the lawfulness
              of processing carried out before you withdrew it. The simplest way to do
              this is the unsubscribe link in any email we send.
            </li>
            <li>
              <strong>Data portability</strong> — ask us for your data in a structured,
              commonly used, machine readable format, or ask us to transmit it to
              another provider where technically feasible.
            </li>
            <li>
              <strong>No automated decision-making</strong> — we do not use your data to
              make any automated decisions about you, including profiling, that would
              produce legal or similarly significant effects.
            </li>
            <li>
              <strong>Lodge a complaint</strong> — if you believe we have mishandled your
              data, you have the right to complain to your local data protection
              authority: the Nigeria Data Protection Commission (NDPC) if you are in
              Nigeria, or the relevant supervisory authority in your EU/UK member state
              if you are covered by GDPR. We would, however, appreciate the chance to
              put things right first — please contact us before escalating.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email us using the details below. We will
            respond within a reasonable timeframe and, in any event, within the period
            required by applicable law (generally 30 days). We may need to verify your
            identity before actioning certain requests, to protect your data from being
            accessed by the wrong person.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            Our newsletter and website are intended for a general business and
            professional audience. We do not knowingly collect data from children. If
            you believe a child has provided us with their email address, contact us and
            we will delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time as our practices, tools, or
            applicable law change. Material changes will be reflected by an updated
            &ldquo;last updated&rdquo; date at the top of this page. We encourage you to
            review this page occasionally.
          </p>

          <h2>Contact us</h2>
          <p>
            For any privacy question, to exercise any of the rights above, or to request
            that we delete your data, email us at{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </article>

      <div style={{ background: "var(--zf-ink)", color: "var(--zf-paper)", padding: "0 clamp(16px, 4vw, 32px)" }}>
        <Footer flat />
      </div>
    </>
  );
}
