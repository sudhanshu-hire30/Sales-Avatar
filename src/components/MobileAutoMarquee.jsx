import React, { Children, cloneElement } from 'react';

export default function MobileAutoMarquee({ className, children }) {
  const items = Children.toArray(children);

  return (
    <div className={`mobile-auto-marquee ${className || ''}`}>
      <div className="mobile-auto-marquee-track">
        {items}
        {items.map((item, index) => cloneElement(item, {
          key: `marquee-copy-${index}`,
          'aria-hidden': true,
          tabIndex: -1
        }))}
      </div>
    </div>
  );
}
