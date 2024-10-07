import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type createGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } =
    useForm<createGoalForm>({
      resolver: zodResolver(createGoalForm),
    });

  async function handleCreateGoal(data: createGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    reset();
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          action=""
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                placeholder="Praticar exercícios, meditar, etc..."
                autoFocus
                {...register("title")}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <Label htmlFor="title">Quantas vezes na semana?</Label>
            <Controller
              control={control}
              name="desiredWeeklyFrequency"
              defaultValue={1}
              render={({ field }) => {
                return (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <RadioGroupItem value="1">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        1x na semana
                      </span>
                      <span className="font-lg leading-none">🥱</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="2">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        2x na semana
                      </span>
                      <span className="font-lg leading-none">😐</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="3">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        3x na semana
                      </span>
                      <span className="font-lg leading-none">😎</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="4">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        4x na semana
                      </span>
                      <span className="font-lg leading-none">😜</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="5">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        5x na semana
                      </span>
                      <span className="font-lg leading-none">😯</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="6">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        6x na semana
                      </span>
                      <span className="font-lg leading-none">🤯</span>
                    </RadioGroupItem>

                    <RadioGroupItem value="7">
                      <RadioGroupIndicator />
                      <span className="text-zinc-600 text-sm font-md leading-none">
                        {" "}
                        Todos os dias da semana
                      </span>
                      <span className="font-lg leading-none">🔥</span>
                    </RadioGroupItem>
                  </RadioGroup>
                );
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
