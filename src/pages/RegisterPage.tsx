import { useForm } from "@tanstack/react-form";
import { User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import z from "zod";
import FormField from "../components/FormField";
import PageTitle from "../components/PageTitle";
import ToggleShowPasswordButton from "../components/ToggleShowPasswordButton";
import { usersMutations } from "../features/mutations/users.mutations";

const registerFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  phone: z.string().min(9, "Phone must be at least 9 characters long"),
});

type RegisterPageProps = {};

const RegisterPage = ({}: RegisterPageProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: registerUserMutation } = usersMutations.useRegisterUser();

  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      address: "",
      phone: "",
    },
    validators: {
      onChange: registerFormSchema,
      onBlur: registerFormSchema,
      onSubmit: registerFormSchema,
    },
    onSubmit: async ({ value }) => registerUserMutation(value),
  });

  return (
    <div className="w-1/2 mx-auto py-8">
      <PageTitle title="Create Account" />

      <fieldset className="border-2 border-(--primary-clr)/30 rounded-xl p-6 mt-8">
        <legend className="px-4 text-lg font-bold text-(--primary-clr) flex items-center gap-2">
          <User className="size-5" />
          User Details
        </legend>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerForm.handleSubmit();
          }}
          className="space-y-6"
        >
          <registerForm.Field name="email">
            {(field) => (
              <FormField
                field={field}
                label="Email Address"
                type="email"
                required
              />
            )}
          </registerForm.Field>

          <registerForm.Field name="password">
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
          </registerForm.Field>

          <registerForm.Field name="address">
            {(field) => <FormField field={field} label="Address" required />}
          </registerForm.Field>

          <registerForm.Field name="phone">
            {(field) => (
              <FormField
                field={field}
                label="Phone Number"
                type="tel"
                required
              />
            )}
          </registerForm.Field>

          <registerForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) w-full rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering..." : "Register"}
                <UserPlus className="size-6" />
              </button>
            )}
          </registerForm.Subscribe>

          <div className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-(--secondary-clr) font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default RegisterPage;
