"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type ExpandableListProps<T> = {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyText: string;
  initialCount?: number;
  wrapperClassName?: string;
};

export default function ExpandableList<T>({
  title,
  items,
  renderItem,
  emptyText,
  initialCount = 6,
  wrapperClassName,
}: ExpandableListProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, initialCount);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-[#60258A]">{title}</h2>
        {items.length > initialCount && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm text-[#ff5338] hover:text-[#ED2809] hover:underline cursor-pointer"
          >
            {expanded ? "Hide" : `Show all (${items.length})`}
            <motion.span
              initial={false}
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400">{emptyText}</p>
      ) : (
        <AnimatePresence initial={false}>
          <motion.div
            key={expanded ? "expanded" : "collapsed"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={clsx("gap-4", wrapperClassName)}>
              {visibleItems.map(renderItem)}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
