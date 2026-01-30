import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { getProjects } from "@/lib/api/service";
import LoadingSpinner from "@/components/atoms/loadingSpinner";

export default function ProjectPage() {
  const router = useRouter();
  const { project: projectSlug } = router.query;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectSlug) return;

    const fetchProject = async () => {
      try {
        // Extract ID from slug (format: "Title-ID")
        const id = projectSlug.toString().split("-").pop();

        // Fetch all projects and find the matching one
        const projects = await getProjects();
        const foundProject = projects.find((p: any) => p.id === id);

        setProject(foundProject);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectSlug]);

  if (loading) return <LoadingSpinner />;
  if (!project) return <div>Project not found</div>;

  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta name="description" content={project.shortDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <img
            className={styles.projectImage}
            src={project.image}
            alt={project.title}
            width="600"
          />
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.projectDescription}>
            {project.description
              .split("##")
              .map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  {index < project.description.split("##").length - 1 && <br />}
                </span>
              ))}
          </p>
        </main>
      </div>
    </>
  );
}
