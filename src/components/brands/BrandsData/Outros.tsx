import { outroDataTypes } from "@/components/Types/Outro.type";
import { useGetOutro } from "@/services/outro";
import { BsThreeDotsVertical } from "react-icons/bs";
const Outros = () => {
  const { data: Outrodata, isLoading: outroLoading } = useGetOutro();
  return (
    <div>
      <div className="mt-6 rounded-md border-2 h-[calc(100vh-11.5rem)]">
        <div className="flex items-center justify-between pe-12 ps-6 pt-4">
          <div className="flex items-center ">
            <p className="pe-6">No.</p>
            <p>Outros</p>
          </div>
          <div>
            <p>Status</p>
          </div>
        </div>
        <div className="table-bb-gray mt-2 ms-4 me-4"></div>
        <div className="overflow-scroll h-[calc(100vh-14.5rem)]">
          <>
            {Outrodata?.map((items: outroDataTypes) => {
              return (
                <>
                  {console.log(Outrodata, "Outrodata")}
                  <div key={items?.id} className="border-2 mt-2 mb-2 ms-2 me-2">
                    <div className="flex pe-12 ps-6">
                      <div className="pt-2 "><p>1</p></div>
                      <div className="ps-10 pe-10 pt-1 pb-1">
                        <p>{items?.description}</p>
                      </div>
                      <div>
                        <p>{items?.status}</p>
                      </div>
                      <div className="pt-2 cursor-pointer">
                        <BsThreeDotsVertical />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
};

export default Outros;
