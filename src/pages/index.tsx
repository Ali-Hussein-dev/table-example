import type { NextPage } from "next";
import * as React from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { ImageBg, Layout } from "../components";
//----------------------------------------------------------------------
const Section = ({
  id,
  children,
  ...rest
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <section
      id={id}
      className="grid min-h-screen py-2 bg-transparent element place-items-center"
      {...rest}
    >
      <div className="container grid h-full mx-auto rounded place-items-center">
        {children}
      </div>
    </section>
  );
};
//----------------------------------------------------------------------
const Home: NextPage = () => {
  return (
    <Layout title="Website Starter">
      <Section id="#section1">
        <div className="grid w-full h-full place-items-center">
          <div className="space-y-1 text-center rounded-full text-slate-200 z-[1] bg-base-100/30 backdrop-blur p-28 w-full md:w-auto">
            <h1 className="text-2xl font-extrabold leading-snug md:text-3xl">
              Website Starter With
              <br />
              Nextjs & TailwindCSS
            </h1>
            <h2 className="text-xl">SECTION 1</h2>
          </div>
          <ImageBg />
        </div>
      </Section>
      <Section id="#section2">
        <div className="px-2">
          <h2 className="mb-2 text-5xl">Features</h2>
          <ul className="space-y-1 text-lg">
            {[
              "Responsive Layout",
              "Scroll to element",
              "Progress bar on route changing",
              "Custom scrollbar",
              "Common components: Navbar, footer & content",
            ].map((li) => (
              <li key={li} className="row-start gap-x-2">
                <ImCheckboxChecked />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section id="#section3">
        <h2 className="text-2xl">SECTION 3</h2>
      </Section>
      <Section id="#section4">
        <h2 className="text-2xl">SECTION 4</h2>
      </Section>
    </Layout>
  );
};

export default Home;
