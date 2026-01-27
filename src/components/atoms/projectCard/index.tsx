import styles from "@/styles/Home.module.css";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.content}>
        <h2>{project.title}</h2>
        <p>{project.shortDescription}</p>
      </div>
      <img
        className={styles.overlay}
        src={project.image}
        alt={project.title}
        width="300"
      />
    </div>
  );
}
