"use client";

import { TextField, TextArea, Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" size="1">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextArea placeholder="Description…" />
      <Button>Submit new issue</Button>

    </div>
  );
};

export default NewIssuePage;
