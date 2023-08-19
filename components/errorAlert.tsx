export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="alert alert-error shadow-lg mt-3 place-content-center">
      <p className="text-center">{message}</p>
    </div>
  );
}
