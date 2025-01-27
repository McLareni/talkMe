const ChatNotSelected = () => {
  return (
    <div className="w-full relative bg-mainBlue overflow-hidden">
      <h1 className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[20px] text-white font-semibold">Choose a chat</h1>
      <div className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[300px] border-b-[#BCD5FF] absolute z-10 bottom-0 -left-10"></div>
      <div className="w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[400px] border-b-[#C6DBFF] absolute z-10 bottom-0 left-52"></div>
      <div className="w-0 h-0 border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-b-[300px] border-b-[#cdddf8] absolute z-10 bottom-0 left-96"></div>
      <div className="w-0 h-0 border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-b-[200px] border-b-[#BCD5FF] absolute z-0 bottom-0 left-[500px]"></div>
      <div className="w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[350px] border-b-[#c8daf8] absolute z-0 bottom-0 left-[800px]"></div>
    </div>
  );
};

export default ChatNotSelected;
