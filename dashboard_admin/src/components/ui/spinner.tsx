import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="animate-pulse w-auto ">
      <Loader2 className="animate-spin w-12 h-12 " />
    </div>
  );
}
