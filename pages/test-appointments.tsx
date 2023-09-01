import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import Appointment from "@/components/appointment";
import { useTestAppointment } from "@/lib/hooks";
import SearchBar from "@/components/searchBar";
import NavigationButton from "@/components/navigationButtons";
import Spinner from "@/components/spinner";
import { fetcher } from "@/lib/fetcher";

export default function TestAppointments() {
  const [textId, setTextId] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [id, setId] = useState<string | undefined>("");
  const { data, mutate, error, isLoading } = useTestAppointment(page, id);
  const pageNos = Math.ceil(data?.message?.totalAppointments / 5) || 1;

  async function recordTest() {
    try {
      await fetcher("appointments/record-test", {
        testResults: text,
        id: +textId,
      });
      mutate();
    } catch (error) {}
  }

  function recordText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.currentTarget.value);
    setTextId(e.currentTarget.id);
  }
  return (
    <AppointmentsWrapper purpose="Test Appointments">
      <div className="flex flex-col gap-8 justify-center items-center">
        <SearchBar search={(e) => setId(e.target.value)} />
        {data?.message?.appts?.map((item: any) => (
          <Appointment
            key={item.id}
            id={item.id}
            mode="test appointment"
            appointmentTime={item.appointmentTime}
            actualDate={item.actualDate}
            description={item.description}
            department={item.department}
            firstName={item.user.firstName}
            lastName={item.user.lastName}
            dateOfBirth={item.user.dateOfBirth}
            testResults={undefined}
            sex={item.user.sex}
            deleteAction={() => {}}
            stage={undefined}
            testDescription={item.testDetails}
            test={false}
            drugs={undefined}
            prescribeDrug={() => {}}
            prescribeTest={recordTest}
            recordText={recordText}
            textId={item.id}
            markCompleted={() => {}}
          />
        ))}
        {data?.message?.appts.length === 0 && (
          <div>
            <h1>All Tests Appointments will appear here</h1>
          </div>
        )}
        {isLoading && <Spinner />}
        <NavigationButton
          onNext={() => page + 1 < pageNos && setPage((state) => state + 1)}
          onPrevious={() => page > 0 && setPage((state) => state - 1)}
          page={page}
          pageNos={pageNos}
        />
      </div>
    </AppointmentsWrapper>
  );
}
TestAppointments.prototype.adminPage = true;
