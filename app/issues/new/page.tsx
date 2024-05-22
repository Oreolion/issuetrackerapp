"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, TextArea, Callout } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import {useState} from "react"

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post(`/api/issues`, data);
            router.push(`/issues`);
            console.log(data);
          } catch (error) {
            console.error(error);
            setError("An Unexpected Error occurred");
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
    </div>
  );
};

export default NewIssuePage;
