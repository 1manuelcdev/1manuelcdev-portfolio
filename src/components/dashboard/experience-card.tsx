"use client";

import { useState, useTransition } from "react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusIcon, PencilIcon, TrashIcon, GripVerticalIcon } from "lucide-react";
import { addExperience, editExperience, removeExperience } from "@/app/dashboard/actions";
import { experienceSchema, type ExperienceInput } from "@/lib/schemas/dashboard";
import type { Experience } from "@/lib/supabase/services/experience";

type Props = {
  experiences: Experience[];
};

const emptyExp: ExperienceInput = {
  title: "",
  company: "",
  location: "",
  description: "",
  from_date: "",
  to_date: null,
  is_current: false,
  sort_order: 0,
};

function toDisplayDate(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function toIsoDate(display: string): string | null {
  const cleaned = display.replace(/\D/g, "");
  if (cleaned.length !== 8) return null;
  const d = cleaned.slice(0, 2);
  const m = cleaned.slice(2, 4);
  const y = cleaned.slice(4, 8);
  return `${y}-${m}-${d}`;
}

function SortableItem({
  experience,
  onEdit,
  onDelete,
  isPending,
}: {
  experience: Experience;
  onEdit: (e: Experience) => void;
  onDelete: (id: string) => void;
  isPending: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: experience.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <button
            className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon className="size-4" />
          </button>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-medium truncate">{experience.title}</span>
            <span className="text-xs text-muted-foreground">
              {experience.company} · {experience.location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon-sm" onClick={() => onEdit(experience)}>
            <PencilIcon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(experience.id)}
            disabled={isPending}
          >
            <TrashIcon className="size-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground pl-6">
        <span>
          {format(parse(experience.from_date, "yyyy-MM-dd", new Date()), "MMM, yyyy", { locale: ptBR })}
          {" – "}
          {experience.is_current
            ? "Presente"
            : experience.to_date
              ? format(parse(experience.to_date, "yyyy-MM-dd", new Date()), "MMM, yyyy", { locale: ptBR })
              : ""}
        </span>
      </div>
      {experience.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 pl-6">{experience.description}</p>
      )}
    </div>
  );
}

export function ExperienceCard({ experiences: initial }: Props) {
  const [experiences, setExperiences] = useState(initial);
  const [editing, setEditing] = useState<ExperienceInput & { id?: string }>(emptyExp);
  const [fromDisplay, setFromDisplay] = useState("");
  const [toDisplay, setToDisplay] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleAdd() {
    setEditing({ ...emptyExp, sort_order: experiences.length });
    setFromDisplay("");
    setToDisplay("");
    setErrors({});
    setOpen(true);
  }

  function handleEdit(e: Experience) {
    setEditing(e);
    setFromDisplay(toDisplayDate(e.from_date));
    setToDisplay(toDisplayDate(e.to_date));
    setErrors({});
    setOpen(true);
  }

  function handleSave() {
    const result = experienceSchema.safeParse({
      title: editing.title,
      company: editing.company,
      location: editing.location,
      description: editing.description,
      from_date: toIsoDate(fromDisplay) ?? "",
      to_date: editing.is_current ? null : toIsoDate(toDisplay),
      is_current: editing.is_current,
      sort_order: editing.sort_order,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTransition(async () => {
      const toastId = toast.loading("Salvando...");
      try {
        if (editing.id) {
          await editExperience(editing.id, result.data);
          setExperiences((prev) =>
            prev.map((e) => (e.id === editing.id ? { ...e, ...result.data } : e)),
          );
        } else {
          const created = await addExperience(result.data);
          setExperiences((prev) => [...prev, created]);
        }
        toast.success("Salvo com sucesso!", { id: toastId });
        setOpen(false);
      } catch {
        toast.error("Erro ao salvar", { id: toastId });
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const toastId = toast.loading("Removendo...");
      try {
        await removeExperience(id);
        setExperiences((prev) => prev.filter((e) => e.id !== id));
        toast.success("Removido!", { id: toastId });
      } catch {
        toast.error("Erro ao remover", { id: toastId });
      }
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = experiences.findIndex((e) => e.id === active.id);
    const newIndex = experiences.findIndex((e) => e.id === over.id);
    const reordered = arrayMove(experiences, oldIndex, newIndex);

    setExperiences(reordered);

    const toastId = toast.loading("Salvando ordem...");

    startTransition(async () => {
      try {
        await Promise.all(
          reordered.map((e, i) => editExperience(e.id, { sort_order: i })),
        );
        toast.success("Ordem atualizada!", { id: toastId });
      } catch {
        setExperiences(experiences);
        toast.error("Erro ao salvar ordem", { id: toastId });
      }
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Experiências</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={handleAdd}>
              <PlusIcon className="size-4" />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editing.id ? "Editar Experiência" : "Nova Experiência"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label>Título / Cargo *</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing((prev) => ({ ...prev, title: e.target.value }))}
                  aria-invalid={!!errors.title}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Empresa *</Label>
                <Input
                  value={editing.company}
                  onChange={(e) => setEditing((prev) => ({ ...prev, company: e.target.value }))}
                  aria-invalid={!!errors.company}
                />
                {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Localização *</Label>
                <Input
                  value={editing.location}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  aria-invalid={!!errors.location}
                />
                {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
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
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>Data início *</Label>
                  <Input
                    placeholder="dd/mm/aaaa"
                    value={fromDisplay}
                    onChange={(e) => setFromDisplay(e.target.value)}
                    aria-invalid={!!errors.from_date}
                  />
                  {errors.from_date && (
                    <p className="text-xs text-destructive">{errors.from_date}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Data fim</Label>
                  <Input
                    placeholder="dd/mm/aaaa"
                    value={toDisplay}
                    disabled={editing.is_current}
                    onChange={(e) => setToDisplay(e.target.value)}
                    aria-invalid={!!errors.to_date}
                  />
                  {errors.to_date && <p className="text-xs text-destructive">{errors.to_date}</p>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Emprego atual</Label>
                <Switch
                  checked={editing.is_current}
                  onCheckedChange={(checked) =>
                    setEditing((prev) => ({
                      ...prev,
                      is_current: checked,
                      to_date: checked ? null : prev.to_date,
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experiences.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {experiences.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma experiência cadastrada.</p>
              )}
              {experiences.map((e) => (
                <SortableItem
                  key={e.id}
                  experience={e}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isPending={isPending}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
