import Link from 'next/link';
import { FC } from 'react';

const FooterDesign: FC = () => {
    return (
        <div className="wrapper grid lg:grid-cols-4 md:grid-cols-2 gap-8 pt-40 pb-10 text-textCol px-4">
            {/* About Section */}
            <div className="space-y-8">
                <h2 className="text-2xl text-primary font-bold">LampLogo</h2>
                <p className="text-sm">
                    Shahid Uzzaman has more than 25 years of driving instruction experience in New South Wales (NSW). He is known for being very friendly and polite and specializes in preparing for the driving test. His endless experience has helped over a thousand people pass through his school.
                </p>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold group flex flex-col">
                    Contact Info
                    <span className="mt-[12px] h-[2px] lg:w-1/3 w-1/3 rounded-full bg-textCol"></span>
                </h2>
                <p className="md:leading-0 leading-relaxed text-sm">
                    We would love to hear from you! Feel free to reach out for general inquiries, collaboration, or to get involved.
                </p>
            </div>

            {/* Useful Links Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold group flex flex-col">
                    Useful Links
                    <span className="mt-[12px] h-[2px] md:w-1/7 w-1/3 rounded-full bg-textCol"></span>
                </h2>
                <div className="my-3 flex flex-col md:gap-3 gap-2 text-sm">
                    <Link href={'/'} className="hover:text-primary duration-300">Home</Link>
                    <Link href={'/faq'} className="hover:text-primary duration-300"> FAQ</Link>
                    <Link href={'blogs'} className="hover:text-primary duration-300">Blogs</Link>
                    <Link href={'about'} className="hover:text-primary duration-300">About</Link>
                    <Link href={'/instructor'} className="hover:text-primary duration-300">Become an Instructor</Link>
                </div>
            </div>

            {/* Update News Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold group flex flex-col">
                    Update News
                    <span className="mt-[12px] h-[2px] w-1/3 rounded-full bg-textCol"></span>
                </h2>
                <div className="space-y-2 text-sm">
                    <p>Lamp Driving School While The Lovely Valley Team Work</p>
                    <p>December 13, 2024</p>
                </div>
            </div>
        </div>
    );
};

export default FooterDesign;
