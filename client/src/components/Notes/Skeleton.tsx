/*
 * This component is a simple loading skeleton for a note
 * */

const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col bg-slate-200 rounded items-start justify-center h-max shadow-md max-w-full h-[150px] gap-5">
      <div className="flex flex-col gap-4 p-3 w-full h-full">
        <div className="bg-slate-400 h-6 w-1/2 rounded" />
        <div className="bg-slate-400 w-full h-7 rounded" />
      </div>
    </div>
  );
};

export default Skeleton;
