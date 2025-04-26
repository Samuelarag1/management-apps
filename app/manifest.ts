import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Freelance Project Manager",
    short_name: "FreelancePM",
    description: "Gestión de proyectos freelance",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    orientation: "portrait",
    categories: ["productivity", "business"],
    screenshots: [
      {
        src: "/screenshots/dashboard.png",
        sizes: "1280x720",
        type: "image/png",
      },
      {
        src: "/screenshots/projects.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Dashboard",
        url: "/",
        icons: [{ src: "/icons/dashboard-icon.png", sizes: "96x96" }],
      },
      {
        name: "Proyectos",
        url: "/proyectos",
        icons: [{ src: "/icons/projects-icon.png", sizes: "96x96" }],
      },
      {
        name: "Tareas",
        url: "/tareas",
        icons: [{ src: "/icons/tasks-icon.png", sizes: "96x96" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
