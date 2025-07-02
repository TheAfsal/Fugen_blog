import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense, lazy } from "react";

const ContactInfoCard = lazy(
  () => import("@/components/contact/ContactInfoCar")
);
const ContactForm = lazy(() => import("@/components/contact/ContactForm"));
const FAQItem = lazy(() => import("@/components/contact/FAQItem"));

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@blogspace.com",
    color: "text-brand-coral",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    contact: "+1 (555) 123-4567",
    color: "text-brand-yellow",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    contact: "123 Innovation St, Tech City, TC 12345",
    color: "text-brand-slate",
  },
];

const faqs = [
  {
    question: "How do I get started with BlogSpace?",
    answer:
      "Simply sign up for a free account and you can start writing immediately. No setup required!",
  },
  {
    question: "Is BlogSpace free to use?",
    answer:
      "Yes! We offer a generous free tier. Premium features are available for advanced users.",
  },
  {
    question: "Can I import my existing blog?",
    answer: "We support imports from most major blogging platforms.",
  },
  {
    question: "How do I customize my blog's appearance?",
    answer:
      "Use our theme editor to customize colors, fonts, and layouts to match your brand.",
  },
];

export const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/10 via-transparent to-brand-coral/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span>Get in Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Suspense fallback={<div>Loading contact cards...</div>}>
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={info.title} info={info} index={index} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Suspense fallback={<div>Loading contact form...</div>}>
              <ContactForm />
            </Suspense>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-brand-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Quick answers to common questions
                </p>
              </div>

              <Suspense fallback={<div>Loading FAQs...</div>}>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      index={index}
                    />
                  ))}
                </div>
              </Suspense>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <Card className="border-0 shadow-lg bg-gradient-to-r from-brand-mint/10 to-brand-coral/10">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Globe className="w-6 h-6 text-brand-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold mb-2">Global Support</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Our support team is available 24/7 across multiple
                          time zones. We typically respond within 2-4 hours
                          during business days.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
