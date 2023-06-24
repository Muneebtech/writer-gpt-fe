import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "@/common/Header/header";
import { CreateReviewData, ReviewDataTypes } from "@/constants/ReviewConstant";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Job } from "@/components/Types/job.type";
import { useTopic } from "@/services/topic";
import { useModel } from "@/services/Script/hooks/useModel";
import { useOutro } from "@/services/outro";
import { Topic } from "@/constants/Topic";
import { OutroItems } from "@/constants/outro";
import { ModelList } from "@/constants/languageModel";
import { useGetChannels } from "@/services/channel";
import { Channel } from "@/constants/channelcategories";
import { scriptType } from "@/components/Types/script.type";
interface ChildComponentProps {
  ScriptData: Job | null;
  Jobdata: {
    script: string;
  };
}
const ReviewData: React.FC<ChildComponentProps> = ({ ScriptData, Jobdata }) => {
  const {
    isLoading: loading,
    data: Outrodata,
    isSuccess: success,
  } = useOutro();

  const { data: topicData, isLoading: topicLoading } = useTopic();
  const { data: modelData, isLoading: modelLoading } = useModel();
  const { data: channelData, isLoading: channelLoading } = useGetChannels();

  let topic = topicData?.find(
    (obj: Topic) => obj.id === ScriptData?.videoTopic
  );
  let outro = Outrodata?.find(
    (obj: OutroItems) => obj.id === ScriptData?.outro
  );
  let model = modelData?.find((obj: ModelList) => obj.id === ScriptData?.model);
  let channel = channelData?.results?.find(
    (obj: Channel) => obj.id === ScriptData?.channel
  );
  console.log(Jobdata, "Jobdata::Jobdata");

  return (
    <div>
      <div className="height-box mt-6 rounded-md border-2">
        <div>
          <div className="ps-3 pt-2">
            <h4 className="font-bold">REVIEW</h4>
          </div>
          <div className="table-bb-gray mt-4 ms-4 me-4"></div>
          <div className="ps-4 pt-2">
            <div className="mt-1">
              <div key={"3234"} className="">
                <div className="flex items-center pt-1 pb-1">
                  <div className=" pt-1 pb-1">
                    <p className="font-bold pe-3">
                      {ScriptData?.name ? "Script Name :" : "Script Name :"}
                    </p>
                  </div>
                  <div className=" pt-1 pb-1">
                    <p>{ScriptData?.name}</p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div>
                    <p className="font-bold  pe-3"> Thumbnail : </p>
                  </div>
                  <div className=" pt-1 pb-1">
                    <Image
                      src="/ground.png"
                      alt="ground"
                      width={45}
                      height={45}
                    />
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div>
                    <p className="font-bold pe-3">
                      {channel?.channel ? "Channel :" : "Channel :"}
                    </p>
                  </div>
                  <div className=" pt-1 pb-1">
                    <p>{channel?.channel}</p>
                  </div>
                </div>
                {/* <div className="pt-1 pb-1">
                  <p>{ScriptData?.}</p>
                </div> */}
                <div className="flex items-center pt-1 pb-1">
                  <div className="pt-1 pb-1">
                    <p className="font-bold pe-3" >
                      {topic?.topic ? "Topic :" : "Topic :"}
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <p>{topic?.topic}</p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div>
                    <p className="font-bold pe-3">
                      {model?.model ? "Model :" : "Model :"}
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <p>{model?.model}</p>
                  </div>
                </div>
                <div className="flex items-center pt-1 pb-1">
                  <div className="pt-1 pb-1">
                    <p className="font-bold pe-3">
                      {outro?.outro ? "Outro :" : "Outro :"}
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <p>{outro?.outro}</p>
                  </div>
                </div>
                {/* <div className="pt-2 pb-2 border ps-2 pe-2">
                  <p>{Jobdata?.script}</p>
                </div> */}
                <div className="pt-1 pb-1">
                  <div>
                    <p className="font-bold pe-3">Script</p>
                  </div>
                  <div className="pt-2 pb-2 border ps-2 pe-2 scriptData me-3">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec egestas convallis orci et sagittis. Vivamus vitae
                      urna cursus ipsum iaculis venenatis eget vel massa. In
                      lobortis semper faucibus. Ut quis enim est. Sed venenatis
                      ipsum eros, vitae porttitor orci faucibus ut. Mauris
                      finibus bibendum lacinia. Quisque ut interdum lorem, et
                      mattis risus. Vestibulum tristique et purus ac ornare.
                      Etiam viverra ante nec suscipit condimentum. Sed libero
                      sem, pulvinar et tempus semper, placerat sit amet risus.
                      Nunc vulputate dignissim orci, nec lacinia diam laoreet
                      in. Donec orci ex, ullamcorper quis erat non, aliquet
                      pellentesque nisl. In hac habitasse platea dictumst.
                      Suspendisse bibendum dignissim ultricies. Ut eu risus
                      erat. Vestibulum at tristique sem. Etiam mi tellus,
                      feugiat at gravida vitae, placerat eu mi. Maecenas
                      consectetur velit a massa commodo porta. Ut non mauris a
                      tortor pharetra accumsan. Maecenas maximus tempor leo ut
                      facilisis. Donec eu dignissim nibh. Nunc placerat, libero
                      aliquam vestibulum luctus, lectus nibh gravida lacus, id
                      eleifend ipsum dolor sed nulla. Ut molestie dolor vitae
                      lacinia commodo. Vivamus in risus in nisi sollicitudin
                      suscipit. Quisque a mauris dui. Nam tempus, nisl in
                      tincidunt vestibulum, velit elit mattis sapien, vel
                      euismod magna ante non lectus. Phasellus mi mi, ultricies
                      id orci egestas, euismod molestie lacus. Pellentesque
                      luctus, sapien tempor rutrum condimentum, mauris felis
                      volutpat odio, ut elementum leo tortor ut nulla. Aliquam
                      pellentesque justo consectetur ante vestibulum, imperdiet
                      aliquam purus tempus. Pellentesque id nisl sapien.
                      Praesent vel eros tincidunt eros malesuada gravida. Ut
                      imperdiet id tellus rhoncus semper. Nam urna leo, eleifend
                      quis enim vitae, malesuada lacinia sapien. Morbi sit amet
                      sollicitudin massa, congue fermentum velit. Cras a lacus
                      turpis. Suspendisse maximus pharetra nunc nec
                      pellentesque. Nam ante elit, fermentum sit amet malesuada
                      sed, accumsan nec lacus. Sed sit amet ex quis odio
                      consequat pellentesque eu eget leo. Fusce dignissim tortor
                      eget turpis porttitor egestas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewData;
