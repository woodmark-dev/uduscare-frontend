import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import { useDoctorAppointment } from "@/lib/hooks";
import Appointment from "@/components/appointment";
import NavigationButton from "@/components/navigationButtons";
import SearchBar from "@/components/searchBar";
import Spinner from "@/components/spinner";
import { fetcher } from "@/lib/fetcher";

export default function DoctorAppointment() {
  const [page, setPage] = useState(0);
  const [textId, setTextId] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState<string | undefined>("");
  const { data, mutate, error, isLoading } = useDoctorAppointment(page, id);

  const pageNos = Math.ceil(data?.message?.totalAppointments / 5) || 1;
  async function prescribeTest() {
    try {
      await fetcher("appointments/update-test", {
        testDetails: text,
        id: +textId,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function prescribeDrug() {
    try {
      await fetcher("appointments/update-pharmacy", {
        id: +textId,
        pharmacyDetail: text,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  function recordText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.currentTarget.value);
    setTextId(e.currentTarget.id);
  }

  async function mark(id: number) {
    try {
      await fetcher("appointments/mark-completed", {
        id: id,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppointmentsWrapper purpose="Doctor Appointments">
      <div className="flex flex-col gap-8 justify-center items-center">
        <SearchBar search={(e) => setId(e.target.value)} />
        {data?.message?.appts?.map((item: any) => (
          <Appointment
            key={item.id}
            id={item.id}
            mode="doctor appointment"
            appointmentTime={item.appointmentTime}
            actualDate={item.actualDate}
            description={item.description}
            department={item.department}
            firstName={item.user.firstName}
            lastName={item.user.lastName}
            dateOfBirth={item.user.dateOfBirth}
            test={item.test}
            testResults={item.testResults}
            sex={item.user.sex}
            deleteAction={() => {}}
            stage={undefined}
            testDescription={undefined}
            drugs={undefined}
            prescribeDrug={prescribeDrug}
            prescribeTest={prescribeTest}
            recordText={recordText}
            textId={item.id}
            markCompleted={() => mark(item.id)}
          />
        ))}
        {data?.message?.appts?.length === 0 && (
          <div>
            <h1>All Doctor Appointments will appear here</h1>
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

DoctorAppointment.prototype.adminPage = true;
