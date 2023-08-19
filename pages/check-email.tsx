import AppointmentsWrapper from "@/components/appointmentsWrapper";

export default function CheckEmail() {
  return (
    <AppointmentsWrapper purpose="You have successfully signed up">
      <div className="flex flex-col gap-8 justify-center items-center">
        <div>
          <h1>Please Check your email to verify</h1>
        </div>
      </div>
    </AppointmentsWrapper>
  );
}

CheckEmail.prototype.authPage = true;
