import { Outlet } from "react-router";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function MainLayout() {

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
