import { useState } from "react";
import AppointmentsWrapper from "@/components/appointmentsWrapper";
import Appointment from "@/components/appointment";
import { AppointmentProps } from "@/components/appointment";
import { usePendingAppointments } from "@/lib/hooks";
import { fetcher } from "@/lib/fetcher";
import Spinner from "@/components/spinner";
import NavigationButton from "@/components/navigationButtons";

export default function PendingAppointment() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data, mutate, error, isLoading } = usePendingAppointments({
    arg: page,
  });

  async function deleteAction(id: string) {
    try {
      setLoading(true);
      await fetcher(`appointments/delete?id=${id}`);
      mutate();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const pageNos = Math.ceil(data?.message?.totalAppointments / 5) || 1;

  return (
    <AppointmentsWrapper purpose="Pending Appointments">
      <div className="flex flex-col gap-8 justify-center items-center">
        {data !== undefined &&
          data?.message?.allAppointments?.map((item: AppointmentProps) => (
            <Appointment
              deleteAction={() => deleteAction(item.id)}
              key={`${item.appointmentTime}${item.actualDate}`}
              mode="pending"
              id={item.id}
              appointmentTime={item.appointmentTime}
              actualDate={item.actualDate}
              stage={item.stage}
              description={item.description}
              department={item.department}
              testDescription={undefined}
              test={false}
              testResults={undefined}
              drugs={undefined}
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
        {loading && <Spinner />}
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

PendingAppointment.userPage = true;
