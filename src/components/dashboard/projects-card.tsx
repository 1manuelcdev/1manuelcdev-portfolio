"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { addProject, editProject, removeProject } from "@/app/dashboard/actions";
import { projectSchema, type ProjectInput } from "@/lib/schemas/dashboard";
import type { Project } from "@/lib/supabase/services/projects";

type Props = {
  projects: Project[];
};

const emptyProject: ProjectInput = {
  title: "",
  description: "",
  cover_url: null,
  project_url: null,
  stack: [],
  sort_order: 0,
};

export function ProjectsCard({ projects: initial }: Props) {
  const [projects, setProjects] = useState(initial);
  const [editing, setEditing] = useState<ProjectInput & { id?: string }>(
    emptyProject,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleAdd() {
    setEditing({ ...emptyProject, sort_order: projects.length });
    setErrors({});
    setOpen(true);
  }

  function handleEdit(p: Project) {
    setEditing(p);
    setErrors({});
    setOpen(true);
  }

  function handleSave() {
    const result = projectSchema.safeParse({
      title: editing.title,
      description: editing.description,
      cover_url: editing.cover_url,
      project_url: editing.project_url,
      stack: editing.stack,
      sort_order: editing.sort_order,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTransition(async () => {
      if (editing.id) {
        await editProject(editing.id, result.data);
        setProjects((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, ...result.data } : p)),
        );
      } else {
        const created = await addProject(result.data);
        setProjects((prev) => [...prev, created]);
      }
      setOpen(false);
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await removeProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Projetos</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={handleAdd}>
              <PlusIcon className="size-4" />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editing.id ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label>Título *</Label>
                <Input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev, title: e.target.value }))
                  }
                  aria-invalid={!!errors.title}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Descrição</Label>
                <Textarea
                  value={editing.description}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>URL da imagem</Label>
                <Input
                  value={editing.cover_url ?? ""}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      cover_url: e.target.value || null,
                    }))
                  }
                  aria-invalid={!!errors.cover_url}
                />
                {errors.cover_url && <p className="text-xs text-destructive">{errors.cover_url}</p>}
              </div>
              <div className="grid gap-2">
                <Label>URL do projeto</Label>
                <Input
                  value={editing.project_url ?? ""}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      project_url: e.target.value || null,
                    }))
                  }
                  aria-invalid={!!errors.project_url}
                />
                {errors.project_url && <p className="text-xs text-destructive">{errors.project_url}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Stack (separado por vírgula)</Label>
                <Input
                  value={editing.stack.join(", ")}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      stack: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Ordem</Label>
                <Input
                  type="number"
                  value={editing.sort_order}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      sort_order: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum projeto cadastrado.
            </p>
          )}
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-2 rounded-lg border p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium truncate">{p.title}</span>
                  {p.description && (
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      {p.description}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleEdit(p)}
                  >
                    <PencilIcon className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(p.id)}
                    disabled={isPending}
                  >
                    <TrashIcon className="size-3.5" />
                  </Button>
                </div>
              </div>
              {p.stack.length > 0 && p.stack[0] !== "" && (
                <div className="flex flex-wrap gap-1">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[10px] rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
