import React, { Children, useEffect, useRef } from 'react';

export default function MobileAutoMarquee({ className, children }) {
  const items = Children.toArray(children);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length < 2) return undefined;

    const timer = window.setInterval(() => {
      if (window.innerWidth > 768 || document.hidden || container.scrollWidth <= container.clientWidth + 4) return;
      const containerLeft = container.getBoundingClientRect().left;
      const positions = [...container.children].map((item) => ({
        item,
        left: item.getBoundingClientRect().left - containerLeft + container.scrollLeft
      }));
      const currentIndex = positions.findIndex(({ item, left }) => left + item.offsetWidth > container.scrollLeft + 12);
      const next = positions[currentIndex + 1];
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 4;
      container.scrollTo({ left: atEnd || !next ? 0 : next.left, behavior: 'smooth' });
    }, 2400);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className={`mobile-auto-marquee ${className || ''}`} ref={containerRef}>
      <div className="mobile-auto-marquee-track">{items}</div>
    </div>
  );
}
