import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/${project.title.replace(/\s+/g, "")}-${project.id}`}
      className={styles.projectCard}
    >
      <div className={styles.content}>
        <h2>{project.title}</h2>
        <p>{project.shortDescription}</p>
      </div>
      <img
        className={`${styles.overlay} ${project.containImage ? styles.contain : ""}`}
        src={project.image}
        alt={project.title}
        width="300"
      />
    </Link>
  );
}
