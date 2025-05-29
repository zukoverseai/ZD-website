import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly: any;
  }
}

export interface CalendlyWidgetProps {
  calendlyUrl: string;
  className?: string;
  style?: React.CSSProperties;
  /** Prefill fields: https://help.calendly.com/article/429-getting-started-with-embed#prefill */
  prefill?: { name?: string; email?: string; [key: string]: any };
  /** UTM params: https://help.calendly.com/article/429-getting-started-with-embed#utm */
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

const SCRIPT_ID = "calendly-widget-script";
export const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  calendlyUrl,
  className,
  style,
  prefill = {},
  utm = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initInline = () => {
      if (ref.current && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: ref.current,
          prefill,
          utm,
        });
      }
    };

    // Load Calendly script if not already present
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", initInline);
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initInline;
      document.body.appendChild(script);
    }

    return () => {
      // no cleanup: Calendly manages its own DOM inside parentElement
    };
  }, [calendlyUrl, prefill, utm]);

  return <div ref={ref} className={className} style={style} />;
};

export default CalendlyWidget;
