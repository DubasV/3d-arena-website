(() => {
  const pixelId = String(window.ARENA_VK_PIXEL_ID || "").trim();
  if (!pixelId) return;

  const normalize = value => String(value || "event").toLowerCase().replace(/[^a-z0-9_-]+/g, "_").slice(0, 64);

  const loader = document.getElementById("tmr-code");
  window._tmr = window._tmr || [];
  const hasPageView = Boolean(loader) || (Array.isArray(window._tmr) && window._tmr.some(item => String(item?.id) === String(pixelId) && item?.type === "pageView"));
  if (!hasPageView && typeof window._tmr.push === "function") {
    window._tmr.push({ id: pixelId, type: "pageView", start: Date.now() });
  }
  window.arenaVkTrack = action => {
    if (typeof window._tmr?.push === "function") {
      window._tmr.push({ id: pixelId, type: "reachGoal", goal: normalize(action) });
    }
  };

  if (!loader) {
    const script = document.createElement("script");
    script.id = "tmr-code";
    script.async = true;
    script.src = "https://top-fwz1.mail.ru/js/code.js";
    document.head.append(script);
  }
})();
