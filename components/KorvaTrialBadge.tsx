"use client";

import { useEffect, useRef, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { Upload } from "lucide-react";
import NextImage from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const COLORS = {
  night: "#0B0E1A",
  indigo: "#1B1F3B",
  indigo2: "#262B52",
  amber: "#FFB84D",
  coral: "#FF6B4A",
  paper: "#F6F1E7",
  ink: "#12131B",
  line: "rgba(246,241,231,0.14)",
};

// ------------------------------------
// TRIAL INFORMATION
// ------------------------------------

const TRIAL_LABEL = "7-Day Free Trial";
const TRIAL_DATES = "Sept 5 – 11";
const SITE = "www.korvatechhub.com";

const QUICK_MESSAGES = [
  "Starting my tech journey this week.",
  "Finally taking the first step into tech.",
  "Here to see what I can build.",
  "Betting on myself this cohort.",
];

// ------------------------------------
// HELPERS
// ------------------------------------

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();

  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);

  ctx.arcTo(x + w, y, x + w, y + r, r);

  ctx.lineTo(x + w, y + h - r);

  ctx.arcTo(
    x + w,
    y + h,
    x + w - r,
    y + h,
    r
  );

  ctx.lineTo(x + r, y + h);

  ctx.arcTo(
    x,
    y + h,
    x,
    y + h - r,
    r
  );

  ctx.lineTo(x, y + r);

  ctx.arcTo(
    x,
    y,
    x + r,
    y,
    r
  );

  ctx.closePath();
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text
    .split(/\s+/)
    .filter(Boolean);

  const lines: string[] = [];

  let current = "";

  for (const word of words) {
    const test = current
      ? `${current} ${word}`
      : word;

    if (
      ctx.measureText(test).width > maxWidth &&
      current
    ) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

/**
 * IMPORTANT:
 * Do NOT use `new Image()` here.
 *
 * Because this component imports NextImage from
 * next/image, using Image directly can cause a
 * conflict with the browser's Image constructor.
 */
function loadImageFromSrc(
  src: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(
        new Error("Failed to load image.")
      );
    };

    img.src = src;
  });
}

function drawDotGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.save();

  ctx.globalAlpha = 0.35;

  const gap = 34;

  for (let y = gap; y < height; y += gap) {
    for (let x = gap; x < width; x += gap) {
      ctx.beginPath();

      ctx.arc(
        x,
        y,
        1.15,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = COLORS.paper;
      ctx.fill();
    }
  }

  ctx.restore();
}

// ------------------------------------
// DRAW BADGE
// ------------------------------------

async function drawCard(
  canvas: HTMLCanvasElement,
  {
    name,
    message,
    photoSrc,
  }: {
    name: string;
    message: string;
    photoSrc: string | null;
  }
) {
  const SIZE = 1080;

  canvas.width = SIZE;
  canvas.height = SIZE;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error(
      "Canvas is not supported."
    );
  }

  // ------------------------------------
  // Make sure fonts are available
  // ------------------------------------

  try {
    await document.fonts.load(
      "700 54px 'Space Grotesk'"
    );

    await document.fonts.load(
      "400 30px 'Inter'"
    );

    await document.fonts.load(
      "700 40px 'Space Grotesk'"
    );
  } catch {
    // Continue even if font loading fails.
  }

  // ------------------------------------
  // Background
  // ------------------------------------

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      SIZE,
      SIZE
    );

  gradient.addColorStop(
    0,
    COLORS.night
  );

  gradient.addColorStop(
    0.55,
    COLORS.indigo
  );

  gradient.addColorStop(
    1,
    COLORS.indigo2
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    SIZE,
    SIZE
  );

  drawDotGrid(
    ctx,
    SIZE,
    SIZE
  );

  // ------------------------------------
  // Glow
  // ------------------------------------

  const glow =
    ctx.createRadialGradient(
      SIZE / 2,
      430,
      40,
      SIZE / 2,
      430,
      420
    );

  glow.addColorStop(
    0,
    "rgba(255,184,77,0.30)"
  );

  glow.addColorStop(
    1,
    "rgba(255,184,77,0)"
  );

  ctx.fillStyle = glow;

  ctx.fillRect(
    0,
    0,
    SIZE,
    SIZE
  );

// ------------------------------------
// Header Logo
// ------------------------------------

ctx.textBaseline = "alphabetic";
ctx.textAlign = "left";

try {
  const logo = await loadImageFromSrc(
    "/Korva-logo.png"
  );

  const logoWidth = 250;
  const logoHeight = 
    (logo.height / logo.width) * logoWidth;

  ctx.drawImage(
    logo,
    72,
    55,
    logoWidth,
    logoHeight
  );
} catch {
  // Fallback if logo cannot be loaded
  ctx.fillStyle = COLORS.paper;

  ctx.font =
    "700 40px 'Space Grotesk', sans-serif";

  ctx.fillText(
    "Korva",
    72,
    108
  );
}

  // ------------------------------------
  // Trial Pill
  // ------------------------------------

  ctx.font =
    "600 24px 'Inter', sans-serif";

  const pillTextWidth =
    ctx.measureText(
      TRIAL_LABEL
    ).width;

  const pillWidth =
    pillTextWidth + 56;

  const pillHeight = 52;

  const pillX =
    SIZE -
    72 -
    pillWidth;

  const pillY = 66;

  roundRectPath(
    ctx,
    pillX,
    pillY,
    pillWidth,
    pillHeight,
    pillHeight / 2
  );

  ctx.fillStyle =
    "rgba(255,184,77,0.14)";

  ctx.fill();

  ctx.lineWidth = 1.5;

  ctx.strokeStyle =
    COLORS.amber;

  ctx.stroke();

  ctx.fillStyle =
    COLORS.amber;

  ctx.textAlign = "center";

  ctx.fillText(
    TRIAL_LABEL,
    pillX + pillWidth / 2,
    pillY + 34
  );

  ctx.font =
    "400 18px 'Inter', sans-serif";

  ctx.fillStyle =
    "rgba(246,241,231,0.6)";

  ctx.fillText(
    TRIAL_DATES,
    pillX + pillWidth / 2,
    pillY + pillHeight + 26
  );

  // ------------------------------------
  // Photo
  // ------------------------------------

  const badgeSize = 480;

  const badgeX =
    (SIZE - badgeSize) / 2;

  const badgeY = 210;

  const radius = 40;

  // ------------------------------------
  // Photo outer border
  // ------------------------------------

  ctx.save();

  ctx.shadowColor =
    "rgba(0,0,0,0.45)";

  ctx.shadowBlur = 50;

  ctx.shadowOffsetY = 20;

  roundRectPath(
    ctx,
    badgeX - 8,
    badgeY - 8,
    badgeSize + 16,
    badgeSize + 16,
    radius + 8
  );

  const borderGradient =
    ctx.createLinearGradient(
      badgeX,
      badgeY,
      badgeX + badgeSize,
      badgeY + badgeSize
    );

  borderGradient.addColorStop(
    0,
    COLORS.amber
  );

  borderGradient.addColorStop(
    1,
    COLORS.coral
  );

  ctx.fillStyle =
    borderGradient;

  ctx.fill();

  ctx.restore();

  // ------------------------------------
  // Photo itself
  // ------------------------------------

  ctx.save();

  roundRectPath(
    ctx,
    badgeX,
    badgeY,
    badgeSize,
    badgeSize,
    radius
  );

  ctx.clip();

  if (photoSrc) {
    try {
      const img =
        await loadImageFromSrc(
          photoSrc
        );

      const scale =
        Math.max(
          badgeSize / img.width,
          badgeSize / img.height
        );

      const width =
        img.width * scale;

      const height =
        img.height * scale;

      ctx.drawImage(
        img,
        badgeX +
          (badgeSize - width) / 2,
        badgeY +
          (badgeSize - height) / 2,
        width,
        height
      );
    } catch {
      ctx.fillStyle =
        COLORS.indigo2;

      ctx.fillRect(
        badgeX,
        badgeY,
        badgeSize,
        badgeSize
      );

      ctx.fillStyle =
        "rgba(246,241,231,0.6)";

      ctx.font =
        "500 22px 'Inter', sans-serif";

      ctx.textAlign = "center";

      ctx.fillText(
        "Unable to load photo",
        badgeX +
          badgeSize / 2,
        badgeY +
          badgeSize / 2
      );
    }
  } else {
    ctx.fillStyle =
      COLORS.indigo2;

    ctx.fillRect(
      badgeX,
      badgeY,
      badgeSize,
      badgeSize
    );

    ctx.fillStyle =
      "rgba(246,241,231,0.4)";

    ctx.font =
      "500 22px 'Inter', sans-serif";

    ctx.textAlign = "center";

    ctx.fillText(
      "Your photo",
      badgeX +
        badgeSize / 2,
      badgeY +
        badgeSize / 2
    );
  }

  ctx.restore();

  // ------------------------------------
  // Ticket notches
  // ------------------------------------

  ctx.save();

  ctx.globalCompositeOperation =
    "destination-out";

  const notchY =
    badgeY +
    badgeSize / 2;

  ctx.beginPath();

  ctx.arc(
    badgeX - 8,
    notchY,
    26,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.beginPath();

  ctx.arc(
    badgeX + badgeSize + 8,
    notchY,
    26,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();

  // ------------------------------------
  // Name
  // ------------------------------------

  let cursorY =
    badgeY +
    badgeSize +
    92;

  ctx.textAlign = "center";

  ctx.fillStyle =
    COLORS.paper;

  ctx.font =
    "700 54px 'Space Grotesk', sans-serif";

  const displayName =
    name.trim() ||
    "Your Name";

  // Prevent extremely long names from
  // overflowing the badge.
  let finalName = displayName;

  if (
    ctx.measureText(finalName).width >
    850
  ) {
    ctx.font =
      "700 44px 'Space Grotesk', sans-serif";
  }

  ctx.fillText(
    finalName,
    SIZE / 2,
    cursorY
  );

  // ------------------------------------
  // Message
  // ------------------------------------

  cursorY += 56;

  ctx.font =
    "400 30px 'Inter', sans-serif";

  ctx.fillStyle =
    "rgba(246,241,231,0.82)";

  const finalMessage =
    message.trim() ||
    QUICK_MESSAGES[0];

  const lines = wrapLines(
    ctx,
    `“${finalMessage}”`,
    760
  );

  for (const line of lines.slice(
    0,
    3
  )) {
    cursorY += 40;

    ctx.fillText(
      line,
      SIZE / 2,
      cursorY
    );
  }

  // ------------------------------------
  // Footer
  // ------------------------------------

  const footerY =
    SIZE - 96;

  ctx.strokeStyle =
    COLORS.line;

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.moveTo(
    72,
    footerY - 40
  );

  ctx.lineTo(
    SIZE - 72,
    footerY - 40
  );

  ctx.stroke();

  ctx.textAlign = "left";

  ctx.font =
    "500 24px 'Inter', sans-serif";

  ctx.fillStyle =
    COLORS.amber;

  ctx.fillText(
    `Free trial cohort · ${TRIAL_DATES}`,
    72,
    footerY
  );

  ctx.textAlign = "right";

  ctx.fillStyle =
    "rgba(246,241,231,0.72)";

  ctx.fillText(
    SITE,
    SIZE - 72,
    footerY
  );
}

// ====================================
// COMPONENT
// ====================================

export default function KorvaTrialBadge() {
  const [name, setName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [photoSrc, setPhotoSrc] =
    useState<string | null>(null);

  const [fontsReady, setFontsReady] =
    useState(false);

  const [rendering, setRendering] =
    useState(false);

  const [rendered, setRendered] =
    useState(false);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null
    );

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  // ------------------------------------
  // Wait for fonts
  // ------------------------------------

  useEffect(() => {
    let mounted = true;

    const prepareFonts = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch {
        // Continue even if font loading fails.
      }

      if (mounted) {
        setFontsReady(true);
      }
    };

    prepareFonts();

    return () => {
      mounted = false;
    };
  }, []);

  // ------------------------------------
  // Photo upload
  // ------------------------------------

  const handlePhoto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select an image file."
      );

      event.target.value = "";

      return;
    }

    if (
      file.size >
      8 * 1024 * 1024
    ) {
      setError(
        "Please choose an image smaller than 8MB."
      );

      event.target.value = "";

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const result =
        reader.result;

      if (
        typeof result !== "string"
      ) {
        setError(
          "Couldn't process that photo."
        );

        return;
      }

      setPhotoSrc(result);

      setRendered(false);

      setError("");

      // Allows the user to select
      // the exact same file again.
      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }
    };

    reader.onerror = () => {
      setError(
        "Couldn't read that photo. Please try another one."
      );

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }
    };

    reader.readAsDataURL(file);
  };

  // ------------------------------------
  // Generate badge
  // ------------------------------------

  const generate = async () => {
    if (!name.trim()) {
      setError(
        "Please enter your name."
      );

      return;
    }

    if (!photoSrc) {
      setError(
        "Please upload your photo."
      );

      return;
    }

    if (!canvasRef.current) {
      setError(
        "Badge preview is not ready yet."
      );

      return;
    }

    setRendering(true);

    setError("");

    try {
      await drawCard(
        canvasRef.current,
        {
          name,
          message,
          photoSrc,
        }
      );

      setRendered(true);
    } catch (error) {
      console.error(
        "Badge generation error:",
        error
      );

      setError(
        "Couldn't create your badge. Please try another photo."
      );
    } finally {
      setRendering(false);
    }
  };

  // ------------------------------------
  // Download badge
  // ------------------------------------

  const downloadBadge = () => {
    const canvas =
      canvasRef.current;

    if (
      !canvas ||
      !rendered
    ) {
      return;
    }

    const safeName =
      name
        .trim()
        .replace(
          /[^a-zA-Z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        )
        .toLowerCase() ||
      "korva";

    const link =
      document.createElement(
        "a"
      );

    link.download =
      `korva-7-day-trial-${safeName}.png`;

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  // ------------------------------------
  // WhatsApp sharing
  // ------------------------------------

  const shareOnWhatsApp = () => {
    const text =
      encodeURIComponent(
        `🎉 I'm officially starting my tech journey with Korva Tech Hub!\n\n` +
          `I'm joining the ${TRIAL_LABEL}. 🚀\n\n` +
          `Find your own tech path and start your journey with Korva Tech Hub.\n\n` +
          `https://${SITE}`
      );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ------------------------------------
  // Copy page link
  // ------------------------------------

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "Couldn't copy the link."
      );
    }
  };

  // ====================================
  // UI
  // ====================================

  return (
    <main
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <div className="kv-root">
        <div className="kv-wrap">

          {/* ==========================
              HEADER
          =========================== */}

          <header className="kv-header">
            <div className="kv-word">
              <NextImage
                src="/Korva-logo.png"
                alt="Korva Tech Hub Academy logo"
                width={150}
                height={150}
                priority
              />
            </div>

            <div className="kv-title">
              You&apos;re in. Make it official. 🎉
            </div>

            <p className="kv-sub">
              Create your personalized
              confirmation badge for the Korva
              Tech Hub 7-Day Free Trial. Add
              your photo, download your badge,
              and share your first step into
              tech.
            </p>
          </header>

          {/* ==========================
              MAIN
          =========================== */}

          <section className="kv-grid">

            {/* ========================
                FORM
            ========================= */}

            <div className="kv-panel">

              <div className="kv-step">
                <span>1</span>
                Your details
              </div>

              {/* NAME */}

              <label className="kv-label">
                Your name
              </label>

              <input
                className="kv-input"
                value={name}
                onChange={(event) => {
                  setName(
                    event.target.value
                  );

                  setRendered(false);

                  setError("");
                }}
                placeholder="e.g. Damilare Arewa"
                maxLength={40}
              />

              {/* MESSAGE */}

              <label className="kv-label">
                Your message

                <span className="kv-optional">
                  Optional
                </span>
              </label>

              <textarea
                className="kv-textarea"
                value={message}
                onChange={(event) => {
                  setMessage(
                    event.target.value
                  );

                  setRendered(false);
                }}
                placeholder={
                  QUICK_MESSAGES[0]
                }
                maxLength={120}
              />

              {/* QUICK MESSAGES */}

              <div className="kv-chips">
                {QUICK_MESSAGES.map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className="kv-chip"
                      onClick={() => {
                        setMessage(item);

                        setRendered(false);
                      }}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* PHOTO */}

              <label className="kv-label">
                Your photo
              </label>

              {/* Hidden file input is
                  intentionally OUTSIDE
                  the upload button. */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhoto}
                hidden
              />

              <button
                type="button"
                className="kv-upload"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt="Your selected photo"
                  />
                ) : (
                  <div className="kv-upload-icon">
                    <Upload
                      size={30}
                    />
                  </div>
                )}

                <div className="kv-upload-title">
                  {photoSrc
                    ? "Change photo"
                    : "Upload your photo"}
                </div>

                <div className="kv-upload-text">
                  Use a clear photo where
                  your face is visible.
                </div>
              </button>

              {/* ERROR */}

              {error && (
                <div className="kv-error">
                  {error}
                </div>
              )}

              {/* GENERATE */}

              <button
                type="button"
                className="kv-btn kv-btn-primary"
                onClick={generate}
                disabled={
                  !fontsReady ||
                  rendering
                }
              >
                {rendering
                  ? "Creating your badge..."
                  : "Create My Badge"}
              </button>

              {/* ACTIONS */}

              {rendered && (
                <div className="kv-actions">

                  <button
                    type="button"
                    className="kv-btn kv-btn-secondary"
                    onClick={
                      downloadBadge
                    }
                  >
                    ⬇ Download Badge
                  </button>

                  <button
                    type="button"
                    className="kv-btn kv-btn-whatsapp"
                    onClick={
                      shareOnWhatsApp
                    }
                  >
                    Share on WhatsApp
                  </button>

                </div>
              )}
            </div>

            {/* ========================
                PREVIEW
            ========================= */}

            <div className="kv-preview">

              <div className="kv-preview-label">
                YOUR BADGE
              </div>

              <div
                className="kv-canvas-wrap"
                style={{
                  display: rendered
                    ? "block"
                    : "none",
                }}
              >
                <canvas
                  ref={canvasRef}
                />
              </div>

              {!rendered && (
                <div className="kv-placeholder">
                  <div>
                    <div className="kv-placeholder-icon">
                      ✨
                    </div>

                    <strong>
                      Your badge will appear
                      here
                    </strong>

                    <p>
                      Enter your name and
                      upload your photo to
                      get started.
                    </p>
                  </div>
                </div>
              )}

              {rendered && (
                <div className="kv-share-box">
                  <strong>
                    You&apos;re officially in! 🚀
                  </strong>

                  <span>
                    Download your badge and
                    share your first step
                    into tech.
                  </span>

                  <button
                    type="button"
                    onClick={
                      shareOnWhatsApp
                    }
                  >
                    Share on WhatsApp
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ==========================
              SHARING SECTION
          =========================== */}

          <section className="kv-bottom">

            <h2>
              Make your first step visible.
            </h2>

            <p>
              Share your badge on WhatsApp
              Status, Instagram or with your
              friends.
            </p>

            <div className="kv-bottom-actions">

              {rendered && (
                <>
                  <button
                    type="button"
                    className="kv-btn kv-btn-primary"
                    onClick={
                      downloadBadge
                    }
                  >
                    Download My Badge
                  </button>

                  <button
                    type="button"
                    className="kv-btn kv-btn-whatsapp"
                    onClick={
                      shareOnWhatsApp
                    }
                  >
                    Share on WhatsApp
                  </button>
                </>
              )}

              <button
                type="button"
                className="kv-link-btn"
                onClick={copyLink}
              >
                {copied
                  ? "✓ Link copied"
                  : "Copy badge link"}
              </button>
            </div>
          </section>

          {/* ==========================
              FOOTER
          =========================== */}

          <footer className="kv-footer">
            <strong>
              Korva Tech Hub Academy
            </strong>

            <span>
              {TRIAL_LABEL} · {TRIAL_DATES}
            </span>

            <a
              href={`https://${SITE}`}
              target="_blank"
              rel="noreferrer"
            >
              {SITE}
            </a>
          </footer>

        </div>
      </div>

      {/* ==============================
          STYLES
      =============================== */}

      <style jsx>{`
        .kv-root {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at top,
              #262b52 0%,
              #1b1f3b 35%,
              #0b0e1a 75%
            );

          color: ${COLORS.paper};

          padding: 48px 20px 70px;

          font-family:
            var(--font-inter),
            sans-serif;
        }

        .kv-root * {
          box-sizing: border-box;
        }

        .kv-wrap {
          max-width: 1050px;
          margin: 0 auto;
        }

        /* ==========================
           HEADER
        =========================== */

        .kv-header {
          text-align: center;
          margin-bottom: 45px;
        }

        .kv-word {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .kv-word img {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }

        .kv-title {
          font-family:
            var(--font-space-grotesk),
            sans-serif;

          font-size:
            clamp(34px, 5vw, 58px);

          line-height: 1.05;

          font-weight: 700;

          margin:
            22px auto 16px;

          max-width: 760px;
        }

        .kv-sub {
          max-width: 650px;

          margin: 0 auto;

          color:
            rgba(
              246,
              241,
              231,
              0.68
            );

          font-size: 16px;

          line-height: 1.7;
        }

        /* ==========================
           GRID
        =========================== */

        .kv-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 0.9fr)
            minmax(0, 1.1fr);

          gap: 45px;

          align-items: start;
        }

        /* ==========================
           FORM PANEL
        =========================== */

        .kv-panel {
          background:
            rgba(
              18,
              19,
              27,
              0.62
            );

          border:
            1px solid
            rgba(
              246,
              241,
              231,
              0.12
            );

          border-radius: 22px;

          padding: 28px;

          backdrop-filter:
            blur(10px);
        }

        .kv-step {
          display: flex;

          align-items: center;

          gap: 10px;

          font-weight: 700;

          font-family:
            var(--font-space-grotesk),
            sans-serif;

          font-size: 18px;

          margin-bottom: 28px;
        }

        .kv-step span {
          display: grid;

          place-items: center;

          width: 30px;
          height: 30px;

          border-radius: 50%;

          background:
            ${COLORS.amber};

          color:
            ${COLORS.ink};

          font-size: 13px;
        }

        /* ==========================
           LABELS
        =========================== */

        .kv-label {
          display: block;

          margin-bottom: 8px;

          font-size: 14px;

          font-weight: 600;
        }

        .kv-optional {
          margin-left: 8px;

          font-size: 12px;

          opacity: 0.45;

          font-weight: 400;
        }

        /* ==========================
           INPUTS
        =========================== */

        .kv-input,
        .kv-textarea {
          width: 100%;

          border:
            1px solid
            rgba(
              246,
              241,
              231,
              0.16
            );

          background:
            rgba(
              11,
              14,
              26,
              0.8
            );

          color:
            ${COLORS.paper};

          border-radius: 11px;

          padding: 14px;

          font: inherit;

          font-size: 15px;

          margin-bottom: 20px;

          outline: none;
        }

        .kv-input::placeholder,
        .kv-textarea::placeholder {
          color:
            rgba(
              246,
              241,
              231,
              0.35
            );
        }

        .kv-input:focus,
        .kv-textarea:focus {
          border-color:
            ${COLORS.amber};
        }

        .kv-textarea {
          min-height: 95px;

          resize: vertical;
        }

        /* ==========================
           QUICK MESSAGE CHIPS
        =========================== */

        .kv-chips {
          display: flex;

          flex-wrap: wrap;

          gap: 7px;

          margin-top: -8px;

          margin-bottom: 22px;
        }

        .kv-chip {
          border:
            1px solid
            rgba(
              246,
              241,
              231,
              0.16
            );

          background: transparent;

          color:
            rgba(
              246,
              241,
              231,
              0.68
            );

          border-radius: 999px;

          padding: 7px 10px;

          font: inherit;

          font-size: 12px;

          cursor: pointer;

          transition:
            border-color 0.15s ease,
            color 0.15s ease,
            background 0.15s ease;
        }

        .kv-chip:hover {
          border-color:
            ${COLORS.amber};

          color:
            ${COLORS.amber};

          background:
            rgba(
              255,
              184,
              77,
              0.06
            );
        }

        /* ==========================
           UPLOAD
        =========================== */

        .kv-upload {
          width: 100%;

          border:
            1.5px dashed
            rgba(
              246,
              241,
              231,
              0.25
            );

          background:
            rgba(
              11,
              14,
              26,
              0.45
            );

          color:
            ${COLORS.paper};

          border-radius: 14px;

          padding: 22px;

          cursor: pointer;

          margin-bottom: 20px;

          font-family: inherit;

          transition:
            border-color 0.15s ease,
            background 0.15s ease;
        }

        .kv-upload:hover {
          border-color:
            ${COLORS.amber};

          background:
            rgba(
              255,
              184,
              77,
              0.04
            );
        }

        .kv-upload:focus-visible {
          outline:
            2px solid
            ${COLORS.amber};

          outline-offset: 3px;
        }

        .kv-upload img {
          display: block;

          width: 82px;
          height: 82px;

          object-fit: cover;

          border-radius: 50%;

          border:
            2px solid
            ${COLORS.amber};

          margin:
            0 auto 10px;
        }

        .kv-upload-icon {
          display: flex;

          justify-content: center;

          margin-bottom: 8px;

          color:
            ${COLORS.amber};
        }

        .kv-upload-title {
          font-weight: 600;

          font-size: 14px;

          margin-bottom: 5px;
        }

        .kv-upload-text {
          font-size: 12px;

          color:
            rgba(
              246,
              241,
              231,
              0.5
            );
        }

        /* ==========================
           ERROR
        =========================== */

        .kv-error {
          background:
            rgba(
              255,
              107,
              74,
              0.1
            );

          border:
            1px solid
            rgba(
              255,
              107,
              74,
              0.25
            );

          color:
            ${COLORS.coral};

          border-radius: 9px;

          padding:
            10px 12px;

          margin-bottom: 15px;

          font-size: 13px;
        }

        /* ==========================
           BUTTONS
        =========================== */

        .kv-btn {
          width: 100%;

          border: 0;

          border-radius: 11px;

          padding:
            14px 16px;

          font: inherit;

          font-size: 14px;

          font-weight: 700;

          cursor: pointer;

          transition:
            transform 0.15s ease,
            opacity 0.15s ease,
            box-shadow 0.15s ease;
        }

        .kv-btn:hover {
          transform:
            translateY(-1px);
        }

        .kv-btn:disabled {
          opacity: 0.5;

          cursor:
            not-allowed;

          transform: none;
        }

        .kv-btn-primary {
          background:
            linear-gradient(
              120deg,
              ${COLORS.amber},
              ${COLORS.coral}
            );

          color:
            ${COLORS.ink};
        }

        .kv-btn-primary:hover:not(
          :disabled
        ) {
          box-shadow:
            0 10px 30px
            rgba(
              255,
              184,
              77,
              0.18
            );
        }

        .kv-btn-secondary {
          background:
            rgba(
              246,
              241,
              231,
              0.08
            );

          border:
            1px solid
            rgba(
              246,
              241,
              231,
              0.18
            );

          color:
            ${COLORS.paper};
        }

        .kv-btn-whatsapp {
          background:
            #25d366;

          color:
            #06130a;
        }

        .kv-actions {
          display: grid;

          gap: 10px;

          margin-top: 10px;
        }

        /* ==========================
           PREVIEW
        =========================== */

        .kv-preview {
          position: sticky;

          top: 25px;
        }

        .kv-preview-label {
          font-size: 11px;

          letter-spacing:
            0.15em;

          color:
            rgba(
              246,
              241,
              231,
              0.45
            );

          font-weight: 700;

          margin-bottom: 10px;
        }

        .kv-canvas-wrap,
        .kv-placeholder {
          width: 100%;

          max-width: 540px;

          margin: 0 auto;

          aspect-ratio: 1;

          border-radius: 22px;

          overflow: hidden;
        }

        .kv-canvas-wrap {
          box-shadow:
            0 25px 80px
            rgba(
              0,
              0,
              0,
              0.5
            );
        }

        .kv-canvas-wrap canvas {
          display: block;

          width: 100%;

          height: 100%;
        }

        .kv-placeholder {
          border:
            1px solid
            rgba(
              246,
              241,
              231,
              0.12
            );

          background:
            rgba(
              18,
              19,
              27,
              0.4
            );

          display: grid;

          place-items: center;

          text-align: center;

          padding: 40px;

          color:
            rgba(
              246,
              241,
              231,
              0.55
            );
        }

        .kv-placeholder-icon {
          font-size: 42px;

          margin-bottom: 15px;
        }

        .kv-placeholder strong {
          display: block;

          color:
            ${COLORS.paper};

          margin-bottom: 8px;
        }

        .kv-placeholder p {
          font-size: 13px;

          line-height: 1.5;

          max-width: 280px;

          margin: 0 auto;
        }

        /* ==========================
           SHARE BOX
        =========================== */

        .kv-share-box {
          margin:
            15px auto 0;

          max-width: 540px;

          padding: 18px;

          border:
            1px solid
            rgba(
              255,
              184,
              77,
              0.25
            );

          background:
            rgba(
              255,
              184,
              77,
              0.07
            );

          border-radius: 14px;

          text-align: center;
        }

        .kv-share-box strong {
          display: block;

          margin-bottom: 5px;
        }

        .kv-share-box span {
          display: block;

          color:
            rgba(
              246,
              241,
              231,
              0.6
            );

          font-size: 13px;

          margin-bottom: 12px;
        }

        .kv-share-box button {
          border: 0;

          border-radius: 8px;

          padding:
            9px 14px;

          background:
            #25d366;

          color:
            #06130a;

          font-weight: 700;

          cursor: pointer;
        }

        /* ==========================
           BOTTOM
        =========================== */

        .kv-bottom {
          margin-top: 70px;

          text-align: center;

          padding:
            40px 20px;

          border-top:
            1px solid
            rgba(
              246,
              241,
              231,
              0.1
            );
        }

        .kv-bottom h2 {
          font-family:
            var(--font-space-grotesk),
            sans-serif;

          font-size: 28px;

          margin:
            0 0 8px;
        }

        .kv-bottom p {
          color:
            rgba(
              246,
              241,
              231,
              0.58
            );

          font-size: 14px;

          margin:
            0 auto 22px;
        }

        .kv-bottom-actions {
          display: flex;

          gap: 10px;

          max-width: 500px;

          margin: 0 auto;

          flex-wrap: wrap;
        }

        .kv-bottom-actions
          .kv-btn {
          flex: 1;

          min-width: 180px;
        }

        .kv-link-btn {
          border: 0;

          background: transparent;

          color:
            ${COLORS.amber};

          cursor: pointer;

          font: inherit;

          font-size: 13px;

          padding: 10px;
        }

        .kv-link-btn:hover {
          text-decoration:
            underline;
        }

        /* ==========================
           FOOTER
        =========================== */

        .kv-footer {
          display: flex;

          justify-content: center;

          align-items: center;

          flex-wrap: wrap;

          gap: 12px;

          color:
            rgba(
              246,
              241,
              231,
              0.4
            );

          font-size: 12px;

          margin-top: 25px;
        }

        .kv-footer a {
          color:
            ${COLORS.amber};

          text-decoration: none;
        }

        .kv-footer a:hover {
          text-decoration:
            underline;
        }

        /* ==========================
           TABLET
        =========================== */

        @media (max-width: 800px) {
          .kv-root {
            padding:
              32px 16px 55px;
          }

          .kv-grid {
            grid-template-columns:
              1fr;

            gap: 30px;
          }

          .kv-preview {
            position: static;

            order: -1;
          }

          .kv-panel {
            padding: 22px;
          }

          .kv-title {
            font-size:
              clamp(
                32px,
                10vw,
                48px
              );
          }
        }

        /* ==========================
           MOBILE
        =========================== */

        @media (max-width: 480px) {
          .kv-header {
            margin-bottom: 30px;
          }

          .kv-sub {
            font-size: 14px;
          }

          .kv-canvas-wrap,
          .kv-placeholder {
            border-radius: 16px;
          }

          .kv-footer {
            flex-direction:
              column;
          }

          .kv-bottom-actions {
            flex-direction:
              column;
          }

          .kv-bottom-actions
            .kv-btn {
            width: 100%;

            min-width: 0;
          }
        }
      `}</style>
    </main>
  );
}