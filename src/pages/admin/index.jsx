import { useState } from "react";

import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
} from "@/lib/api/service";
import { Check, Pen, TrashIcon, X } from "lucide-react";

export async function getServerSideProps() {
  const projects = await getProjects();
  return {
    props: {
      projects,
    },
  };
}

const AdminPage = ({ projects: initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);

  {
    /* Edit state management */
  }
  const [editProject, setEditProject] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");

  {
    /* Create project state management */
  }
  const [creatingProject, setCreatingProject] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome to the admin panel. Here you can manage your projects.</p>

      {/* Create new project */}
      <div>
        <button onClick={() => setCreatingProject(!creatingProject)}>
          {creatingProject ? "Cancel" : "Create New Project"}
        </button>

        {creatingProject && (
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New project title"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="New project description"
            />
            <input
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
                  image: newImageUrl,
                });
                const updatedProjects = await getProjects();
                setProjects(updatedProjects);
                setNewTitle("");
                setNewDescription("");
                setNewImageUrl("");
              }}
            >
              Create Project
            </button>
          </div>
        )}
      </div>

      <div>
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
              <img src={project.image} alt={project.title} />
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
    </div>
  );
};

export default AdminPage;
