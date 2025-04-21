import { Progress } from "@/components/ui/progress";

export function ProjectsOverview() {
  const projects = [
    {
      name: "Rediseño Web",
      client: "Acme Inc",
      progress: 65,
      daysLeft: 10,
    },
    {
      name: "App Móvil",
      client: "TechCorp",
      progress: 25,
      daysLeft: 45,
    },
    {
      name: "Campaña Marketing",
      client: "GlobalBiz",
      progress: 50,
      daysLeft: 15,
    },
    {
      name: "Tienda Online",
      client: "LocalShop",
      progress: 90,
      daysLeft: 3,
    },
  ];

  return (
    <div className="space-y-4">
      {projects.map((project, i) => (
        <div key={i} className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-muted-foreground">
                {project.client}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {project.daysLeft} días restantes
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={project.progress} className="h-2" />
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
