import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Freelance Manager",
    short_name: "FreelanceMgr",
    description: "Gestión de proyectos, clientes y mantenimientos freelance",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    orientation: "portrait",
    categories: ["productivity", "business"],
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
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Proyectos",
        url: "/projects",
        description: "Ver todos los proyectos",
      },
      {
        name: "Clientes",
        url: "/clients",
        description: "Ver todos los clientes",
      },
      {
        name: "Mantenimientos",
        url: "/maintenance",
        description: "Ver mantenimientos activos",
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
