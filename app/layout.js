import "./globals.css";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext"; // <-- 1. Import it

export const metadata = {
  title: "MyShop",
  description: "Premium Everyday Wear",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 2. Wrap everything inside CartProvider */}
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}