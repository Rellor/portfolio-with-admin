import Head from "next/head";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "@/styles/Home.module.css";
import { getProjects } from "@/lib/api/service";

// getStaticPaths - Pre-generate all project pages at the build time
// This function runs during build and tells Next.js which dynamic routes exist.
// That way, Next.js can generate the HTML for each project page ahead of time.
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const projects = await getProjects();
    const paths = projects.map((project: any) => ({
      params: {
        project: `${project.title.toLowerCase().replace(/\s+/g, "-")}-${project.id}`,
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Failed to generate static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// getStaticProps - Fetch project data at the build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const projectSlug = params?.project as string;
    const id = projectSlug.split("-").pop();

    const projects = await getProjects();
    const project = projects.find((p: any) => p.id === id);

    if (!project) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return {
      notFound: true,
      revalidate: 60, // Retry after 1 minute if there was an error
    };
  }
};

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
}

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      <Head>
        <title>{project.title} | My Portfolio</title>
        <meta name="description" content={project.shortDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page}`}>
        <main className={styles.main}>
          {/* Next.js Image component with performance */}
          {/* priority meaning load immediately and skip lazy loading */}
          {/* quality put to 85 is a good balance between quality and file size */}
          <Image
            className={styles.projectImage}
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            priority // This can load immediately as it's the main image
            quality={85}
          />

          <h1 className={styles.projectTitle}>{project.title}</h1>

          <p className={styles.projectDescription}>
            {/* Split description by ## delimiter and add line breaks */}
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
