import { TopicData, TopicModalData } from "@/constants/Topic";
import Image from "next/image";
import { Job } from "@/components/Types/job.type";
import { useState, useMemo } from "react";
import Header from "@/common/Header/header";
import SearchBar from "@/common/SearchBar/searchBar";
import { FiSearch } from "react-icons/fi";
import { useModel } from "@/services/Script/hooks/useModel";
import Spinner from "@/modules/spinner/spinner";
import { ModelList } from "@/constants/languageModel";
interface ChildComponentProps {
  setScriptData: (updatedState: Partial<Job>) => void;
}
const LanguageModel: React.FC<ChildComponentProps> = ({ setScriptData }) => {
  const { data: modelData, isLoading: modelLoading } = useModel();
  console.log(modelData,"modelData")
  const [outroData, setOutroData] = useState(modelData);
  const [filteroutro, setFilterOutro] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOutro(event.target.value);
  };

  const FilterData = useMemo(() => {
    return modelData?.filter((item: ModelList) => {
      return item?.model?.toLowerCase().includes(filteroutro.toLowerCase());
    });
  }, [outroData, filteroutro]);
  const [selectTopic, setSelectTopic] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelectTopic(id === selectTopic ? null : id);
    setScriptData({ model: id });
  };
  return (
    <div>
      {modelLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          {" "}
          <div
            // style={{ height: `${divHeight}px` }}
            className="mt-6 rounded-md border-2 "
          >
            <div>
              <div className="ps-3 pt-2">
                <h4 className="font-bold">SELECT LANGUAGE MODEL</h4>
              </div>
              <div className="table-bb-gray mt-4 ms-4 me-4"></div>
            </div>
            <div>
              <div className="pt-2 ps-4">
                <div className="searchBar border-2">
                  <FiSearch className="text-gray-500" />
                  <input
                    onChange={handleFilterChange}
                    type="text"
                    placeholder="Search Language Model"
                    className="rounded-3xl bgSearch focus:outline-none focus:border-blue-500 "
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-center mt-4 mb-4 h-[calc(100vh-22.5rem)] overflow-scroll">
                {FilterData?.map((item: ModelList) => {
                  const { id,description,model } = item;
                  return (
                    <div
                      onClick={() => handleClick(id)}
                      key={id}
                      className="flex
                 cursor-pointer justify-between items-center pt-2 pb-2 ps-4 pe-4 border rounded ms-2 me-2 mt-2 mb-2 widht-card"
                    >
                      <div className="flex items-center">
                        <div className="ps-2 ">
                          <div className="pt-1 pb-1">
                            <p className=" font-bold text-sm">{model}</p>
                          </div>
                        </div>
                      </div>
                      {/* SelectCard */}
                      <div className="">
                        {selectTopic === item.id ? (
                          <Image
                            src="/SelectCard.png"
                            alt="round"
                            width={12}
                            height={12}
                          />
                        ) : (
                          <Image
                            src="/Round.png"
                            alt="round"
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageModel;
