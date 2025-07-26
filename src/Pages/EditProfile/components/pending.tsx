function StatusPending() {
  return (
    <div className="my-20 flex h-full flex-col items-center justify-center rounded-lg bg-gray-50 p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-700">
        Request Under Process
      </h2>
      <p className="mt-2 text-gray-500">
        We're working on your request. Please hold on, we'll respond shortly.
      </p>

      <div className="mt-6">
        <small className="text-gray-400">Thank you for your patience!</small>
      </div>
    </div>
  );
}

export default StatusPending;
