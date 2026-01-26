const API_URL = "https://696fbbaba06046ce6187b486.mockapi.io/api/v1/projects";

export async function getProjects() {
  try {
    const res = await fetch(API_URL);
    const projects = await res.json();
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function createProject(data: any) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const project = await res.json();
    return project;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const project = await res.json();
    return project;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const project = await res.json();
    return project;
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
}
