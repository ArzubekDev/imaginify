import { navLinks } from "@/constants";
import Link from "next/link";

const Home = () => {
  return (
    <>
     <section className="">
      <h1 className="">Unleash Your Creative Vision with Imaginigy</h1>

      <ul className="flex items-center w-full gap-20">
        {
          navLinks.slice(1, 5).map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center flex-col gap-2">
              <li>
                {link.icon}
              </li>
              <p>{link.label}</p>
            </Link>
          ))
        }
      </ul>
     </section>
    </>
  );
};

export default Home;
