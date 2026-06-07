const Blank = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-black dot-alive" />
      <p className="text-sm text-black tracking-widest uppercase">unavailable</p>
    </div>
  );
};

export default Blank;
