function Spinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div
        className="w-8 h-8 border-4 border-hub-gray-200 border-t-hub-blue rounded-full animate-spin"
        role="status"
        aria-label="Loading..."
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;