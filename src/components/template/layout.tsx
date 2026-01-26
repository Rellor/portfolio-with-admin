import styles from "@/styles/Home.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.navLink}>
            <a href="/">Home</a>
          </li>
          <li className={styles.navLink}>
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
