import { Container, Embed, EmbedLoading } from "@linktr.ee/ui-link-kit";
import { SettingsData } from "./types";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

window.React = React;

function App({ __linkUrl = "" }: SettingsData) {
  const embedRef = useRef<HTMLDivElement | null>(null);
  const loadedLaylo = useRef(false);
  const [dropAttached, setDropAttached] = React.useState(false);

  const fetchDrop = async ({
    dropId,
    username,
  }: {
    dropId: string;
    username: string;
  }) => {
    const dropResponse = await fetch(
      `https://d21i0hc4hl3bvt.cloudfront.net/${username}/${dropId}.json`
    );

    /** Get the lat and long from cloudfront's headers */
    const userLat = dropResponse.headers.get("CloudFront-Viewer-Latitude");
    const userLong = dropResponse.headers.get("CloudFront-Viewer-Longitude");

    const location = {
      latitude: userLat,
      longitude: userLong,
    };

    const drop = (await dropResponse.json()) as any;

    return { drop, location };
  };

  const fetchUser = async ({ userId }: { userId: string }) => {
    const user = (
      await fetch(`https://d3oyaxbt9vo0fg.cloudfront.net/users/${userId}.json`)
    ).json() as Promise<any>;

    return user;
  };

  const attachDrop = async () => {
    if (!embedRef.current) {
      return;
    }

    const [username, dropId = "profile", multidropId] = __linkUrl
      .replace("laylo.com/", "")
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/");

    const dropIdToUse = dropId === "m" ? multidropId : dropId;

    if (!username) {
      clearInterval(loadLayloInterval);

      return;
    }

    const { drop, location } = await fetchDrop({
      dropId: dropIdToUse.replace("@b0t", ""),
      username: username,
    });
    const userId = drop.user.id;
    const user = await fetchUser({ userId });

    const {
      DataProvider,
      RSVPProvider,
      LinktreeEmbeddedDrop,
      sortSubProducts,
    } = (window as any).Laylo;

    drop.sortedSubProducts = sortSubProducts(
      drop.orderedSubProducts || [],
      location
    );

    ReactDOM.render(
      <DataProvider
        customTheme="linktree"
        userOverrides={user}
        parentProductOverrides={drop.isMultidrop ? drop : undefined}
        productOverrides={drop}
      >
        <RSVPProvider>
          <LinktreeEmbeddedDrop />
        </RSVPProvider>
      </DataProvider>,
      embedRef.current
    );

    setDropAttached(true);
  };

  const loadLayloInterval = setInterval(() => {
    if (loadedLaylo.current) {
      attachDrop();
      clearInterval(loadLayloInterval);
    }
  }, 25);

  useEffect(() => {
    const head = document.head;
    const layloDropCss = document.createElement("link");
    layloDropCss.rel = "stylesheet";
    layloDropCss.href = "https://laylo.com/drop-pages/index.css";
    head.appendChild(layloDropCss);
  }, []);

  useEffect(() => {
    const loadScripts = async () => {
      // Must be set BEFORE laylo.js loads — the embed reads __CAPTCHA_PROVIDER__ at init.
      // "shadow" runs reCAPTCHA + Turnstile in parallel; reCAPTCHA token is used,
      // Turnstile is logged for metrics. Matches laylo-drop-page production setting.
      (window as any).__CAPTCHA_PROVIDER__ = "shadow";

      await loadScript("https://embed.laylo.com/linktree/laylo.js");
      loadedLaylo.current = true;
      await Promise.allSettled([
        loadScript(
          "https://www.google.com/recaptcha/api.js?render=6LfaRWApAAAAAPvWsG2tsIhBCLEdXyz_EUQtQily"
        ),
        loadScript(
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        ),
      ]);

      const style = document.createElement("style");
      style.innerHTML = ".grecaptcha-badge { display: none; }";
      document.head.appendChild(style);
    };

    loadScripts();
  }, []);

  return (
    <Container
      logo="https://public.laylo.com/assets/branding/laylo-wordmark-grey-minimum.svg"
      skeleton={(dropAttached ? null : <EmbedLoading />) as any}
    >
      <Embed ref={embedRef} />
    </Container>
  );
}

const loadScript = (src: string) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

export default App;
