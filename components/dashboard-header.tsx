import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <Link href={"/"} className="font-bold md:block md:text-2xl">
        Administra
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/profile.png" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              Samuel
              <div className="text-xs font-normal text-muted-foreground">
                Founder & CEO SamaragTech
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/profile"}>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
