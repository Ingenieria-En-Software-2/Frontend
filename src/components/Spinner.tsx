import { SpinnerIcon } from "./ux/Icons";

type ComponentProps = {
  className?: string;
};

export default function Spinner({ className }: ComponentProps) {
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <SpinnerIcon className={`${"animate-spin"} ${className ?? ""}`} />
    </div>
  );
}
