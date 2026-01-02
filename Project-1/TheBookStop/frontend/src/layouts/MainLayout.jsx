import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}
