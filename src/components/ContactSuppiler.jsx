export default function ContactSuplier({onClose , company}) {
  const closeref = useRef()
  const close = (e)=>{
    if(e.target === closeref.current){
      onClose()
    }
  }

  
  return (
    <div ref={closeref} onClick={close} className="w-full h-screen bg-black/30 z-20 fixed top-0 left-0 flex lg:flex-row flex-col justify-center items-center">
      <div className="hidden w-full xl:block rounded-none xl:w-1/5 h-1/2 mx-2 bg-white lg:rounded-2xl relative p-2">
        <div className="w-full h-2/3 bg-amber-300 rounded-[8px] overflow-hidden">
          <img
            className="w-full aspect-3/2 h-full object-fill"
            src="https://images.unsplash.com/photo-1752481445093-ee346cf62c95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
            alt=""
          />
        </div>
        <h1 className="font-medium text-lg">{company?.name}</h1>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Sold By:{" "}
          <p className="inline text-black">
            {company?.name}
          </p>
        </span>
      </div>
      <form action="" className="w-full xl:w-1/3 xl:h-1/2 pb-10 bg-white rounded-none xl:rounded-2xl relative">
        <div className="w-full flex justify-end px-2">
          <button onClick={()=>onClose()} type="button" className="p-2">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
          <div className="xl:hidden px-2">
            <h1 className="font-medium text-lg">{company?.name}</h1>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Sold By:{" "}
          <p className="inline text-black">
            {company?.name}
          </p>
        </span>
          </div>
        <div className="flex items-center mt-10 flex-col w-full h-full space-y-4">
          <h1 className="text-lg font-medium px-2">
            Contact Seller and get details on your mobile quickly{" "}
          </h1>
          <div className="w-full flex gap-x-2 justify-center">
            <h1 className="text-xl font-medium">Mobile No</h1>
            <input
              type="number"
              className="border px-2 py-1 phone"
               pattern="^[0-9]"
              maxLength={13}
              placeholder="Enter your mobile no"
            />
          </div>
          <button className="text-xl font-medium px-6 py-2 bg-emerald-800 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}