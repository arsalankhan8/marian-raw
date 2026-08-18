export const turnstileSiteKey =
  import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || "";

export function resetTurnstileWidget(form) {
  const container = form.querySelector("[data-turnstile-widget]");
  const widgetId = container?.dataset.turnstileWidgetId;

  if (widgetId && window.turnstile) {
    window.turnstile.reset(widgetId);
  }
}
