export function addScript(url) {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    url = url.replace("/nms", "");
  }

  const normalize = (src) => {
    if (!src) return "";
    try {
      return new URL(src, location.href).href;
    } catch (e) {
      return String(src);
    }
  };

  const targetUrl = normalize(url);
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const existingAttr = scripts[i].getAttribute("src");
    if (existingAttr === url) return;
    if (normalize(existingAttr || scripts[i].src) === targetUrl) return;
  }

  const script = document.createElement("script");
  script.type = "application/javascript";
  script.src = url;
  document.head.appendChild(script);
}

export function loadStyle(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}
