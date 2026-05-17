import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  Building2,
  BarChart3,
  Palette,
  Cpu,
  Bookmark,
  Video,
  TrendingUp,
  CreditCard,
  Handshake,
} from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import PageTransition from "@/components/PageTransition";
import { useSEO } from "@/hooks/useSEO";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

/* ─────────────────────────── data ─────────────────────────── */

const CATEGORIES = [
  {
    id: "about",
    label: "About the Agency",
    Icon: Building2,
    questions: [
      {
        q: "What is Dubai in Cairo and when was it founded?",
        a: "Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC was founded in 2021 to close a specific gap in the Egyptian market: the gap between the world-class digital execution available in the Gulf and the deep regional knowledge that only a Cairo-based team can offer.\n\nIn four years we have delivered 216+ projects to 36+ clients. Our portfolio spans global pharmaceutical leaders such as Novartis, Sanofi, Novo Nordisk, and Roche; banking and finance with Banque Misr; technology with Huawei; and global institutions including the World Economic Forum.\n\nThe track record matters less than the pattern behind it: every engagement is designed to produce measurable commercial outcomes, not awards-shelf creative.",
      },
      {
        q: "What does the name \"Dubai in Cairo\" mean?",
        a: "It is an operating model, not a tagline. Dubai represents a specific standard of work: precision, speed, polish, and a refusal to accept \"good enough.\" Cairo represents scale, cultural fluency, and access to the largest creative talent pool in the Arab world.\n\nMost agencies pick one side. We engineered the business to deliver both: Gulf-grade output produced by a Cairo team that understands the Egyptian and regional consumer in a way no outside agency can replicate. The name is a daily commitment we measure ourselves against.",
      },
      {
        q: "What types of businesses do you work with?",
        a: "We work across two segments. The first is ambitious local and regional businesses that need a partner to professionalize their digital presence and unlock growth, typically SMEs in their scale-up phase. The second is multinationals managing the Egyptian and North African markets, where they need a local team that meets their global standards without requiring constant supervision.\n\nOur roster reflects both: Novartis, Sanofi, Roche, Novo Nordisk, Banque Misr, Huawei, Beyond Meat, Alpro, Monin, Yorkshire Tea, Berlitz, Thermo King, Shark Tank Egypt, and the World Economic Forum, alongside scaling local brands building their first proper digital infrastructure.",
      },
      {
        q: "Are you an officially certified agency on digital platforms?",
        a: "Yes, and we believe the distinction between \"uses the platform\" and \"certified on the platform\" matters enormously when your budget is on the line.\n\nOur team holds active credentials on Meta via Meta Blueprint, on Google across Ads and Analytics, on LinkedIn Marketing Solutions, on TikTok for Business, on Snapchat for Business, and on the WhatsApp Business API. Beyond certifications we maintain continuous learning through Udacity, Coursera, edX, LinkedIn Learning, Almentor, and Edraak, because the platforms change faster than any certification cycle can capture.",
      },
      {
        q: "What makes Dubai in Cairo different from other Egyptian digital agencies?",
        a: "Three things, and they compound.\n\nFirst, we operate as a 100% digital company with no rent and no idle physical overhead, which means the budget our clients pay flows directly into talent and tools rather than office leases.\n\nSecond, we have built an AI-augmented production system that lets a lean specialist team deliver the output of a much larger traditional agency, using 20+ AI tools embedded in real workflows.\n\nThird, our flexible talent model lets us pull in senior specialists who already hold full-time roles at top regional agencies, giving clients access to expertise that would otherwise cost three to five times more if hired full-time.\n\nThe combination is what produces the price-to-quality ratio we are known for.",
      },
      {
        q: "Who is the founder and CEO?",
        a: "Abdullah Hassan Al-Fawali is the Founder and CEO. His background is deliberately hybrid: a BSc in Mechatronics Engineering and Robotics Technology from the Arab Academy for Science, Technology and Maritime Transport, paired with an MBA in Business Administration and Marketing. That engineering-meets-business profile is reflected in how the agency operates: systems-thinking applied to creative work.\n\nHe brings 10+ years of hands-on experience, has completed 50+ specialized training programs, and holds active memberships in the Egyptian Engineers Syndicate, the Arab Engineers Syndicate, and the Egyptian Traders Syndicate.",
      },
      {
        q: "Is Dubai in Cairo a legally registered company?",
        a: "Yes, fully and transparently. We operate as Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC, registered under Commercial Registration No. 163772 issued by the General Authority for Investment and Free Zones in Cairo.\n\nOur licensed activities cover digital marketing services, e-commerce facilitation, and telecommunications. We are members of the Information Technology Industry Chamber under No. 4568, hold Tax Registration 168-625-168 with the Cairo Companies office, and operate from 100 Al-Mirgani Street, Abu Dhabi Bank Tower, 1st Floor, Heliopolis, Cairo.\n\nEvery detail is provided on request, because trust starts with paperwork.",
      },
    ],
  },
  {
    id: "strategy",
    label: "Business Strategy Studio",
    Icon: BarChart3,
    questions: [
      {
        q: "What does the Business Solutions Studio offer?",
        a: "The Business Solutions Studio is where strategy is built before a single creative is produced. We run feasibility studies and pricing policy work, conduct competitive market analysis, design full digital marketing strategies, deliver structured performance reporting and analytics, train internal marketing teams, optimize contact center operations, and manage the strategic layer of paid advertising.\n\nThe unifying logic is simple: marketing without a strategy is just expense. We structure every engagement so that creative spend is preceded by a clear commercial thesis.",
      },
      {
        q: "We are a new business. Can you help us before we launch digitally?",
        a: "The honest answer is that this is the best time to engage us. Most agencies are hired after a business has already made the expensive mistakes: launched at the wrong price point, targeted the wrong segment, or built brand assets that contradict each other.\n\nWe work with pre-launch businesses to run market validation, define a defensible pricing strategy, identify the highest-ROI audience to attack first, and build a digital marketing plan with budgets and KPIs grounded in reality rather than ambition. You launch with a strategy, not a Facebook page and hope.",
      },
      {
        q: "Can you analyze our competitors and tell us where we stand?",
        a: "Yes, and we do this in a way most agencies skip. Standard competitor analysis lists what competitors are doing. Useful competitor analysis identifies why some of them are growing and others are not, isolates the moves you can credibly replicate, the moves you cannot, and the strategic gaps no one is currently exploiting.\n\nWe deliver that: a positioning recommendation that gives you a defensible reason to exist in your category rather than another \"us too\" message no customer remembers.",
      },
      {
        q: "Do you provide training for our internal marketing team?",
        a: "Yes, and we design these programs around a specific problem rather than a generic curriculum. Some teams need foundational digital literacy. Others need to level up on a specific platform or campaign type. Some need a senior strategist embedded with them for a quarter to upgrade their thinking.\n\nWe assess the actual gap, design the program around it, and deliver through workshops, hands-on exercises, and operational playbooks your team keeps long after the engagement ends.",
      },
      {
        q: "How do you measure and report on campaign performance?",
        a: "We structure reporting around three questions a CMO actually needs answered: what did we spend, what did it produce, and what should change next month.\n\nOur reports present clean KPI movement against agreed baselines, identify which levers drove performance and which underperformed, and translate the data into specific strategic adjustments for the next cycle. The reporting is designed to inform decisions, not to fill space. If a number does not lead to a decision, it does not belong in the report.",
      },
      {
        q: "Can you help improve our customer service or contact center?",
        a: "Yes, and we treat the contact center as a marketing asset rather than a cost line, because that is what it actually is. A contact center is where your acquisition spend either converts into a customer or evaporates.\n\nWe audit performance against industry benchmarks, identify the breakdowns (script weaknesses, response time, handoff failures, missing CRM data), and build a roadmap that improves both customer experience and conversion rates with measurable milestones.",
      },
    ],
  },
  {
    id: "creative",
    label: "Creative & Content Studio",
    Icon: Palette,
    questions: [
      {
        q: "What creative services do you offer?",
        a: "Our Creativity Studio produces everything visual and written that carries your brand into the market: graphic design across all social and digital formats, motion graphics and animated content, website copy, marketing campaign copy, social media storytelling, email sequences, and SEO-optimized blog content.\n\nThe studio's underlying discipline is that every asset has a job: stop the scroll, hold the attention, or drive the click. Decorative content that does none of these is not creative work. It is wasted budget.",
      },
      {
        q: "Do you create content in Arabic and English?",
        a: "Yes, fluently in both. Our Arabic content is written in proper Modern Standard Arabic, calibrated for the specific platform and audience, and crafted by native writers. It is never translated from English source material or generated by a model and lightly edited.\n\nArabic and English audiences respond to very different rhetorical patterns, and we treat each as its own creative discipline rather than a localization exercise.",
      },
      {
        q: "What is the difference between graphic design and motion graphics?",
        a: "Graphic design is static: posts, banners, ads, infographics, product visuals. Motion graphics is design with time as a dimension: animated posts, video ads, kinetic typography, explainer animations, animated product showcases.\n\nThe distinction matters commercially because motion content consistently outperforms static content in attention and engagement on every major platform, but motion is also more expensive to produce. We help clients allocate between the two based on what their objectives and budget actually justify, rather than defaulting to one or the other.",
      },
      {
        q: "Can you create content for all social media platforms?",
        a: "Yes, and we design content for each platform on its own terms. A reel that works on TikTok will underperform if posted unedited on LinkedIn. A LinkedIn carousel will be ignored on Instagram.\n\nWe produce platform-native content for Instagram, Facebook, LinkedIn, TikTok, Snapchat, YouTube, X, and WhatsApp, calibrated to each platform's format, pacing, and audience behavior. Recycling one asset across every channel is the single most common mistake brands make, and the easiest one for us to fix.",
      },
      {
        q: "Do you write blog content and website copy?",
        a: "Yes, and the work is built to do two jobs at once: rank in search and convert the reader. We write website pages, blog articles, product descriptions, and email sequences with both SEO logic and conversion psychology embedded in the structure.\n\nContent that ranks but does not convert is just traffic, and content that converts but does not rank is invisible. We build for both.",
      },
    ],
  },
  {
    id: "technology",
    label: "Technology Studio",
    Icon: Cpu,
    questions: [
      {
        q: "What technology services does Dubai in Cairo provide?",
        a: "The Technology Studio builds the digital infrastructure that marketing actually depends on. We develop websites with proper UI/UX and SEO foundations, e-commerce stores with integrated payment and inventory systems, native mobile applications for iOS and Android, CRM integrations and customer management workflows, AI-powered productivity and customer service tools, email campaign systems, and dedicated web platforms for conferences and exhibitions.\n\nThe studio operates on a principle that surprises some clients: most marketing problems are actually technology problems. A site that loads slowly, a checkout that fails, or a CRM that loses leads will cost more revenue than any creative campaign can recover.",
      },
      {
        q: "Can you build our e-commerce store from scratch?",
        a: "Yes, and we treat the build as a revenue system rather than a website. We design and develop secure, conversion-optimized e-commerce stores with integrated payment gateways, installment options, smart inventory management, abandoned-cart recovery, and AI tools that improve conversion and surface sales intelligence.\n\nWe design the entire customer journey from discovery through to post-purchase retention, because the order confirmation page is the beginning of the next sale, not the end of the first one.",
      },
      {
        q: "Do you develop mobile apps?",
        a: "Yes. We build native iOS and Android applications for both marketing and operational use cases. Every app goes through UX design, performance testing, and store-compliance review before publication on Google Play and the App Store. Beyond launch, we provide post-deployment monitoring, performance optimization, and feature iteration.\n\nWe turn down mobile app projects where a well-built web app would serve the client better, because building an app that no one downloads is an expensive way to learn the lesson.",
      },
      {
        q: "Do you provide SEO services?",
        a: "Yes, and SEO is treated as a foundational discipline rather than an add-on. We optimize site structure, page content, metadata, internal linking, page speed, mobile experience, and schema markup to lift Google rankings and organic traffic. For e-commerce, we add product-page SEO to capture high-intent purchase searches.\n\nSEO is the only marketing channel where the asset you build today still generates traffic three years from now, which makes it one of the highest-ROI investments in the digital mix.",
      },
      {
        q: "Do the websites you build belong to us after delivery?",
        a: "Yes, completely and unambiguously. On delivery you receive full file ownership, source code, hosting access, domain control, and complete documentation.\n\nWe deliberately design our handover so that you are never dependent on us to continue operating your own website. If you choose to continue with us for maintenance and improvements, it is because the partnership is working, not because you are locked in.",
      },
      {
        q: "How long does a website take to build?",
        a: "A standard business website is typically three to six weeks from kick-off to launch. E-commerce platforms and custom web applications take longer, usually eight to sixteen weeks, depending on page count, integrations, and functional complexity.\n\nWe provide a detailed milestone-based timeline during the proposal phase and track every step through our internal electronic project management system, which means you always know what stage we are at and what is coming next.",
      },
    ],
  },
  {
    id: "brand",
    label: "Brand Identity Studio",
    Icon: Bookmark,
    questions: [
      {
        q: "What does the Brand Identity Studio do?",
        a: "The Brand Identity Studio builds the system of meaning that everything else in your marketing depends on. This covers logo and visual identity creation, brand color and typography systems, complete brand books and usage guidelines, strategic brand messaging and positioning, company profile and introductory content, and all marketing materials aligned to your established identity.\n\nBrand identity is not decoration. It is the compression algorithm for everything a customer needs to know about you in the first second of contact.",
      },
      {
        q: "We already have a logo. Can you build a full brand identity around it?",
        a: "Yes. We can extend an existing logo into a complete brand system, or rebuild the logo as part of a wider identity overhaul if the current one is holding you back.\n\nEither way, the work goes well past colors and fonts. We define how your brand should look, sound, and behave across every touchpoint: what to do in unusual situations, how partners and vendors should use your assets, how the brand should evolve as you grow. The identity stays consistent whether you produce content yourself or work with multiple agencies.",
      },
      {
        q: "What is a brand book and do we need one?",
        a: "A brand book is the operating manual for your brand. It is the document that ensures your identity stays consistent no matter who is producing content for you.\n\nYou need one the moment more than one person creates anything on your behalf. Without it, your visual identity erodes silently across channels until one day you look at six recent assets and realize they could have come from six different companies. With a proper brand book, every new vendor, agency, or hire produces work that reinforces rather than dilutes your brand equity.",
      },
      {
        q: "Can you write our company profile and \"About Us\" content?",
        a: "Yes, and we write these as positioning documents rather than corporate brochures. A well-written company profile does three jobs: it earns immediate trust with a serious reader, it differentiates you clearly from your competition, and it makes the right kind of clients want to work with you.\n\nWe craft narratives anchored in your real strengths and structured to attract the customers you actually want, in the voice that makes you sound like yourself rather than every other company in your sector.",
      },
    ],
  },
  {
    id: "media",
    label: "Media Production Studio",
    Icon: Video,
    questions: [
      {
        q: "What media production services do you offer?",
        a: "The Media Production Studio covers three production tracks.\n\nThe first is event and corporate photography, including professional event coverage, product photography, and executive portraits. The second is smartphone-native content: iPhone-shot video, AI-enhanced short-form content, and creator-style social video, which has overtaken polished production for many audiences and platforms. The third is cinematic video: brand films, event highlight reels, professional voiceover, soundscape engineering, and platform-specific multi-format exports.\n\nWe help clients choose the right production track for each objective rather than overspending on cinema-grade output when smartphone content would actually convert better.",
      },
      {
        q: "Do you cover events, photography and video?",
        a: "Yes, with a full on-the-ground crew. Coverage includes atmosphere, key moments, executive shots, attendee interactions, and any branded touchpoints critical to the event narrative. Deliverables include edited photo galleries, digital albums, and cinematic event highlight videos formatted for website use, social distribution, and internal communications.\n\nWe coordinate with your event team in advance so the shot list reflects strategic priorities, not just whatever happened to be photogenic on the day.",
      },
      {
        q: "Do you produce video ads for social media?",
        a: "Yes, and we produce them platform-specific rather than universal. A six-second TikTok pre-roll requires a different opening, pacing, and cut structure than a thirty-second Instagram story or a YouTube pre-roll.\n\nEvery video we deliver is built with platform-appropriate editing, licensed music, professional voiceover where required, and the correct format and aspect ratio per placement. The difference shows up in completion rates and conversion, both of which are measured and reported.",
      },
      {
        q: "Can you create animated content for social media?",
        a: "Yes. Motion graphics, animated explainers, product animations, and kinetic typography are produced by our in-house animation team under the Creativity Studio.\n\nFor hybrid projects that combine live footage with animation, the Creative and Media Production studios collaborate as a single team to ensure the integration is seamless rather than visibly stitched together.",
      },
    ],
  },
  {
    id: "media-buying",
    label: "Media Buying & Paid Advertising",
    Icon: TrendingUp,
    questions: [
      {
        q: "Which paid advertising platforms do you manage?",
        a: "We manage paid campaigns across Meta (Facebook and Instagram), Google (Search, Display, and YouTube), TikTok, Snapchat, LinkedIn, X, and WhatsApp Business.\n\nThe platform mix for any campaign is decided by where your specific audience actually spends time and how they make purchasing decisions, not by defaulting to the largest platforms by global market share. Putting a budget on TikTok for an audience that converts on LinkedIn is one of the most expensive mistakes a campaign can make, and we structure every plan to avoid it.",
      },
      {
        q: "How do you ensure our ad budget is used efficiently?",
        a: "Efficiency is engineered into the workflow, not promised after the fact. Every campaign begins with a written strategy defining objective, audience segments, platform mix, creative approach, and budget allocation logic.\n\nDuring the campaign we monitor performance daily and continuously adjust bids, audiences, placements, and creatives based on what the data is telling us. At each reporting cycle you receive a detailed breakdown of exactly what the budget produced against the agreed KPIs, with clear recommendations on where the next budget should go.",
      },
      {
        q: "Do you guarantee results from paid advertising?",
        a: "No ethical agency can guarantee specific numerical results, and any agency that does is selling something other than honesty. Performance depends on variables that no agency controls: market conditions, seasonality, product-market fit, competitive pressure, and platform algorithm shifts.\n\nWhat we guarantee is rigorous strategy, certified execution, daily active management, transparent reporting, and continuous optimization so your budget is working as hard as the platform allows at every point in the campaign. That is what professional media buying is, and it is what produces the best statistical outcome over time.",
      },
      {
        q: "What is the minimum budget required to run paid ads with you?",
        a: "There is no single minimum, because it depends entirely on platform, industry, and objective. A B2B lead generation campaign on LinkedIn has very different budget thresholds than an awareness campaign on TikTok or a product-sales campaign on Meta.\n\nDuring proposal we will tell you exactly what the minimum effective spend looks like for your specific goals. If your budget is too small to produce meaningful results we will tell you that too, and recommend either waiting until you can fund it properly or choosing a different channel.",
      },
      {
        q: "Can you manage our ads if we already have an in-house marketing team?",
        a: "Yes, and we work this way regularly. The arrangement is flexible: we can run paid media end-to-end while your team focuses on organic content and brand, we can co-manage campaigns with your team as the strategic and execution layer, or we can act purely as the senior strategy and optimization partner while your team handles day-to-day execution.\n\nThe right structure depends on where your team's strengths are and where the gaps are, and we design the engagement around that rather than forcing a one-size-fits-all model.",
      },
      {
        q: "Do you create the ad creatives, or only manage the buying?",
        a: "We do both, and the integration is the point. Creatives produced by an external team and handed to a media buyer almost always underperform creatives produced by a team that understands the targeting, the placement constraints, and the conversion behavior of each platform.\n\nOur Creative Studio and Media Buying Studio work together from campaign kickoff, building ads specifically for paid performance rather than repurposing organic content. Every asset is engineered with the format, hierarchy, copy structure, and call-to-action that maximizes click-through and conversion from the first impression.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing, Quotations & Banking",
    Icon: CreditCard,
    questions: [
      {
        q: "How does Dubai in Cairo structure its pricing?",
        a: "Pricing is project-based and built around the actual scope of each engagement rather than fixed package tiers. We do not publish flat-rate menus because honest pricing in this industry is impossible without first understanding the work. A multinational's monthly social retainer and a startup's launch campaign have nothing in common beyond the channel.\n\nAfter an initial discovery call we deliver a detailed proposal with itemized pricing, so you know exactly what you are paying for and why.",
      },
      {
        q: "What factors influence the cost of a project?",
        a: "The main drivers are scope of services, number of platforms and markets, content volume and languages, creative complexity (static versus motion versus cinematic), level of strategic involvement, project duration, and any technology or integration requirements.\n\nEvery line item in our proposals is explained in plain language and tied to a specific output, so there are no surprises and no fees hidden in vague bundles.",
      },
      {
        q: "Do you offer retainer agreements or project-based contracts?",
        a: "Both, depending on what makes commercial sense for your situation.\n\nRetainers are the right structure for ongoing work like social media management, paid advertising, and continuous content production. They deliver better value, more strategic continuity, and access to a stable team that builds institutional knowledge of your brand over time.\n\nProject-based contracts are right for defined, one-time deliverables such as website builds, brand identity systems, campaign launches, and company profiles.\n\nWe recommend the structure that genuinely fits the work, not the one that maximizes our revenue.",
      },
      {
        q: "Can we start with one service and expand later?",
        a: "Yes, and many of our most successful long-term relationships started this way. A client begins with a single service, typically a website, a social retainer, or a specific campaign, and progressively adds services as the partnership proves itself.\n\nThere is no obligation to commit to a full-service engagement upfront. The work earns the expansion, not the proposal.",
      },
      {
        q: "What currencies do you accept?",
        a: "We accept payments in both Egyptian Pounds (EGP) and US Dollars (USD), with bank accounts in three major Egyptian banks structured to handle either currency.",
      },
      {
        q: "What are your bank account details for payments?",
        a: "We hold corporate accounts at three banks.\n\nAt Arab African International Bank, Arkan Plaza branch in Sheikh Zayed, our account number is 1144817810010201 with IBAN EG730057028001144817810010201, accepting USD and EGP.\n\nAt National Bank of Egypt, Smart Village branch in 6th of October, our account number is 1923071255410401013 with IBAN EG410003019230712554104010130, also accepting USD and EGP.\n\nAt Commercial International Bank, Arkan Plaza branch in Sheikh Zayed, our account number is 100059074754 with IBAN EG160010026000001000059074754, accepting USD only.",
      },
      {
        q: "Do you sign formal contracts with clients?",
        a: "Yes. Every engagement is governed by a formal written agreement covering scope of work, deliverables, timelines, payment terms, intellectual property, confidentiality, and the responsibilities of both parties.\n\nWe do not begin any work without a signed contract, both to protect you and to ensure the relationship is built on clear, mutual expectations from day one.",
      },
    ],
  },
  {
    id: "working",
    label: "Working With Us",
    Icon: Handshake,
    questions: [
      {
        q: "How do we get started with Dubai in Cairo?",
        a: "Reach out via our website, WhatsApp, or email, and we will schedule a discovery call to understand your business, goals, and the real challenges you are trying to solve.\n\nFrom that conversation we prepare a tailored proposal covering recommended services, clear timeline, and transparent pricing, typically within three to five business days. Once approved and the contract is signed, we run structured onboarding and begin work. The full path from first contact to first deliverable is usually two to three weeks.",
      },
      {
        q: "What does the onboarding process look like?",
        a: "Onboarding is the single most important phase of the engagement, and we treat it that way.\n\nWe collect all brand assets, access credentials, existing content, and historical performance data. We align on communication preferences and reporting cadence. We brief every relevant studio team on your brand voice, audience, and objectives so that everyone touching your work understands the strategy. We set up your dedicated project workspace in our task management system, and we agree on a content calendar with confirmed delivery dates.\n\nBy the end of onboarding, the engagement is fully operational rather than still warming up.",
      },
      {
        q: "Who will be our main point of contact?",
        a: "Every client is assigned a dedicated account manager who serves as your single point of coordination across all studio teams. Your account manager owns briefings, feedback loops, approvals, reporting, and any escalations.\n\nYou never have to figure out which specialist to contact for a specific question. The account manager handles that on your behalf and ensures the answer reaches you quickly and from the right person.",
      },
      {
        q: "How do you handle feedback and revisions?",
        a: "Revisions are built into the creative process rather than treated as an exception. We work in defined review rounds: you receive the deliverable, provide consolidated feedback, and we revise within an agreed turnaround.\n\nEverything that reaches you has already passed internal quality control, which means revision rounds are typically focused and fast rather than open-ended. The objective is always to reach a result you are confident publishing under your own name, not to deliver something we are happy with and move on.",
      },
      {
        q: "How do you communicate with clients day to day?",
        a: "WhatsApp Business is our primary channel for quick day-to-day communication, because it matches how our clients actually work. Formal email is used for contracts, proposals, reporting, and anything requiring a paper trail. All projects are tracked inside our internal electronic management system so the status of every deliverable is visible at all times.\n\nFor complex or ongoing engagements, we schedule recurring video calls at agreed intervals. The communication structure adapts to your preferences, not the other way around.",
      },
      {
        q: "What happens if we are not satisfied with the delivered work?",
        a: "Quality is enforced through multiple internal review stages before anything reaches you, which is why dissatisfaction is genuinely rare.\n\nWhen it does happen, the resolution is direct: if a deliverable does not meet the agreed brief, we revise it at no additional cost within scope. We are not interested in defending bad work. We are interested in building the kind of long-term relationships that have produced repeat engagements across four years and dozens of clients. Reputation in this industry is built one deliverable at a time, and we operate accordingly.",
      },
      {
        q: "Do you work with clients outside Cairo or outside Egypt?",
        a: "Yes. As a 100% digital agency, geography is not a constraint. It is one of the structural reasons we exist.\n\nWe serve clients across Egypt and work regularly with international brands operating in the Egyptian and regional markets. Remote collaboration is not a workaround. It is how the company was designed from day one, which means it works seamlessly rather than as an afterthought.",
      },
      {
        q: "Do you sign NDAs to protect our business information?",
        a: "Yes, without hesitation. We treat all client information (strategies, performance data, business plans, financial details, product intelligence) with strict confidentiality.\n\nNDAs are standard and can be incorporated into the engagement agreement on request, or signed in advance of discovery conversations if you prefer to share sensitive context before committing to a proposal.",
      },
    ],
  },
];

/* ─────────────────────────── component ─────────────────────────── */

const FAQ = () => {
  useSEO({
    titleKey: "seo_faq_title",
    descriptionKey: "seo_faq_description",
    canonical: "/faq",
  });

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  const current = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <PageTransition>
      <main id="main-content" className="min-h-screen bg-background">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-8 md:pt-28 md:pb-10 px-6 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(38 80% 55% / 0.06), transparent 70%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>

              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Frequently Asked Questions
              </span>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
                Everything You Need
                <br />
                <span className="text-gradient-gold">to Know About Us</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Straight answers to the questions every serious client asks
                before committing. If something is still unclear, reach out —
                we prefer direct conversations over FAQs anyway.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Body: sidebar + accordion ─────────────────────────── */}
        <section className="relative px-6 pb-14">
          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* ── Category sidebar ── */}
              <motion.aside
                className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3 px-1">
                  Categories
                </p>
                <nav aria-label="FAQ categories" className="flex flex-row lg:flex-col gap-1 flex-wrap">
                  {CATEGORIES.map(({ id, label, Icon }) => {
                    const isActive = id === activeCategory;
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveCategory(id)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/30 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/60"}`} />
                        <span className="leading-tight">{label}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.aside>

              {/* ── Questions accordion ── */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <current.Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="text-xl font-display font-bold text-foreground">
                        {current.label}
                      </h2>
                      <span className="ml-auto text-xs text-muted-foreground/60 font-medium">
                        {current.questions.length} questions
                      </span>
                    </div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <AccordionPrimitive.Root
                        type="single"
                        collapsible
                        className="space-y-3"
                      >
                        {current.questions.map((item, i) => (
                          <motion.div key={i} variants={cardFadeUp}>
                            <AccordionPrimitive.Item
                              value={String(i)}
                              className="glass-card rounded-xl overflow-hidden border border-border data-[state=open]:border-primary/40 transition-colors duration-300"
                            >
                              <AccordionPrimitive.Header>
                                <AccordionPrimitive.Trigger className="w-full flex items-start gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl group cursor-pointer [&[data-state=open]_.faq-q]:text-primary [&[data-state=open]>div>.chevron]:rotate-180">
                                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-primary/10 text-primary text-[11px] font-bold font-display flex items-center justify-center">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>

                                  <span className="faq-q flex-1 font-display font-semibold text-sm md:text-base text-foreground transition-colors duration-200 leading-snug pr-2">
                                    {item.q}
                                  </span>

                                  <div className="shrink-0 mt-0.5">
                                    <ChevronDown className="chevron h-4 w-4 text-muted-foreground transition-transform duration-300" />
                                  </div>
                                </AccordionPrimitive.Trigger>
                              </AccordionPrimitive.Header>

                              <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                <div className="px-5 pb-5 pt-0 border-t border-border/60">
                                  <div className="mt-4 space-y-3">
                                    {item.a.split("\n\n").map((para, pi) => (
                                      <p
                                        key={pi}
                                        className="text-muted-foreground text-sm leading-relaxed"
                                      >
                                        {para}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </AccordionPrimitive.Content>
                            </AccordionPrimitive.Item>
                          </motion.div>
                        ))}
                      </AccordionPrimitive.Root>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="relative px-6 pb-14">
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              className="rounded-2xl border border-border/60 p-8 md:p-12 text-center"
              style={{
                background:
                  "radial-gradient(ellipse 80% 100% at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%), hsl(var(--card))",
              }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
                Still Have Questions?
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Let's Have a{" "}
                <span className="text-gradient-gold">Real Conversation</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                The best answers come from a direct conversation about your
                specific situation. Reach out and we will respond within one
                business day.
              </p>
              <a
                href="https://wa.me/201000000000"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
              >
                Contact Us on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default FAQ;
