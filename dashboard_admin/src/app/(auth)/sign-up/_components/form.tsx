"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input, Password } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SignUpInput, signUpFormSchema } from "@/validators/sign-up";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isAgree: undefined,
    },
  });

  const onSubmit = async (data: SignUpInput) => {
    console.log("data", data);
    try {
      setLoading((loading) => !loading);
    } catch (error) {
    } finally {
      setLoading((loading) => !loading);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "gap-2 sm:gap-6 flex flex-grow flex-col @container [&_label.block>span]:font-medium"
        )}
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register(`name`)}
          error={errors?.name?.message}
        />
        <Input
          label="Email"
          placeholder="Email"
          {...register(`email`)}
          error={errors?.email?.message}
        />
        <div className="flex w-full items-center gap-2 flex-col sm:gap-6 sm:flex-row">
          <Password
            className="w-full"
            label="Password"
            placeholder="Password"
            {...register(`password`)}
            error={errors?.password?.message}
          />
          <Password
            className="w-full"
            label="Confirm Password"
            placeholder="Confirm Password"
            {...register(`confirmPassword`)}
            error={errors?.confirmPassword?.message}
          />
        </div>
        <Checkbox
          {...register("isAgree")}
          label="I agree to Caliber Terms and Privacy Policy."
          variant="flat"
          className="[&>label>span]:font-medium"
          error={errors?.isAgree?.message}
        />
        <Button
          color="primary"
          className=" shadow-button"
          type="submit"
          isLoading={loading}
        >
          Sign Up
          <MoveRightIcon className="ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default Form;
