import { getProjectStatusClassName, getProjectStatusLabel } from "@/lib/status";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";

interface ProjectsOverviewItem {
  id: string;
  name: string;
  client: string | null;
  status: string | null;
  finishDate: string | null;
}

interface ProjectsOverviewProps {
  projects: ProjectsOverviewItem[];
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Aún no hay proyectos cargados para mostrar.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col gap-3 rounded-lg border p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-muted-foreground">
                {project.client ?? "Sin cliente"}
              </div>
            </div>
            <Badge className={getProjectStatusClassName(project.status)}>
              {getProjectStatusLabel(project.status)}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Entrega: {formatDate(project.finishDate)}
          </div>
        </div>
      ))}
    </div>
  );
}
