import "./globals.css";

export const metadata = {
  title: "Miss Rideeka | Portfolio",
  description: "Business analyst and software developer portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Montserrat:wght@800;900&family=Noto+Sans+Sinhala:wght@600&family=Noto+Sans+Devanagari:wght@600&family=Noto+Sans+JP:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#ededeb] text-[#080808] antialiased">{children}</body>
    </html>
  );
}