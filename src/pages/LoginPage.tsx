import { useForm } from "@tanstack/react-form";
import { LogIn, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import z from "zod";
import FormField from "../components/FormField";
import PageTitle from "../components/PageTitle";
import ToggleShowPasswordButton from "../components/ToggleShowPasswordButton";
import { usersMutations } from "../features/mutations/users.mutations";

const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 characters long"),
});

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: loginUserMutation } = usersMutations.useLoginUser();

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginFormSchema,
      onBlur: loginFormSchema,
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => loginUserMutation(value),
  });

  return (
    <div className="w-1/2 mx-auto py-8">
      <PageTitle title="Sign In" />

      <fieldset className="border-2 border-(--primary-clr)/30 rounded-xl p-6 mt-8">
        <legend className="px-4 text-lg font-bold text-(--primary-clr) flex items-center gap-2">
          <User className="size-5" />
          User Details
        </legend>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginForm.handleSubmit();
          }}
          className="space-y-6"
        >
          <loginForm.Field name="email">
            {(field) => (
              <FormField
                field={field}
                label="Email Address"
                type="email"
                required
              />
            )}
          </loginForm.Field>

          <loginForm.Field name="password">
            {(field) => (
              <FormField field={field} label="Password">
                <input
                  id={field.name}
                  name={field.name}
                  type={isPasswordVisible ? "text" : "password"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                  placeholder=" "
                  className="peer w-full py-2.5 px-3 border-2 border-(--primary-clr)/20 rounded-lg outline-none focus:border-(--secondary-clr)"
                />
                <ToggleShowPasswordButton
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={setIsPasswordVisible}
                />
              </FormField>
            )}
          </loginForm.Field>

          <loginForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) w-full rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Login"}
                <LogIn className="size-6" />
              </button>
            )}
          </loginForm.Subscribe>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-(--secondary-clr) hover:underline font-medium"
            >
              Forgot password?
            </Link>

            <div>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-(--secondary-clr) font-bold hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default LoginPage;
