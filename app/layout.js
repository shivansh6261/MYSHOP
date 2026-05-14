import "./globals.css";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast"; // <-- 1. Import Toaster

export const metadata = {
  title: "MyShop",
  description: "Premium Everyday Wear",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          
          {/* 2. Add Toaster at the bottom of your app */}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              duration: 3000, // Disappears after 3 seconds
              style: {
                background: '#333',
                color: '#fff',
                fontWeight: 'bold',
              },
              success: {
                iconTheme: {
                  primary: '#10b981', // Your Emerald-500 color!
                  secondary: '#fff',
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}