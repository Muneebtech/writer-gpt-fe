import { FiPlus } from "react-icons/fi";
import { Button } from "@mui/material";

const GlobalButton = () => {
  return (
    <>
      <Button className="bg-black text-white ps-4 pe-4">
        <FiPlus />
        Add Channel
      </Button>
    </>
  )
}
export default GlobalButton
