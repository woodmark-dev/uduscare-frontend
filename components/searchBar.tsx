export default function SearchBar({
  search,
}: {
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      onChange={search}
      type="text"
      placeholder="Search by id"
      className="input input-bordered input-primary w-full max-w-xs"
    />
  );
}
