import { Progress } from "@nextui-org/react";

export const Loader = () => {
  return (
    <Progress
      color="secondary"
      size="lg"
      isIndeterminate
      aria-label="Loading..."
    />
  );
};
