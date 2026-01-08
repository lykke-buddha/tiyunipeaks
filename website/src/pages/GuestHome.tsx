import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { Amenities } from '../components/sections/Amenities';
import { PlotSection } from '../components/sections/PlotSection';
import { Footer } from '../components/sections/Footer';
import { Inquiries } from '../components/sections/Inquiries';
import { Testimonial } from '../components/sections/Testimonial';
import { CTA } from '../components/sections/CTA';

export function GuestHome() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Amenities />
                <PlotSection />
                <Inquiries />
                <Testimonial />
                <CTA />
            </main>
            <Footer />
        </>
    );
}
