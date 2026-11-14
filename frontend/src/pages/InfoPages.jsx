
import { useState } from "react";
import { Link } from "react-router-dom";

const pageData = {
  about: {
    eyebrow: "ABOUT OUR STORE",
    title: "Shopping made simple.",
    description:
      "Welcome to Amazon Clone, a full-stack e-commerce learning project designed to make discovering and shopping for products simple and convenient.",
    button: "Explore Products",
    buttonLink: "/products",
    icon: "🛍️",
    features: [
      {
        icon: "📦",
        title: "Products for Everyone",
        description:
          "Explore electronics, fashion, books, home essentials and more.",
      },
      {
        icon: "🔒",
        title: "Account Security",
        description:
          "Register, sign in and manage your shopping account.",
      },
      {
        icon: "🚚",
        title: "Order Tracking",
        description:
          "View your orders and follow their delivery status.",
      },
    ],
  },

  careers: {
    eyebrow: "CAREERS",
    title: "Build something meaningful.",
    description:
      "Explore example career opportunities in technology, customer experience and e-commerce.",
    icon: "💼",
    features: [
      {
        icon: "💻",
        title: "Frontend Developer",
        description:
          "Help build responsive, accessible and user-friendly shopping experiences.",
      },
      {
        icon: "⚙️",
        title: "Backend Developer",
        description:
          "Work with APIs, databases and the systems behind online shopping.",
      },
      {
        icon: "🤝",
        title: "Customer Experience",
        description:
          "Help customers find products and understand their orders.",
      },
    ],
  },

  contact: {
    eyebrow: "CONTACT US",
    title: "We're here to help.",
    description:
      "Have a question about your shopping experience? Use the contact form below to explore our demo contact interface.",
    icon: "💬",
    features: [
      {
        icon: "📩",
        title: "General Questions",
        description:
          "Find information about the store and its features.",
      },
      {
        icon: "📦",
        title: "Order Support",
        description:
          "Learn where to find your orders and their current status.",
      },
      {
        icon: "🛠️",
        title: "Technical Support",
        description:
          "Get guidance about using the shopping interface.",
      },
    ],
  },

  sell: {
    eyebrow: "SELL WITH US",
    title: "Bring your products to more people.",
    description:
      "Discover how a seller experience could work in this e-commerce demonstration project.",
    icon: "🏪",
    features: [
      {
        icon: "📝",
        title: "Create Product Listings",
        description:
          "Present your products with names, descriptions, prices and images.",
      },
      {
        icon: "📊",
        title: "Manage Inventory",
        description:
          "Keep track of available products and stock quantities.",
      },
      {
        icon: "📦",
        title: "Manage Orders",
        description:
          "View customer orders and follow their progress.",
      },
    ],
  },

  affiliate: {
    eyebrow: "AFFILIATE PROGRAM",
    title: "Share products you love.",
    description:
      "Learn how an affiliate program can connect product recommendations with potential customers.",
    icon: "🔗",
    features: [
      {
        icon: "🔍",
        title: "Discover Products",
        description:
          "Find products that match the interests of your audience.",
      },
      {
        icon: "📣",
        title: "Share Recommendations",
        description:
          "Introduce products through content and recommendations.",
      },
      {
        icon: "📈",
        title: "Understand Performance",
        description:
          "An affiliate platform can provide information about clicks and referrals.",
      },
    ],
  },

  advertise: {
    eyebrow: "ADVERTISE WITH US",
    title: "Help customers discover your products.",
    description:
      "Explore example advertising options for brands and sellers in an online marketplace.",
    icon: "📢",
    features: [
      {
        icon: "⭐",
        title: "Featured Products",
        description:
          "Highlight selected products in promotional placements.",
      },
      {
        icon: "🎯",
        title: "Reach Your Audience",
        description:
          "Present relevant products to shoppers exploring the store.",
      },
      {
        icon: "📊",
        title: "Review Performance",
        description:
          "Advertising platforms can report impressions, clicks and engagement.",
      },
    ],
  },

  help: {
    eyebrow: "HELP CENTER",
    title: "How can we help you?",
    description:
      "Find answers to common questions about accounts, shopping carts, checkout and orders.",
    icon: "💡",
    features: [
      {
        icon: "👤",
        title: "Account & Sign In",
        description:
          "Learn how to register, sign in and access your account.",
      },
      {
        icon: "🛒",
        title: "Shopping & Cart",
        description:
          "Find products, choose quantities and manage your cart.",
      },
      {
        icon: "📦",
        title: "Orders & Returns",
        description:
          "Find your orders and review their current status.",
      },
    ],
  },
};

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Open the Register page, enter your details and submit the registration form.",
  },
  {
    question: "How do I find a product?",
    answer:
      "Browse the Products page, use the search bar or select a product category.",
  },
  {
    question: "How do I add products to my cart?",
    answer:
      "Open a product, select your quantity and click Add to Cart.",
  },
  {
    question: "Where can I find my orders?",
    answer:
      "Open Returns & Orders from the header to view your order history after signing in.",
  },
  {
    question: "How can I update my cart?",
    answer:
      "Open your cart to review the selected products, change quantities or remove items.",
  },
];

const InfoPage = ({ page }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const data = pageData[page];

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Page not found
        </h1>

        <Link
          to="/"
          className="mt-5 rounded-lg bg-yellow-400 px-6 py-3 font-semibold hover:bg-yellow-500"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormMessage(
      "Thank you! This is a demo form. Your message has not been sent to a server."
    );
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
              {data.eyebrow}
            </p>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              {data.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {data.description}
            </p>

            {data.button && (
              <Link
                to={data.buttonLink}
                className="mt-8 inline-flex rounded-full bg-yellow-400 px-7 py-3 font-bold text-slate-900 transition hover:bg-yellow-300"
              >
                {data.button} →
              </Link>
            )}
          </div>

          <div className="flex justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/10 text-8xl shadow-2xl ring-1 ring-white/20 sm:h-80 sm:w-80 sm:text-9xl">
              {data.icon}
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">

        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            DISCOVER MORE
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {page === "help"
              ? "What do you need help with?"
              : page === "contact"
              ? "How can we support you?"
              : "Everything you need to know"}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Explore the information below and discover the features available in our demo store.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {data.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-3xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Contact Form */}
      {page === "contact" && (
        <section className="border-t border-gray-200 bg-white px-5 py-14 sm:px-8 md:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
                GET IN TOUCH
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Send us a message
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Use this form to preview the contact experience. This learning project does not send messages to a real support team.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <span className="text-2xl">📧</span>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Email Support
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Contact form demo
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl">🕒</span>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Support Hours
                    </h3>

                    <p className="mt-1 text-gray-600">
                      Demo information page
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
            >
              <div className="space-y-5">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Write your message..."
                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-yellow-400 px-6 py-3 font-bold text-gray-900 transition hover:bg-yellow-500"
                >
                  Preview Submission
                </button>

                {formMessage && (
                  <p
                    role="status"
                    className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
                  >
                    {formMessage}
                  </p>
                )}

              </div>
            </form>

          </div>
        </section>
      )}

      {/* Help Center FAQ */}
      {page === "help" && (
        <section className="border-t border-gray-200 bg-white px-5 py-14 sm:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <p className="mt-3 text-gray-600">
                Search common questions or select a question to read its answer.
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="faq-search"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Search help topics
              </label>

              <input
                id="faq-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search accounts, cart, orders..."
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        openFaq === faq.question
                          ? null
                          : faq.question
                      )
                    }
                    aria-expanded={openFaq === faq.question}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50"
                  >
                    <span>{faq.question}</span>

                    <span className="text-xl text-orange-600">
                      {openFaq === faq.question ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === faq.question && (
                    <div className="border-t border-gray-100 px-5 py-4 leading-7 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <p className="rounded-xl bg-gray-50 p-6 text-gray-600">
                  No matching questions found. Try another search.
                </p>
              )}
            </div>

          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-orange-50 p-8 sm:p-10 md:flex-row md:items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to explore the store?
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              Discover products across different categories.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex shrink-0 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Browse Products →
          </Link>

        </div>
      </section>

    </main>
  );
};

export default InfoPage;

