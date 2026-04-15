/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Star, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Smartphone, 
  Search, 
  Lock, 
  Globe,
  ArrowRight,
  Clock,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
  <img 
  src="/images/logo-main.png" 
  alt="MedPro Insights" 
  className="h-14 w-auto object-contain" 
/>
</div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollTo('get-started')}
            className="bg-blue-cta hover:bg-blue-hover text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-blue-cta/20 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const FormCard = ({ isFinal = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    hasWebsite: 'No',
    businessType: 'Business Service'
  });

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbz627w6wkg5zVbhFdLQlyrXsLbCmATlIHKTeQH5UU3C_XqYNFhxsKnNXbTNtoo41_94/exec';

    try {
      // 1. Send data to Google Sheets
      // We removed "mode: no-cors" to allow the browser to process the request correctly.
      await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      // 2. Prepare WhatsApp details
      const whatsappNumber = '919980884031'; // [cite: 146]
      const message = `Hi! I just filled out the form on your website.
Name: ${formData.fullName}
Business: ${formData.businessName}
Phone: ${formData.phone}`; // [cite: 147]

      // 3. Trigger Redirect
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`; // 

    } catch (error) {
      console.error('Submission Error:', error);
      alert('There was an error saving your data. Please try again.'); // [cite: 150]
    }
  };
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-border-base">
      <h3 className="text-2xl font-bold text-navy-primary mb-6 text-center">Get Your Free Quote</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-light border border-border-base focus:outline-none focus:ring-2 focus:ring-blue-cta/20 focus:border-blue-cta transition-all"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Business Name</label>
            <input 
              type="text" 
              placeholder="Your Company LLC"
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-light border border-border-base focus:outline-none focus:ring-2 focus:ring-blue-cta/20 focus:border-blue-cta transition-all"
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-light border border-border-base focus:outline-none focus:ring-2 focus:ring-blue-cta/20 focus:border-blue-cta transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="(555) 000-0000"
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-light border border-border-base focus:outline-none focus:ring-2 focus:ring-blue-cta/20 focus:border-blue-cta transition-all"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Already have a website?</label>
            <select 
              className="w-full px-4 py-3 rounded-lg bg-bg-light border border-border-base focus:outline-none focus:ring-2 focus:ring-blue-cta/20 focus:border-blue-cta transition-all appearance-none"
              onChange={(e) => setFormData({...formData, hasWebsite: e.target.value})}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">What type of website?</label>
            <select 
              className="w-full px-4 py-3 rounded-lg bg-bg-light border border-border-base focus:outline-none focus:ring-2 focus:ring-blue-cta/20 focus:border-blue-cta transition-all appearance-none"
              onChange={(e) => setFormData({...formData, businessType: e.target.value})}
            >
              <option>Business Service</option>
              <option>Healthcare/Clinic</option>
              <option>E-commerce</option>
              <option>Portfolio</option>
            </select>
          </div>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-cta hover:bg-blue-hover text-white font-bold py-4 rounded-lg transition-all shadow-xl shadow-blue-cta/20 flex items-center justify-center space-x-2"
        >
          <span>Get Started Now</span>
          <ArrowRight size={20} />
        </button>
        <p className="text-[10px] text-text-secondary text-center mt-2">
          By clicking "Get Started Now", you'll be redirected to WhatsApp to confirm your inquiry.
        </p>
        <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-text-secondary font-medium">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>100% Secure</span>
        </div>
      </form>
      
      {isFinal && (
        <div className="mt-4">
          <button 
            className="w-full border-2 border-navy-primary text-navy-primary hover:bg-navy-primary hover:text-white font-bold py-3 rounded-lg transition-all"
            onClick={() => window.open('https://rzp.io/rzp/aHiYicHJ', '_blank')}
          >
            Pay ₹4,999 & Get Started Now
          </button>
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <section id="get-started" className="pt-32 pb-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-cta/10 text-blue-cta px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
              <Clock size={16} />
              <span>Launch in 7 Days Guaranteed</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-navy-primary leading-[1.1] tracking-tight">
              Take Your Business Online <span className="text-blue-cta">in Just 7 Days.</span>
            </h1>
            <p className="text-2xl font-bold text-navy-primary">
              Expert Digital Solutions for Medical & Professional Growth.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Stop losing customers to competitors who are already visible online. Build trust, gain credibility, and start converting traffic into sales with a premium agency-grade website tailored for Your Business.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-cta hover:bg-blue-hover text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl shadow-blue-cta/20 flex items-center space-x-2"
              >
                <span>Start Your Project</span>
                <ArrowRight size={20} />
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Starting Price</span>
                <span className="text-xl font-bold text-navy-primary">₹9,999 <span className="text-sm font-normal text-text-secondary">Only</span></span>
              </div>
            </div>
          </div>
          <div className="relative">
            <FormCard />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-border-base flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <ShieldCheck className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-navy-primary">100% Secure</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-[10px] ml-1 text-text-secondary">Rated by Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AuthoritySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy-primary leading-tight tracking-tight">
              Professional Website Design That Drives Real Business Growth
            </h2>
            <ul className="space-y-4">
              {[
                "Conversion-First Layout Strategy",
                "SEO-Optimized Structure & Speed",
                "Integrated Booking & Lead Capture",
                "Built to Scale With Your Business"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-navy-primary font-bold">
                  <CheckCircle2 className="text-blue-cta shrink-0" size={24} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-cta hover:bg-blue-hover text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-blue-cta/20 flex items-center space-x-3"
            >
              <span>See How It Works</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] aspect-[4/3] bg-bg-light rounded-2xl border border-border-base shadow-xl flex items-center justify-center group">
              {/* Growth Engine Image Content */}
          <img 
            src="/images/growth-engine-2.png" 
            alt="Growth Engine Analytics" 
            className="w-full h-full object-cover rounded-2xl" 
          />

              {/* Trust Badge Overlay - Floating */}
              <div className="absolute -bottom-5 left-5 bg-white p-4 rounded-xl shadow-2xl border border-border-base flex items-center space-x-4 z-10">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <Check className="text-emerald-600" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-navy-primary">100% Secure</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Rated by Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoCarousel = () => {
  return (
    <section className="py-16 bg-white border-y border-border-base overflow-hidden">
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold text-navy-primary mb-2">Trusted by Growing Businesses</h2>
        <p className="text-sm text-text-secondary font-medium">Healthcare & Professional Brands Who Trust MedPro Insights</p>
      </div>
      <div className="relative flex overflow-x-hidden py-12">
      <div className="flex animate-scroll whitespace-nowrap items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) => (
          <div key={idx} className="mx-8 md:mx-12 flex items-center justify-center flex-shrink-0">
            <img 
              src={`/images/partner-${num}.png`} 
              alt={`Partner ${num}`} 
              className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" 
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

const OnlinePresence = () => {
  const points = [
    {
      icon: <Zap className="text-red-500" />,
      title: "Loss of Trust",
      desc: "81% of customers research a business online before they even think about visiting or calling."
    },
    {
      icon: <Search className="text-blue-500" />,
      title: "Invisible to Search",
      desc: "If you aren't on the first page of results, you don't exist to your local market."
    },
    {
      icon: <Lock className="text-orange-500" />,
      title: "Platform Dependency",
      desc: "Relying only on social media means you don't own your data or your customer connection."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-primary mb-4 tracking-tight">
            Your customers are online. <br />
            <span className="text-blue-cta">Is your business visible?</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Every day you operate without a professional digital presence, you are handing your market share to your competitors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {points.map((p, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 rounded-xl border border-border-base hover:shadow-lg transition-all">
                <div className="bg-bg-light p-3 rounded-lg">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy-primary mb-1">{p.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-navy-primary p-10 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">We break this cycle in just 7 days.</h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Our proven framework allows us to deliver a high-performance website that acts as your 24/7 salesman. No more delays, no more missed opportunities.
              </p>
              <button 
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-blue-cta hover:bg-blue-hover text-white font-bold py-4 rounded-lg transition-all shadow-xl shadow-blue-cta/30"
              >
                Claim Your 7-Day Turnaround
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-cta/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyOffer = () => {
  const cards = [
    {
      icon: <ShieldCheck className="text-blue-cta" size={32} />,
      title: "Instant Credibility",
      desc: "Look like the market leader you are from day one. Premium design that builds psychological trust."
    },
    {
      icon: <Zap className="text-blue-cta" size={32} />,
      title: "Total Technical Freedom",
      desc: "You own everything. No proprietary locks. No recurring hidden maintenance fees you can't control."
    },
    {
      icon: <BarChart3 className="text-blue-cta" size={32} />,
      title: "Business Impact",
      desc: "Designed to convert. Every button, every pixel is placed to turn visitors into paying customers."
    }
  ];

  return (
    <section className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-primary mb-4 tracking-tight">Why This Offer?</h2>
          <p className="text-lg text-text-secondary font-medium">More than just a website, we build a growth engine.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-navy-card p-10 rounded-2xl border border-white/5 hover:border-blue-cta/50 transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {c.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{c.title}</h4>
              <p className="text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EverythingYouNeed = () => {
  const features = [
    { title: "Professional Authority Design", desc: "Custom aesthetics that match your brand's unique identity." },
    { title: "100% Mobile Responsive", desc: "Perfect viewing experience on every single device type." },
    { title: "Lightning-Fast Loading", desc: "Optimized code for sub-2 second load times to prevent bounce." },
    { title: "Conversion-Optimized Structure", desc: "Built using conversion rate optimization (CRO) best practices." },
    { title: "Built-in SEO Foundation", desc: "Google-friendly architecture to help you climb the rankings." },
    { title: "Key Handover Guarantee", desc: "You own 100% of the code, domain, and assets at the end." }
  ];

  return (
    <section className="py-24 bg-navy-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">Everything You Need for Digital Dominance.</h2>
            <p className="text-slate-400 text-lg">We don't just give you a site; we give you the keys to your new business headquarters.</p>
            <ul className="space-y-4">
              {["Zero Technical Headache", "Fixed Transparent Price", "Launch-Ready in 7 Days"].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm font-bold uppercase tracking-wider">
                  <CheckCircle2 className="text-blue-cta" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-cta hover:bg-blue-hover text-white px-8 py-4 rounded-lg font-bold transition-all shadow-xl shadow-blue-cta/20 flex items-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-navy-card p-8 rounded-xl border border-white/5 hover:bg-white/5 transition-all">
                <h4 className="text-lg font-bold mb-3">{f.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoTestimonial = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Video Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-black">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/images/client-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded text-[10px] font-bold uppercase tracking-wider flex justify-between items-center">
              <span>PROVEN SPEED. WORLD-CLASS DESIGN</span>
        </div>
          </div>
          <div className="space-y-8">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />)}
            </div>
            <p className="text-2xl font-bold text-navy-primary italic leading-relaxed">
              "Working with the MedPro Insights team changed everything. We went from being invisible to having 3-4 new qualified leads every single week through our new site."
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden flex items-center justify-center">
            <img 
              src="/images/avatar-amit.jpg" 
              alt="Amit Verma" 
              className="w-full h-full object-cover" 
            />
          </div>
              <div>
                <p className="font-bold text-navy-primary">Amit Verma</p>
                <p className="text-sm text-text-secondary">Founder, Healthcare Axis</p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed">
              The foundation of every online sale is <span className="font-bold text-navy-primary">trust</span>. Without a professional platform to showcase your expertise, you're asking customers to take a risk they won't take.
            </p>
            <button 
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-navy-primary hover:bg-navy-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center space-x-3"
            >
              <span>Book Your Design Session</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientTestimonials = () => {
  const testimonials = [
    {
    name: "Geethu S",
    role: "OWNER - HOME BAKER",
    text: "MedPro Insights delivered our website in just 6 days. Clean, fast, and professional.",
    avatar: "/images/avatar-geethu.jpg" // Change only this line
  },
    {
    name: "Rajesh Kumar",
    role: "PROPRIETOR - SK LOGISTICS",
    text: "I was skeptical about the 7-day promise, but they actually did it. The UI is world-class.",
    avatar: "/images/avatar-rajesh.jpg" // Update this line
  },
    {
    name: "Mary Pritisha",
    role: "CHIEF FINANCIAL OFFICER",
    text: "Finally a developer who understands conversion. Our old site was a brochure; this one is a lead machine.",
    avatar: "/images/avatar-mary.jpg" // Update this line
  },
  ];

  return (
    <section id="testimonials" className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-navy-primary mb-4 tracking-tight">What Our Clients Say</h2>
          <p className="text-lg text-text-secondary font-medium">Real feedback from local business owners.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border-base flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />)}
                </div>
                <p className="text-text-secondary italic leading-relaxed mb-8">"{t.text}"</p>
              </div>
              <div className="flex items-center space-x-3">
  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
    {t.avatar ? (
      <img 
        src={t.avatar} 
        alt={t.name} 
        className="w-full h-full object-cover" 
      />
    ) : (
      <span className="text-[10px] text-slate-400 font-bold uppercase">Avatar</span>
    )}
  </div>
                <div>
                  <p className="font-bold text-navy-primary text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    { icon: <ShieldCheck size={24} />, label: "Market Authority & Trust", sub: "TRUST FACTOR" },
    { icon: <Clock size={24} />, label: "\"Salesman Who Never Sleeps\"", sub: "EFFICIENCY" },
    { icon: <BarChart3 size={24} />, label: "Rapid ROI Guaranteed", sub: "PERFORMANCE" }
  ];

  return (
    <div className="bg-blue-cta py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-lg">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{item.sub}</p>
                <p className="text-lg font-bold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy-primary leading-tight tracking-tight">
              Millions are searching for what you do. <span className="text-blue-cta">Don't be invisible.</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Right now, in your city, people are typing your services into Google. If they don't find you, they find your competitor. Every single click you miss is a missed opportunity for revenue, growth, and long-term customer loyalty.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-5xl font-extrabold text-blue-cta mb-1">8.5B</p>
                <p className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Daily Google Searches</p>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-blue-cta mb-1">76%</p>
                <p className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">Visit Local Business in 24h</p>
              </div>
            </div>
            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-cta hover:bg-blue-hover text-white px-8 py-4 rounded-lg font-bold transition-all shadow-xl shadow-blue-cta/20 flex items-center space-x-2"
              >
                <span>Claim Your Presence</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-auto md:h-full rounded-3xl overflow-hidden shadow-2xl">
  <img 
    src="/images/invisible-section.jpg" 
    alt="People searching for services online" 
    className="w-full h-full object-cover"
  />
  {/* Optional: Add a subtle overlay to make it look premium */}
  <div className="absolute inset-0 bg-gradient-to-tr from-navy-primary/10 to-transparent" />
</div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "How is delivery in 7 days possible?", a: "We use a proprietary framework and pre-optimized components that allow us to focus on your brand and content without reinventing the wheel. Our streamlined process is designed for speed without sacrificing quality." },
    { q: "Is there clear pricing with no hidden fees?", a: "Yes, our pricing is 100% transparent. The price you see is the price you pay for the initial build. No hidden monthly maintenance fees or proprietary locks." },
    { q: "Will my website be compatible with mobile phones?", a: "Absolutely. Every site we build is 100% mobile-responsive and tested across all major device types to ensure a perfect viewing experience." },
    { q: "How easy is it to manage the website after launch?", a: "We build on user-friendly platforms and provide a full handover. You'll be able to update text, images, and blog posts with zero technical knowledge." },
    { q: "What do you need from me to get started?", a: "We need your brand assets (logo, colors), basic business information, and any specific content or images you want to include. We'll guide you through a simple onboarding process." },
    { q: "What happens after the launch?", a: "Once launched, you own 100% of the site. We provide a handover session to show you how to manage it, and we're always available for future upgrades or support if needed." }
  ];

  return (
    <section className="py-24 bg-bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy-primary mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg text-text-secondary font-medium">Everything you need to know about your 7-day launch.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-border-base overflow-hidden">
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-bg-light/50 transition-all"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-navy-primary">{faq.q}</span>
                {openIndex === i ? <ChevronUp size={20} className="text-text-secondary" /> : <ChevronDown size={20} className="text-text-secondary" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const benefits = [
    "7-Day Delivery Guarantee",
    "Conversion-First Design",
    "Mobile & SEO Optimized",
    "100% Ownership & Transparent Pricing"
  ];

  return (
    <section className="py-24 bg-navy-primary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[800px] mx-auto text-center space-y-12">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Ready to Take Your Business to the Next Level?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Reinforce your brand, build trust, and automate your lead generation. The first step is just a few clicks away.
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-5">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm font-bold uppercase tracking-wider">
                <CheckCircle2 className="text-blue-cta shrink-0" size={24} />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-6">
            <button 
              onClick={() => window.open('https://rzp.io/rzp/aHiYicHJ', '_blank')}
              className="w-full md:w-auto bg-blue-cta hover:bg-blue-hover text-white px-12 py-5 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-cta/20"
            >
              Pay ₹4,999 & Get Started Now
            </button>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Secure your 7-day fast-track slot instantly. Our team will contact you within 24 hours after payment to begin your project.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-cta/10 to-transparent"></div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-primary py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10 flex justify-center">
          <div className="h-[80px] w-[128px] flex items-center justify-center">
  <img 
    src="/images/logo-main.png" 
    alt="MedPro Insights Logo" 
    className="h-full w-full object-contain" 
  />
</div>
        </div>
        <p className="text-slate-500 text-sm">
          © 2026 MedPro Insights. All Rights Reserved. Professional Web Development in 7 Days.
        </p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-blue-cta/30">
      <Navbar />
      <Hero />
      <LogoCarousel />
      <AuthoritySection />
      <OnlinePresence />
      <WhyOffer />
      <EverythingYouNeed />
      <VideoTestimonial />
      <ClientTestimonials />
      <TrustStrip />
      <StatsSection />
      <FAQ />
      <FinalCTA />
      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-40">
        <button 
          onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-blue-cta text-white font-bold py-4 rounded-xl shadow-2xl shadow-blue-cta/40 flex items-center justify-center space-x-2"
        >
          <span>Get Started Now</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}