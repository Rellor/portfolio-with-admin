import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta name="description" content="Get to know more about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <h1 className={styles.title}>About Me</h1>
          <div className={styles.aboutContent}>
            <Image
              src="/Bas-de-Roller.jpg"
              alt="Profile Picture"
              width={700}
              height={900}
            />
            <div className={styles.aboutText}>
              <p>
                Hi, I’m <strong>Bas</strong>, a front-end developer and web
                designer with{" "}
                <strong>2.5 years of hands-on development experience</strong>,
                focused on building visually engaging and high-performing web
                experiences.
              </p>

              <p>
                I am a passionate programmer and designer driven by creativity.
                My work reflects my love for innovative solutions, and I take
                pride in crafting projects that I’m genuinely proud of. I mainly
                work with{" "}
                <strong>
                  HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS
                </strong>
                , and I have experience integrating{" "}
                <strong>
                  headless CMS platforms such as Directus and Strapi
                </strong>
                , as well as building e-commerce solutions using{" "}
                <strong>Shopify</strong>. This allows me to create scalable,
                modern, and maintainable web applications.
              </p>

              <p>
                With a strong sense of{" "}
                <strong>
                  UI/UX awareness, visual design, and creative thinking
                </strong>
                , I enjoy transforming ideas into polished digital products. I’m
                passionate about creating smooth animations, intuitive layouts,
                and optimized code that not only looks great but also performs
                efficiently across devices.
              </p>

              <p>
                Before moving fully into development, I spent{" "}
                <strong>5 years working in customer service</strong>, which
                strengthened my{" "}
                <strong>
                  team collaboration skills, adaptability, and user-focused
                  mindset
                </strong>
                . This background helps me communicate effectively with clients
                to understand their real needs. At the same time, open
                communication within a team is very important to me — supporting
                each other and sharing knowledge is key to building great
                software.
              </p>

              <p>
                My motivation for front-end development comes from{" "}
                <strong>visual change</strong>. Watching a blank canvas evolve
                into an interactive experience is what drives me every day. I’m
                constantly improving my craft and aim to grow into a front-end
                specialist who can eventually support and mentor other
                developers.
              </p>

              <p>
                Outside of coding, I enjoy{" "}
                <strong>collecting vinyl and discovering new music</strong>,
                <strong>gaming</strong>, going on <strong>city trips</strong>,
                and relaxing with <strong>movies and TV shows</strong>. These
                interests fuel my creativity and keep me inspired.
              </p>

              <p>
                If you’re looking for someone who blends{" "}
                <strong>
                  technical expertise, creativity, and design awareness
                </strong>
                , feel free to contact me!
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
