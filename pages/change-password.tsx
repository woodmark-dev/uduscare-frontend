import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import AuthForm from "@/components/authForm";
import Input from "@/components/input";
import SuccessAlert from "@/components/success-alert";
import ErrorAlert from "@/components/errorAlert";
import { fetcher } from "@/lib/fetcher";

export default function ChangePassword() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { email, verificationId } = router.query;

  function failureFadeIn() {
    setTimeout(() => setFailure(false), 3000);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFailure(true);
      setErrorMessage("Password and confirm password does not match");
      failureFadeIn();
      return;
    }
    setIsLoading(true);
    await fetcher("auth/change-password", { email, verificationId, password });
    setSuccess(true);
    setIsLoading(false);
  }

  return (
    <AuthForm purpose="Reset Password">
      <form onSubmit={submitHandler}>
        <Input
          add={(e) => setPassword(e.currentTarget.value)}
          id={"password"}
          labelName={"Password"}
          type={"password"}
        />
        <Input
          add={(e) => setConfirmPassword(e.currentTarget.value)}
          id={"confirmPassword"}
          labelName={"confirmPassword"}
          type={"password"}
        />
        {isLoading && (
          <div className="flex justify-center items-center mt-3">
            <button className="btn btn-outline w-full max-w-xs bg-teal-600 text-white hover:bg-white hover:text-teal-600">
              Reset Password
            </button>
          </div>
        )}
        {!isLoading && (
          <div className="flex justify-center items-center mt-3">
            <button className="btn btn-outline w-full max-w-xs bg-teal-600 text-white hover:bg-white hover:text-teal-600">
              Reset Password
            </button>
          </div>
        )}
        {success && (
          <div className="text-center text-gray-500 pt-6 flex gap-2 justify-center items-center">
            <p>Your password has been reset You can now</p>
            <NextLink
              href="/signin"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign In
            </NextLink>
          </div>
        )}
      </form>
      {failure && <ErrorAlert message={errorMessage} />}
    </AuthForm>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}

ChangePassword.prototype.authPage = true;
