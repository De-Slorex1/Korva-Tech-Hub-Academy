import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from "next/script";

import './globals.css'
import { Toaster } from "sonner"
const geistSans = {
  className: "font-sans",
};

const geistMono = {
  className: "font-mono",
};

export const metadata: Metadata = {
  title: 'Korva Tech Hub Academy',
  description: 'Korva Tech Hub Academy helps aspiring software engineers build job-ready skills through hands-on training in software development, UI/UX design, data analysis, AI, cybersecurity, and more.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.png',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}

        <Script
            id="tiktok-pixel"
            strategy="afterInteractive"
          >
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;
                var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer=function(t,e){
                  t[e]=function(){
                    t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                  }
                };
                for(var i=0;i<ttq.methods.length;i++){
                  ttq.setAndDefer(ttq,ttq.methods[i]);
                }

                ttq.instance=function(t){
                  var e=ttq._i[t]||[];
                  for(var n=0;n<ttq.methods.length;n++){
                    ttq.setAndDefer(e,ttq.methods[n]);
                  }
                  return e;
                };

                ttq.load=function(e,n){
                  var r="https://analytics.tiktok.com/i18n/pixel/events.js",
                      o=n&&n.partner;

                  ttq._i=ttq._i||{};
                  ttq._i[e]=[];
                  ttq._i[e]._u=r;

                  ttq._t=ttq._t||{};
                  ttq._t[e]=+new Date;

                  ttq._o=ttq._o||{};
                  ttq._o[e]=n||{};

                  n=document.createElement("script");
                  n.type="text/javascript";
                  n.async=true;
                  n.src=r+"?sdkid="+e+"&lib="+t;

                  var s=document.getElementsByTagName("script")[0];
                  if (s.parentNode) {
                    s.parentNode.insertBefore(n, s);
                  }
                };

                ttq.load("D935FPBC77U79CKEN2O0");
                ttq.page();

              }(window, document, "ttq");
            `}
          </Script>

      </body>
    </html>
  )
}
