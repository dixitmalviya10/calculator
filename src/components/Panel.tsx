const Panel = () => {
  return (
    <div className="font-semibold min-h-screen shadow-md fixed right-0 top-0 bottom-0 left-[80%] px-8 py-10 bg-slate-300 border-l-4 border-slate-400">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">History</h2>
        <button className="bg-slate-100 px-6 py-1 border active:scale-90 shadow-md active:shadow-none hover:border-slate-300 hover:bg-slate-200">
          Clear
        </button>
      </div>
      <ul className="mt-16 text-right text-lg tracking-wider">
        <li>10000</li>
      </ul>
    </div>
  );
};

export default Panel;
