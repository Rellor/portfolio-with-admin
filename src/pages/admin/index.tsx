import { useState } from "react";
import { createPortal } from "react-dom";

import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
} from "@/lib/api/service";
import { Check, Pen, Plus, TrashIcon, X } from "lucide-react";
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
  const [editProject, setEditProject] = useState(null);
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
            <AdminCard key={project.id} project={project} />
          ))}
          {projects.map((project) => (
            <div key={project.id}>
              {/* Update title */}
              {editProject === project.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <h2>{project.title}</h2>
              )}

              {/* Update short description */}
              {editProject === project.id ? (
                <input
                  type="text"
                  value={editedShortDescription}
                  onChange={(e) => setEditedShortDescription(e.target.value)}
                />
              ) : (
                <p>{project.shortDescription}</p>
              )}

              {/* Update description */}
              {editProject === project.id ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                <p>{project.description}</p>
              )}

              {/* Update image */}
              {editProject === project.id ? (
                <input
                  type="text"
                  value={editedImageUrl}
                  onChange={(e) => setEditedImageUrl(e.target.value)}
                />
              ) : (
                <img src={project.image} alt={project.title} width="300" />
              )}

              {/* Delete project */}
              <button
                onClick={async () => {
                  await deleteProject(project.id);
                  const updatedProjects = await getProjects();
                  setProjects(updatedProjects);
                }}
              >
                <TrashIcon />
              </button>

              {/* Edit project */}
              <button
                onClick={() => {
                  setEditProject(project.id);
                  setEditedTitle(project.title);
                  setEditedShortDescription(project.shortDescription);
                  setEditedDescription(project.description);
                  setEditedImageUrl(project.image);
                }}
              >
                <Pen />
              </button>

              {/* Save or cancel edits */}
              {editProject === project.id && (
                <>
                  <button
                    onClick={async () => {
                      await updateProject(project.id, {
                        title: editedTitle,
                        description: editedDescription,
                        image: editedImageUrl,
                      });
                      setEditProject(null);
                      const updatedProjects = await getProjects();
                      setProjects(updatedProjects);
                    }}
                  >
                    <Check />
                  </button>
                  <button onClick={() => setEditProject(null)}>
                    <X />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
