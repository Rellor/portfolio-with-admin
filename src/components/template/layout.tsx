import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li
            className={`${styles.navLink} ${pathname === "/" ? styles.activeNavLink : ""}`}
          >
            <a href="/">Home</a>
          </li>
          <li
            className={`${styles.navLink} ${pathname === "/about" ? styles.activeNavLink : ""}`}
          >
            <a href="/about">About me</a>
          </li>
        </ul>
        <a className={styles.userNavLink} href="/admin">
          BR
        </a>
      </nav>
      {children}
    </div>
  );
}
