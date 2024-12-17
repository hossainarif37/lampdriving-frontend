import { FC } from 'react';
// import footerBg from '@/assets/footer-images/tt-foter-bg.jpg';
// import ttFooter from '@/assets/footer-images/tt-foter-bg1.png';
// import Image from 'next/image';
import CopyRightSection from './CopyRightSection';
import FooterDesign from './FooterDesign';
import FooterSearchBoxDesign from './FooterSearchBoxDesign';
import footerbg from "@/assets/footer-images/footerbg.jpg"


const Footer: FC = () => {
    return (
        <div className='mt-32 relative'>
            {/*== Footer search box ==*/}
            <FooterSearchBoxDesign />
            <div className=' bg-cover bg-center' style={{ backgroundImage: `url(${footerbg.src})` }}>
                {/*==== Footer Body ===*/}
                <FooterDesign />

                {/* === Copyright section === */}
                <CopyRightSection />
            </div>
        </div>
    );
};

export default Footer;
