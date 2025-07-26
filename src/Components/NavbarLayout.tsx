import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Navbar/Nav";

interface LayoutProps {
  children: ReactNode;
}

export default function NavbarLayout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().replace(/\/+$/, "");

  const noNavFooterPages = [
    "/signup",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/dashboard/overview",
    "/become-creator",
    "/share-work",
    "/upload-image",
    "/payment",
    "/subscription-tier",
  ];

  return (
    <div>
      {!noNavFooterPages.includes(currentPath) && <Nav />}
      {children}
      {!noNavFooterPages.includes(currentPath) && <Footer />}
    </div>
  );
}
