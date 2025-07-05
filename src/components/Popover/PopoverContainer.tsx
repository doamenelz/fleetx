import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const PopoverContainer: FC<{
  button: JSX.Element;
  content: JSX.Element;
  contentContainerStyle?: string;
}> = ({ button, content, contentContainerStyle = "w-58" }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{button}</PopoverTrigger>
      <PopoverContent className={contentContainerStyle}>
        {content}
      </PopoverContent>
    </Popover>
  );
};
