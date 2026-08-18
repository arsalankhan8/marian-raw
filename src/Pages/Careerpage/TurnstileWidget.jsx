import { useEffect, useRef, useState } from "react";
import { turnstileSiteKey } from "./turnstile";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise;

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);
    const handleLoad = () => {
      if (window.turnstile) {
        resolve(window.turnstile);
      } else {
        reject(new Error("Turnstile did not initialize."));
      }
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Turnstile could not be loaded.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = handleLoad;
    script.onerror = () => reject(new Error("Turnstile could not be loaded."));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

export default function TurnstileWidget() {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!turnstileSiteKey || !container) {
      return undefined;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled) {
          return;
        }

        const widgetId = turnstile.render(container, {
          sitekey: turnstileSiteKey,
          action: "career_application",
          theme: "light",
          appearance: "interaction-only",
          retry: "auto",
          "response-field": true,
          "response-field-name": "cf-turnstile-response",
          "error-callback": () => setLoadError(true),
        });
        widgetIdRef.current = widgetId;
        container.dataset.turnstileWidgetId = String(widgetId);
      })
      .catch(() => setLoadError(true));

    return () => {
      cancelled = true;

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      delete container.dataset.turnstileWidgetId;
    };
  }, []);

  if (!turnstileSiteKey || loadError) {
    return (
      <p role="alert" className="text-[13px] text-red-700">
        Security verification is temporarily unavailable.
      </p>
    );
  }

  return <div ref={containerRef} data-turnstile-widget />;
}
