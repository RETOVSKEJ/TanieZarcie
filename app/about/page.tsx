import s from "./about.module.css";
import Footer from "@/components/Footer/Footer";
import ZnalazlesBlad from "../zglos-problem/page";
import Image from "next/image";
import zdjecie from "@/public/about.jpg";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export const metadata = {
  title: "About | TanieZarcie",
  description: "Informacje o nas, o stronie i o tym co robimy.",
};

const dancingFont = Dancing_Script({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function About() {
  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1 style={{ marginInline: "auto" }}>About us</h1>
      </div>
      <hr className={s.hr} />
      <div className={s.content}>
        <div className={s.imageWrapper}>
          <Image src={zdjecie} alt="Zdjecie tanieZarcie" />
        </div>
        <div>
          <h2 className={dancingFont.className} style={{ fontSize: 32 }}>
            This is the about page
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            suscipit soluta alias facere quibusdam itaque delectus aperiam
            blanditiis cupiditate inventore! Exercitationem earum aliquam dolor
            blanditiis expedita atque culpa, quidem vero magnam quis reiciendis,
            commodi officiis esse odit labore id, voluptatibus asperiores dicta
            praesentium nulla. Libero ipsa cum corrupti harum similique! Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquid,
            vel commodi sed fuga nobis adipisci id.
          </p>
        </div>
      </div>
      <hr className={s.hr} />
      <div className={s.lowerWrapper}>
        <div className={s.contact}>
          <ZnalazlesBlad />
        </div>
        <Socials />
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
}

export function Socials() {
  return (
    <div className={s.socialsWrapper}>
      <h2 className={`${dancingFont.className} ${s.socialsHeader}`}>
        Nasze Media Społecznościowe:
      </h2>

      <div className={s.socials}>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.facebook.com/retovskej"
        >
          Facebook: <BsFacebook className="fb" role="button" />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.instagram.com/retolicious"
        >
          Instagram: <BsInstagram className="ig" role="button" />
        </Link>
        <Link
          target="_blank"
          rel="noopener"
          href="https://www.twitter.com/retovskej"
        >
          Twitter: <BsTwitter className="tw" role="button" />
        </Link>
      </div>
      <label className={s.label}>Odwiedź nas!</label>
    </div>
  );
}
