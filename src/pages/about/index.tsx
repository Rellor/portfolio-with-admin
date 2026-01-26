import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home({ projects }: { projects: any[] }) {
  console.log(projects);
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
        </main>
      </div>
    </>
  );
}
