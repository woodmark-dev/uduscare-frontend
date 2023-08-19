export default function NavigationButton({
  onNext,
  page,
  pageNos,
  onPrevious,
}: {
  onNext: () => void;
  page: number;
  pageNos: number;
  onPrevious: () => void;
}) {
  return (
    <div className="btn-group">
      <button className="btn" onClick={onPrevious}>
        «
      </button>
      <button className="btn">
        Page {page === 0 ? 1 : page + 1} of {pageNos}
      </button>
      <button className="btn" onClick={onNext}>
        »
      </button>
    </div>
  );
}
