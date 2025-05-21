export default function SpinnerOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-[#8e5be2] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
