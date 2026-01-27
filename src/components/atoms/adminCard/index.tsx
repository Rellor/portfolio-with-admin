import styles from "@/styles/Home.module.css";
import { Pen, TrashIcon } from "lucide-react";

export default function AdminCard({ project }: { project: any }) {
  return (
    <div className={styles.adminCard}>
      <img
        className={styles.cardImage}
        src={project.image}
        alt={project.title}
        width="300"
      />
      <div className={styles.cardContent}>
        <h2>{project.title}</h2>
        <p>{project.shortDescription}</p>
        <p>{project.description}</p>
      </div>

      <button className={styles.cardButton}>
        <Pen width={16} height={16} />
      </button>
      <button className={styles.cardButton}>
        <TrashIcon width={16} height={16} />
      </button>
    </div>
  );
}
