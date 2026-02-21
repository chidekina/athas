"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Participant = { name: string; role: string };
type ActionItem = { responsible: string; action: string; deadline: string };

type FormData = {
  date: string;
  time: string;
  location: string;
  participants: Participant[];
  agenda: string;
  decisions: string;
  actionItems: ActionItem[];
  notes: string;
};

const defaultParticipant = (): Participant => ({ name: "", role: "" });
const defaultActionItem = (): ActionItem => ({
  responsible: "",
  action: "",
  deadline: "",
});

export default function Home() {
  const [form, setForm] = useState<FormData>({
    date: "",
    time: "",
    location: "",
    participants: [defaultParticipant()],
    agenda: "",
    decisions: "",
    actionItems: [defaultActionItem()],
    notes: "",
  });

  const addParticipant = () =>
    setForm((f) => ({
      ...f,
      participants: [...f.participants, defaultParticipant()],
    }));

  const removeParticipant = (index: number) =>
    setForm((f) => ({
      ...f,
      participants: f.participants.filter((_, i) => i !== index),
    }));

  const updateParticipant = (
    index: number,
    field: keyof Participant,
    value: string,
  ) =>
    setForm((f) => ({
      ...f,
      participants: f.participants.map((p, i) =>
        i === index ? { ...p, [field]: value } : p,
      ),
    }));

  const addActionItem = () =>
    setForm((f) => ({
      ...f,
      actionItems: [...f.actionItems, defaultActionItem()],
    }));

  const removeActionItem = (index: number) =>
    setForm((f) => ({
      ...f,
      actionItems: f.actionItems.filter((_, i) => i !== index),
    }));

  const updateActionItem = (
    index: number,
    field: keyof ActionItem,
    value: string,
  ) =>
    setForm((f) => ({
      ...f,
      actionItems: f.actionItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ata.ai</h1>
        <p className="text-muted-foreground mt-1">
          Gere atas de reunião profissionais com IA
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reunião</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Data</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Hora</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm((f) => ({ ...f, time: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Local / Plataforma</Label>
              <Input
                placeholder="Ex: Zoom, presencial..."
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Participantes</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParticipant}
            >
              + Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {form.participants.map((participant, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Nome"
                  value={participant.name}
                  onChange={(e) =>
                    updateParticipant(index, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Cargo / Papel"
                  value={participant.role}
                  onChange={(e) =>
                    updateParticipant(index, "role", e.target.value)
                  }
                />
                {form.participants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeParticipant(index)}
                  >
                    X
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conteúdo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>
                Pauta{" "}
                <Badge variant="secondary" className="ml-1 text-xs">
                  tópicos discutidos
                </Badge>
              </Label>
              <Textarea
                rows={4}
                placeholder="Liste os tópicos abordados na reunião..."
                value={form.agenda}
                onChange={(e) =>
                  setForm((f) => ({ ...f, agenda: e.target.value }))
                }
              />
            </div>
            <Separator />
            <div className="space-y-1">
              <Label>Decisões tomadas</Label>
              <Textarea
                rows={4}
                placeholder="Quais decisões foram tomadas..."
                value={form.decisions}
                onChange={(e) =>
                  setForm((f) => ({ ...f, decisions: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Encaminhamentos</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addActionItem}
            >
              + Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {form.actionItems.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Responsável"
                  value={item.responsible}
                  onChange={(e) =>
                    updateActionItem(index, "responsible", e.target.value)
                  }
                />
                <Input
                  placeholder="Ação"
                  value={item.action}
                  onChange={(e) =>
                    updateActionItem(index, "action", e.target.value)
                  }
                />
                <Input
                  type="date"
                  value={item.deadline}
                  onChange={(e) =>
                    updateActionItem(index, "deadline", e.target.value)
                  }
                />
                {form.actionItems.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeActionItem(index)}
                  >
                    X
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Observações{" "}
              <span className="text-muted-foreground font-normal text-sm">
                (opcional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={3}
              placeholder="Informações adicionais..."
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          <Sparkles className="w-4 h-4 mr-2" /> Gerar Ata
        </Button>
      </form>
    </main>
  );
}
