import { motion } from "framer-motion";

export default function Centerheading({
  heading,
  subtext,
  headingcss = "",
  subtextcss = "",
  textColor = "text-white",
  as = "h2",
}) {
  const Heading = as;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Heading className={`font-bold text-center uppercase ${textColor} ${headingcss}`}>
        {heading}
      </Heading>
      <p className={`font-normal text-center ${textColor} ${subtextcss}`}>
        {subtext}
      </p>
    </motion.div>
  );
}
