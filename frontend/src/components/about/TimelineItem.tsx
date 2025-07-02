import { motion } from "framer-motion";

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    description: string;
  };
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative flex items-start mb-12 last:mb-0"
    >
      <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold z-10">
        {item.year.slice(-2)}
      </div>
      <div className="ml-8 flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-2">
            <span className="text-sm font-semibold text-brand-primary">
              {item.year}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
