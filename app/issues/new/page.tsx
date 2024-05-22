"use client";
import SimpleMDE from "react-simplemde-editor";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Text, Callout } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/createIssueSchema";
import { z } from "zod";

type issueForm = z.infer<typeof createIssueSchema>;

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            setIsSubmitting(true);
            await axios.post(`/api/issues`, data);
            router.push(`/issues`);
            console.log(data);
          } catch (error) {
            setIsSubmitting(false);
            console.error(error);
            setError("An Unexpected Error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description…" {...field} />
          )}
        ></Controller>

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit new issue {isSubmitting && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
