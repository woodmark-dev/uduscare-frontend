import { useRouter } from "next/router";
import NextLink from "next/link";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import { useVerifyEmail } from "@/lib/hooks";

export default function EmailConfirmation() {
  const router = useRouter();
  const { email, verificationId } = router.query;
  const { error } = useVerifyEmail({ email, verificationId });

  return (
    <AppointmentsWrapper purpose="Email Confirmation">
      <div className="flex flex-col gap-8 justify-center items-center">
        {error ? (
          <div>
            <p>
              Sorry, Your email could not be verified. Try with another email
            </p>
          </div>
        ) : (
          <div>
            <div>Congratulations. Your email has been confirmed</div>
            <div className="text-center text-gray-500 pt-6 flex gap-2 justify-center items-center">
              <p>You can now</p>
              <NextLink
                href="/signin"
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign In
              </NextLink>
            </div>
          </div>
        )}
      </div>
    </AppointmentsWrapper>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}

EmailConfirmation.prototype.authPage = true;
