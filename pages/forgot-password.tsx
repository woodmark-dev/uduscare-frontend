import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import SuccessAlert from "@/components/success-alert";
import ErrorAlert from "@/components/errorAlert";
import { fetcher } from "@/lib/fetcher";

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  function successFadeIn() {
    setTimeout(() => setSuccess(false), 3000);
  }

  function failureFadeIn() {
    setTimeout(() => setFailure(false), 3000);
  }

  async function submitHandler() {
    try {
      setIsLoading(true);
      await fetcher("auth/forgot-password", { email });
      setSuccess(true);
      setIsLoading(false);
      successFadeIn();
    } catch (error) {
      setIsLoading(false);
      setFailure(true);
      failureFadeIn();
    }
  }
  return (
    <AppointmentsWrapper purpose="Type in your email to reset password">
      <div className="flex flex-col gap-8 justify-center items-center">
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        {isLoading && (
          <button className="btn btn-outline w-full max-w-xs bg-teal-600 text-white hover:bg-white hover:text-teal-600">
            Reset Password
          </button>
        )}
        {!isLoading && (
          <button
            onClick={submitHandler}
            className="btn btn-outline w-full max-w-xs bg-teal-600 text-white hover:bg-white hover:text-teal-600"
          >
            Reset Password
          </button>
        )}
        {success && (
          <SuccessAlert message="Check your email to reset password" />
        )}
        {failure && <ErrorAlert message="Please try again" />}
      </div>
    </AppointmentsWrapper>
  );
}

ForgotPassword.prototype.authPage = true;
