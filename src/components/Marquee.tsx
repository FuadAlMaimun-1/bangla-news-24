import Link from 'next/link';
import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css";

interface NewsHeadline {
    title: string;
    id: string;
}

const Marquee = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const data = await res.json();
    const headlines: NewsHeadline[] = data.data;

    return (
        <div className="bg-red-700 text-white  px-4">

           <div className="flex items-center mx-auto max-w-7xl">
             <div className="bg-red-900 text-white py-2 px-4">সর্বশেষ</div>

            <MarqueeText direction="right" duration={15}>
                {
                headlines.map((h, i) => (
                    <span key={i} className="hover:underline ">
                        <Link href={`/news/${h.id}`}>
                        {h.title}
                        </Link>
                        <span>ㆍ</span>
                    </span>
                ))
            }
            </MarqueeText>
           </div>
        </div>
    );
};

export default Marquee;