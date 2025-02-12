import type { AppProps } from "next/app";
import "../global.css"; // Using the same globals.css

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}
