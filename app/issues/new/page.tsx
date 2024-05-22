"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
            await axios.post(`/api/issues`, data);
            router.push(`/issues`);
            console.log(data)
          } catch (error) {
            console.error(error);
          }
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description…" {...field} />
        )}
      ></Controller>
      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
