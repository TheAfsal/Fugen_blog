import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  color: string;
}

interface ContactInfoCardProps {
  info: ContactInfo;
  index: number;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ info, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mx-auto mb-6 ${info.color}`}
          >
            <info.icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">{info.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {info.description}
          </p>
          <p className="font-semibold text-brand-primary">{info.contact}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactInfoCard;
