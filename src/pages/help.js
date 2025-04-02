import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "To create an account, click the &apos;Sign Up&apos; button in the top right corner. Follow the prompts to enter your email, create a password, and choose your subscription plan."
        },
        {
          q: "What are the different subscription plans?",
          a: "We offer three plans: Basic (SD quality, 1 screen), Standard (HD quality, 2 screens), and Premium (4K+HDR quality, 4 screens)."
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Sign In', then 'Forgot Password'. Enter your email address and we'll send you instructions to reset your password."
        }
      ]
    },
    {
      title: "Watching Goojera",
      questions: [
        {
          q: "What devices can I watch on?",
          a: "You can watch on your smartphone, tablet, Smart TV, laptop, or streaming device, including Roku, FireTV, Chromecast, and Apple TV."
        },
        {
          q: "How do I download videos to watch offline?",
          a: "With our Standard and Premium plans, you can download titles to watch offline. Look for the download icon next to eligible titles."
        },
        {
          q: "How do I change video quality?",
          a: "While watching, click the settings icon and select your preferred quality. Higher quality uses more data."
        }
      ]
    },
    {
      title: "Billing & Payments",
      questions: [
        {
          q: "When will I be billed?",
          a: "Your monthly billing date is based on your signup date. You'll be charged automatically each month unless you cancel."
        },
        {
          q: "How do I update my payment method?",
          a: "Go to Account > Membership & Billing > Update payment method to change or update your payment information."
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes, you can cancel your subscription at any time. Go to Account > Membership & Billing > Cancel Membership."
        }
      ]
    }
  ];

  const filteredCategories = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Head>
        <title>Help Center - Goojera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="relative px-4 pb-24 lg:px-16 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            How can we help?
          </h1>

          {/* Search Bar */}
          <div className="relative mb-12">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] text-white px-12 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              <div key={index} className="bg-[#141414] rounded-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-white hover:bg-[#1a1a1a]"
                  onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                >
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  {activeCategory === index ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                
                {activeCategory === index && (
                  <div className="px-6 pb-6">
                    {category.questions.map((item, qIndex) => (
                      <div key={qIndex} className="mt-4">
                        <h3 className="text-white font-medium mb-2">{item.q}</h3>
                        <p className="text-gray-400">{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Can't find what you're looking for?
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help; 