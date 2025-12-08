import React from "react";

/**
 * Renders HTML/JSX/Vue/Astro code inside a sandboxed iframe.
 * Kept identical to your original, with types.
 */

function prepareJsxComponent(code: string) {
  let sanitized = code.trim();

  // 1. Remove exports
  sanitized = sanitized
    .replace(
      /export\s+default\s+function\s+([A-Za-z0-9_]+)?/,
      (_, name) => `function ${name || "App"}`
    )
    .replace(/export\s+function\s+([A-Za-z0-9_]+)/g, "function $1")
    .replace(/export\s+const\s+([A-Za-z0-9_]+)/g, "const $1");

  // 2. Convert React imports -> global variable access
  sanitized = sanitized.replace(
    /import\s+React.*from\s+['"]react['"];?/g,
    "const React = window.React;"
  );
  sanitized = sanitized.replace(
    /import\s+{([^}]+)}\s+from\s+['"]react['"];?/g,
    "const { $1 } = React;"
  );

  // 3. If no App defined, wrap
  if (!/function\s+App/.test(sanitized) && !/const\s+App\s*=/.test(sanitized)) {
    sanitized = `const App = () => (${sanitized});`;
  }

  return sanitized;
}

export function ComponentRenderer({
  code,
  language,
  css,
  javascript,
  viewportMode = "desktop",
}: {
  code: string;
  language: "html" | "css" | "javascript" | "jsx" | "vue" | "astro";
  css?: string;
  javascript?: string;
  viewportMode?: "mobile" | "desktop";
}) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    if (!iframeRef.current) return;

    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    if (!doc) return;

    let htmlContent = "";
    let scripts = "";
    let cssContent = css || "";

    // Extract JavaScript from CSS if it contains <script> tags
    if (cssContent.includes("<script>")) {
      const scriptMatch = cssContent.match(/<script>([\s\S]*?)<\/script>/);
      if (scriptMatch) {
        scripts = `<script>${scriptMatch[1]}</script>`;
        cssContent = cssContent.replace(/<script>[\s\S]*?<\/script>/, "");
      }
    }

    // Add separate JavaScript if provided
    if (javascript) {
      scripts += `<script>${javascript}</script>`;
    }

    if (
      language === "html" ||
      language === "css" ||
      language === "javascript"
    ) {
      htmlContent = code;
    } else if (language === "jsx") {
      htmlContent = '<div id="root"></div>';
      const sanitizedCode = prepareJsxComponent(code)
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`")
        .replace(/\${/g, "\\${");

      scripts = `
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/babel" data-presets="react">
          ${sanitizedCode}
          const mountNode = document.getElementById('root');
          if (ReactDOM.createRoot) {
            const root = ReactDOM.createRoot(mountNode);
            root.render(React.createElement(App));
          } else {
            ReactDOM.render(React.createElement(App), mountNode);
          }
        </script>
      `;
    }

    const viewportWidth = viewportMode === "mobile" ? "375" : "device-width";
    const viewportContent =
      viewportMode === "mobile"
        ? `width=${viewportWidth}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`
        : "width=device-width, initial-scale=1.0";

    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="${viewportContent}">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
            ${cssContent}
          </style>
        </head>
        <body>
          ${htmlContent}
          ${scripts}
        </body>
      </html>
    `;

    doc.open();
    doc.write(fullHTML);
    doc.close();
  }, [code, language, css, javascript, viewportMode]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      className="w-full h-full border-0 bg-white"
      style={{
        maxWidth: viewportMode === "mobile" ? "375px" : "100%",
        margin: viewportMode === "mobile" ? "0 auto" : "0",
      }}
      title="Component Preview"
    />
  );
}

export default ComponentRenderer;
