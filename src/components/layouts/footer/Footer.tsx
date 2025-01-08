import { FC } from 'react';
// import footerBg from '@/assets/footer-images/tt-foter-bg.jpg';
// import ttFooter from '@/assets/footer-images/tt-foter-bg1.png';
// import Image from 'next/image';
import CopyRightSection from './CopyRightSection';
import FooterSearch from './FooterSearch';
import footerbg from "@/assets/footer-images/footerbg.jpg"
import Link from 'next/link';
import logo from "@/assets/logo-image/logo.png"
import Image from 'next/image';


const Footer: FC = () => {
    return (
        <div className='mt-32 relative text-gray-200'>
            {/*== Footer search box ==*/}
            <FooterSearch />

            <div className='bg-primary'>
                {/*==== Footer Body ===*/}
                <div className="wrapper grid lg:grid-cols-4 md:grid-cols-2 gap-8 pt-40 pb-10 text-light px-4">
                    {/* About Section */}
                    <div >
                        {/* <h2 className="text-2xl text-primary font-bold">LampLogo</h2> */}
                        <Image alt='lamdriving logo' src={logo} height={100} width={140} />
                        <p className="text-sm">
                            Lamp Driving School connects learners with experienced driving instructors, offering a seamless platform to search, book, and manage driving lessons. Your journey to confident driving starts here!
                        </p>
                    </div>

                    {/* Contact Info Section */}
                    <div className="space-y-4">
                        <h2 className="text-gray-200 text-2xl font-semibold group flex flex-col">
                            Contact Info
                            <span className="mt-[12px] h-[2px] lg:w-1/3 w-1/3 rounded-full bg-light"></span>
                        </h2>
                        <p className="md:leading-0 leading-relaxed text-sm">
                            We would love to hear from you! Feel free to reach out for general inquiries, collaboration, or to get involved.
                        </p>
                    </div>

                    {/* Useful Links Section */}
                    <div className="space-y-4">
                        <h2 className="text-gray-200 text-2xl font-semibold group flex flex-col">
                            Useful Links
                            <span className="mt-[12px] h-[2px] md:w-1/7 w-1/3 rounded-full bg-light"></span>
                        </h2>
                        <ul className="my-3 flex flex-col md:gap-3 gap-2 text-sm">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="blogs">Blogs</Link></li>
                            <li><Link href="about">About</Link></li>
                            <li><Link href="/instructor">Become an Instructor</Link></li>
                        </ul>
                    </div>

                    {/* Update News Section */}
                    <div className="space-y-4">
                        <h2 className="text-gray-200 text-2xl font-semibold group flex flex-col">
                            Update News
                            <span className="mt-[12px] h-[2px] w-1/3 rounded-full bg-light"></span>
                        </h2>
                        <div className="space-y-2 text-sm">
                            <p>Lamp Driving School While The Lovely Valley Team Work</p>
                            <p>December 13, 2024</p>
                        </div>
                    </div>
                </div>

                {/* === Copyright section === */}
                <CopyRightSection />
            </div>
        </div>
    );
};

export default Footer;
