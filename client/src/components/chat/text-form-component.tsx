import React, { ComponentRef, useRef } from "react";
import { cn } from "@/lib/utils";
// import { Button } from "@mantine/core";
import { useChatProvider } from "@/provider/chat-provider";

export default function TextFormComponent() {
  const intputRef = useRef<ComponentRef<"input">>(null);
  const { sendMessage } = useChatProvider();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (intputRef.current) {
      sendMessage(intputRef.current.value);

      intputRef.current.value = "";
    }
  }

  return (
    <form
      className={cn(
        "fixed flex flex-col md:flex-row bottom-4 left-[50%] lg:translate-x-[-50%] ",
        "min-w-[350px]  md:w-[40vw] xl:max-w-[1000px]"
      )}
      onSubmit={handleSubmit}
    >
      <label className="lg:flex-1" htmlFor="text-inpu">
        <input
          className="w-full p-4"
          ref={intputRef}
          type="text"
          id="text-input"
        />
      </label>
      <button className="px-2  bg-blue-600" type="submit">
        Send
      </button>
    </form>
  );
}
