import { useState } from "react";
import { createPortal } from "react-dom";

import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
} from "@/lib/api/service";
import { Plus, X } from "lucide-react";
import Input from "@/components/atoms/input";
import styles from "@/styles/Home.module.css";
import AdminCard from "@/components/atoms/adminCard";
import Button from "@/components/atoms/button";

export async function getServerSideProps() {
  const projects = await getProjects();
  return {
    props: {
      projects,
    },
  };
}

const AdminPage = ({ projects: initialProjects }: { projects: any[] }) => {
  const [projects, setProjects] = useState(initialProjects);

  {
    /* Edit state management */
  }
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedShortDescription, setEditedShortDescription] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");

  {
    /* Create project state management */
  }
  const [creatingProject, setCreatingProject] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newShortDescription, setNewShortDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.adminHeader}>
          <div>
            <h1>Admin Panel</h1>
            <p>
              Welcome to the admin panel. Here you can manage your projects.
            </p>
          </div>
          <Button
            buttonStyle="buttonGreen"
            onClick={() => setCreatingProject(true)}
          >
            New project
            <Plus width={24} height={24} />
          </Button>
        </div>

        {/* Create new project */}
        <div>
          {creatingProject &&
            createPortal(
              <div className={styles.createProjectForm}>
                <Input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="New project title"
                />
                <Input
                  type="text"
                  value={newShortDescription}
                  onChange={(e) => setNewShortDescription(e.target.value)}
                  placeholder="New project short description"
                />
                <Input
                  type="textarea"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="New project description"
                />
                <Input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="New project image URL"
                />
                <button
                  onClick={async () => {
                    await createProject({
                      title: newTitle,
                      description: newDescription,
                      shortDescription: newShortDescription,
                      image: newImageUrl,
                    });
                    const updatedProjects = await getProjects();
                    setProjects(updatedProjects);
                    setNewTitle("");
                    setNewDescription("");
                    setNewShortDescription("");
                    setNewImageUrl("");
                  }}
                >
                  Create Project
                </button>
                <button onClick={() => setCreatingProject(false)}>
                  <X height={16} width={16} />
                </button>
              </div>,
              document.body,
            )}
        </div>

        <div>
          {projects.map((project) => (
            <AdminCard
              key={project.id}
              project={project}
              setTitle={setEditedTitle}
              setShortDescription={setEditedShortDescription}
              setDescription={setEditedDescription}
              setImage={setEditedImageUrl}
              deleteOnclick={async () => {
                await deleteProject(project.id);
                const updatedProjects = await getProjects();
                setProjects(updatedProjects);
              }}
              saveEdits={async () => {
                await updateProject(project.id, {
                  title: editedTitle,
                  description: editedDescription,
                  shortDescription: editedShortDescription,
                  image: editedImageUrl,
                });
                const updatedProjects = await getProjects();
                setProjects(updatedProjects);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
