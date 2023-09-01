import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import Appointment from "@/components/appointment";
import { usePharmacyAppointment } from "@/lib/hooks";
import SearchBar from "@/components/searchBar";
import Spinner from "@/components/spinner";
import NavigationButton from "@/components/navigationButtons";
import { fetcher } from "@/lib/fetcher";

export default function PharmacyAppointments() {
  const [page, setPage] = useState(0);
  const [id, setId] = useState<string | undefined>("");
  const { data, mutate, error, isLoading } = usePharmacyAppointment(page, id);
  const pageNos = Math.ceil(data?.message?.totalAppointments / 5) || 1;

  async function mark(id: number) {
    try {
      await fetcher("appointments/mark-completed", {
        id: id,
      });
      mutate();
    } catch (error) {}
  }
  return (
    <AppointmentsWrapper purpose="Pharmacy Appointment">
      <div className="flex flex-col gap-8 justify-center items-center">
        <SearchBar search={(e) => setId(e.target.value)} />
        {data?.message?.appts?.map((item: any) => (
          <Appointment
            key={item.id}
            id={item.id}
            mode="pharmacy appointment"
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
            drugs={item.pharmacyDetail}
            prescribeDrug={() => {}}
            prescribeTest={() => {}}
            recordText={() => {}}
            textId={item.id}
            markCompleted={() => mark(item.id)}
          />
        ))}
        {data?.message?.appts.length === 0 && (
          <div>
            <h1>All Pharmacy Appointments will appear here</h1>
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

PharmacyAppointments.prototype.adminPage = true;
