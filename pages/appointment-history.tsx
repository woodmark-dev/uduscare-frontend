import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import Appointment from "@/components/appointment";
import { AppointmentProps } from "@/components/appointment";
import { useAppointmentHistory } from "@/lib/hooks";
import { fetcher } from "@/lib/fetcher";
import Spinner from "@/components/spinner";
import NavigationButton from "@/components/navigationButtons";

export default function AppointmentHistory() {
  const [page, setPage] = useState(0);
  const { data, mutate, error, isLoading } = useAppointmentHistory({
    arg: page,
  });
  const pageNos = Math.ceil(data?.message?.totalAppointments / 5) || 1;

  console.log(data);

  return (
    <AppointmentsWrapper purpose="Appoinments History">
      <div className="flex flex-col gap-8 justify-center items-center">
        {data !== undefined &&
          data?.message?.allAppointments?.map((item: any) => (
            <Appointment
              deleteAction={() => {}}
              key={`${item.appointmentTime}${item.actualDate}`}
              mode="completed"
              id={item.id}
              appointmentTime={item.appointmentTime}
              actualDate={item.actualDate}
              stage={item.stage}
              description={item.description}
              department={item.department}
              testDescription={item.testDetails}
              test={item.test}
              testResults={undefined}
              drugs={item.pharmacyDetail}
              firstName={undefined}
              lastName={undefined}
              dateOfBirth={undefined}
              sex={undefined}
              prescribeDrug={() => {}}
              prescribeTest={() => {}}
              recordText={() => {}}
              textId="none"
              markCompleted={() => {}}
            />
          ))}
        {data?.message?.allAppointments.length === 0 && (
          <div>
            <h1>All Pending Appointments will appear here</h1>
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

AppointmentHistory.prototype.userPage = true;
