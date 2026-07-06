"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: emptyProject,
  });

  const watchStack = watch("stack");

  function handleAdd() {
    setEditingId(null);
    reset({ ...emptyProject, sort_order: projects.length });
    setOpen(true);
  }

  function handleEdit(p: Project) {
    setEditingId(p.id);
    reset({
      title: p.title,
      description: p.description,
      cover_url: p.cover_url,
      project_url: p.project_url,
      stack: p.stack,
      sort_order: p.sort_order,
    });
    setOpen(true);
  }

  function onSubmit(data: ProjectInput) {
    const payload = {
      title: data.title,
      description: data.description ?? "",
      cover_url: data.cover_url ?? null,
      project_url: data.project_url ?? null,
      stack: data.stack ?? [],
      sort_order: data.sort_order ?? 0,
    };
    startTransition(async () => {
      if (editingId) {
        await editProject(editingId, payload);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p)),
        );
      } else {
        const created = await addProject(payload);
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
                {editingId ? "Editar Projeto" : "Novo Projeto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label>Título *</Label>
                <Input
                  {...register("title")}
                  aria-invalid={!!errors.title}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Descrição</Label>
                <Textarea {...register("description")} />
              </div>
              <div className="grid gap-2">
                <Label>URL da imagem</Label>
                <Input
                  {...register("cover_url", { setValueAs: (v) => v || null })}
                  aria-invalid={!!errors.cover_url}
                />
                {errors.cover_url && <p className="text-xs text-destructive">{errors.cover_url.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>URL do projeto</Label>
                <Input
                  {...register("project_url", { setValueAs: (v) => v || null })}
                  aria-invalid={!!errors.project_url}
                />
                {errors.project_url && <p className="text-xs text-destructive">{errors.project_url.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Stack (separado por vírgula)</Label>
                <Input
                  value={watchStack?.join(", ") ?? ""}
                  onChange={(e) =>
                    setValue("stack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean), { shouldValidate: true })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Ordem</Label>
                <Input
                  type="number"
                  {...register("sort_order", { valueAsNumber: true })}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
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
