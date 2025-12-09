import React, { useEffect, useState } from "react";

function loadScript(src, onLoad) {
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
  } else {
    onLoad();
  }
}

const PlatformSDK = {
  platform: null,
  init(platform) {
    this.platform = platform;
    if (platform === "messenger") {
      loadScript("https://sdk.messenger.com/js/messenger.Extensions.js", () => {
        console.log("Messenger SDK loaded");
      });
    } else if (platform === "telegram") {
      loadScript("https://telegram.org/js/telegram-web-app.js", () => {
        console.log("Telegram SDK loaded");
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.ready();
        }
      });
    }
  },
  closeWebview() {
    if (this.platform === "messenger" && window.MessengerExtensions) {
      window.MessengerExtensions.requestCloseBrowser(
        () => console.log("Messenger webview closed"),
        (err) => console.error("Error closing Messenger webview", err)
      );
    } else if (this.platform === "telegram" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
      console.log("Telegram webview closed");
    } else {
      alert("Close webview not supported on this platform.");
    }
  },
  getUserContext(callback) {
    if (this.platform === "messenger" && window.MessengerExtensions) {
      window.MessengerExtensions.getContext(
        "YOUR_PAGE_ID", // Replace with your Facebook Page ID
        (context) => callback(null, context),
        (error) => callback(error, null)
      );
    } else if (this.platform === "telegram" && window.Telegram && window.Telegram.WebApp) {
      callback(null, window.Telegram.WebApp.initDataUnsafe);
    } else {
      callback(new Error("Platform SDK not available"), null);
    }
  },
};

function App() {
  const [platform, setPlatform] = useState(null);
  const [userContext, setUserContext] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("platform");

    if (p === "messenger" || p === "telegram") {
      setPlatform(p);
      PlatformSDK.init(p);
    } else {
      setPlatform("web");
    }
  }, []);

  const fetchUserContext = () => {
    PlatformSDK.getUserContext((err, ctx) => {
      if (err) {
        setError(err.message);
        setUserContext(null);
      } else {
        setUserContext(ctx);
        setError(null);
      }
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Multi-Platform Web App</h1>
      <p>
        Detected Platform: <strong>{platform}</strong>
      </p>
      <button onClick={fetchUserContext} style={{ marginRight: 10 }}>
        Get User Context
      </button>
      <button onClick={() => PlatformSDK.closeWebview()}>Close Webview</button>

      {userContext && (
        <pre
          style={{
            background: "#f0f0f0",
            padding: 10,
            marginTop: 20,
            maxHeight: 300,
            overflow: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(userContext, null, 2)}
        </pre>
      )}
      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          Error: {error}
        </p>
      )}
      {platform === "web" && (
        <p style={{ marginTop: 20 }}>
          This is a normal web browser without platform SDK.
        </p>
      )}
    </div>
  );
}

export default App;
