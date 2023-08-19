import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import Appointment from "@/components/appointment";
import { useCompletedAppointments } from "@/lib/hooks";
import Spinner from "@/components/spinner";
import NavigationButton from "@/components/navigationButtons";
import SearchBar from "@/components/searchBar";

export default function CompletedAppointments() {
  const [page, setPage] = useState(0);
  const [id, setId] = useState<string | undefined>("");
  const { data, mutate, error, isLoading } = useCompletedAppointments(page, id);
  const pageNos = Math.ceil(data?.message?.totalAppointments / 5) || 1;
  return (
    <AppointmentsWrapper purpose="Completed Appointments">
      <div className="flex flex-col gap-8 justify-center items-center">
        <SearchBar search={(e) => setId(e.target.value)} />
        {data?.message?.appts?.map((item: any) => (
          <Appointment
            key={item.id}
            id={item.id}
            mode="completed appointment"
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
            test={item.test}
            drugs={item.pharmacyDetail}
            prescribeDrug={() => {}}
            prescribeTest={() => {}}
            recordText={() => {}}
            textId={item.id}
            markCompleted={() => {}}
          />
        ))}
        {data?.message?.appts.length === 0 && (
          <div>
            <h1>All Completed Appointments will appear here</h1>
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

CompletedAppointments.prototype.adminPage = true;
