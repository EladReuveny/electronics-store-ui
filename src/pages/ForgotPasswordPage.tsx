import { useForm } from "@tanstack/react-form";
import { KeyRound, Mail } from "lucide-react";
import { Link } from "react-router";
import z from "zod";
import FormField from "../components/FormField";
import PageTitle from "../components/PageTitle";
import { usersMutations } from "../features/mutations/users.mutations";

const forgotPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  phone: z.string().min(9, "Phone must be at least 9 characters long"),
});

type ForgotPasswordPageProps = {};

const ForgotPasswordPage = ({}: ForgotPasswordPageProps) => {
  const { mutate: forgotPasswordMutation } = usersMutations.useForgotPassword();

  const forgotPasswordForm = useForm({
    defaultValues: {
      email: "",
      address: "",
      phone: "",
    },
    validators: {
      onChange: forgotPasswordFormSchema,
      onBlur: forgotPasswordFormSchema,
      onSubmit: forgotPasswordFormSchema,
    },
    onSubmit: async ({ value }) => forgotPasswordMutation(value),
  });

  return (
    <div className="w-1/2 mx-auto py-8">
      <PageTitle title="Reset Password" />

      <fieldset className="border-2 border-(--primary-clr)/30 rounded-xl p-6 mt-8">
        <legend className="px-4 text-lg font-bold text-(--primary-clr) flex items-center gap-2">
          <KeyRound className="size-5" />
          User Verification
        </legend>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            forgotPasswordForm.handleSubmit();
          }}
          className="space-y-6"
        >
          <forgotPasswordForm.Field name="email">
            {(field) => (
              <FormField
                field={field}
                label="Email Address"
                type="email"
                required
              />
            )}
          </forgotPasswordForm.Field>

          <forgotPasswordForm.Field name="address">
            {(field) => <FormField field={field} label="Address" required />}
          </forgotPasswordForm.Field>

          <forgotPasswordForm.Field name="phone">
            {(field) => (
              <FormField
                field={field}
                label="Phone Number"
                type="tel"
                required
              />
            )}
          </forgotPasswordForm.Field>

          <forgotPasswordForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) w-full rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Reset Password"}
                <Mail className="size-6" />
              </button>
            )}
          </forgotPasswordForm.Subscribe>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-(--secondary-clr) font-bold hover:underline text-sm"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default ForgotPasswordPage;
