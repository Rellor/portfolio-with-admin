export async function getProjects() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
    const projects = await res.json();
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function createProject(data: any) {
  try {
    const res = await fetch(process.env.API_URL as string, {
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
    const res = await fetch(`${process.env.API_URL as string}/${id}`, {
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
    const res = await fetch(`${process.env.API_URL as string}/${id}`, {
      method: "DELETE",
    });
    const project = await res.json();
    return project;
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
}
