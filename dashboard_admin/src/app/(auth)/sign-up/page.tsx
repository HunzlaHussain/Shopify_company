import { Title, Text } from "@/components/ui/text";
import Form from "./_components/form";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full space-y-4 sm:space-y-8">
      <Title>Create an account</Title>
      <Form />
      <Text className="text-center">
        Already have an account?{" "}
        <Link className="text-[#01C4FF] font-semibold" href={"/sign-up"}>
          Sign In
        </Link>
      </Text>
    </div>
  );
};

export default page;
