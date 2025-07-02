import { motion } from "framer-motion";

const MissingSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-brand-coral to-brand-yellow bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At BlogSpace, we believe that everyone has a story worth
                telling. Our platform removes the barriers between writers and
                their audience, creating a space where creativity flourishes and
                communities thrive.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We're not just building a blogging platform – we're crafting the
                future of digital storytelling, where technology serves
                creativity and community comes first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-primary mb-2">
                      50K+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Active Writers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-coral mb-2">
                      1M+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Stories Shared
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-yellow mb-2">
                      25+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Countries
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-slate mb-2">
                      99.9%
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Uptime
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default MissingSection
