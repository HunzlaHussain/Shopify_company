import { Title, Text } from "@/components/ui/text";
import Form from "./_components/form";
import Link from "next/link";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }
  return (
    <div className="w-full space-y-4 sm:space-y-8">
      <Title>Sign in to your account</Title>
      <Form />
      <Text className="text-center">
        Don&apos;t have an account yet?{" "}
        <Link className="text-[#01C4FF] font-semibold" href={"/sign-up"}>
          Sign Up
        </Link>
      </Text>
    </div>
  );
};

export default page;
