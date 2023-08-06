import { memo, useState } from "react";
import { NextPageWithLayout } from "@/utils/types";
import { useSignIn } from "@/services/auth";
import { encryptData } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { AiOutlineExclamationCircle } from "react-icons/ai";
const SignInPage: NextPageWithLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [forcedInput, setForcedInput] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { data, mutate, isSuccess, isError } = useSignIn();
  const handleSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Your E-mail & Password is invalid ");
      return;
    }

    if (!password) {
      setPasswordError("Your E-mail & Password is invalid ");
      return;
    }

    mutate({ email, password, forced: forcedInput });
    // Perform sign-in logic here
  };

  if (isSuccess) {
    encryptData(data?.user, "userdata");
    encryptData(data?.tokens, "token");
    router.push("/brands");
  }
  const styles = `
  .bgImage {
    background-image: url('/path/to/your/image.jpg');
    background-size: cover;
    /* Add any other background properties you want */
  }
`;

  return (
    <>
      <div className="flex w-full items-center bg-white">
        <div className="bgImage me-12 flex items-center flex-col justify-center pt-6">
          {/* <span className='ps-8 text-white leading-none pe-3 text-5xl font-sm'>Artificial Intelligence scriptwriting and voiceover</span>
          <span className='text-white ps-8 pt-4 '>A Private Web-based application on which a user can make scripts and voiceovers using Chat GPT 4.</span> */}
        </div>
        {/* <Image src="/circle1.png" width={100} height={100}
          alt="Profile" />
        <Image src="/circle2.png" width={300} height={300}
          alt="Profile" />
        <Image src="/circle3.png" width={300} height={300}
          alt="Profile" /> */}
        <div className=" w-5/12 ps-12 pe-6 pt-12 me-12">
          <div className=" flex flex-col jusitfy-end ">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  type="email"
                  id="email"
                  className="w-full px-1 py-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR USERNAME"
                />
              </div>
              <div className="mb-4">
                <TextField
                  type="password"
                  id="password"
                  className="w-full px-1 text-black py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {emailError && (
                <>
                  <span className="pt-1 pb-1 text-red-600 flex items-center mb-2">
                    <AiOutlineExclamationCircle /> <span className="ps-2 pe-2">{emailError}</span>
                  </span>
                </>
              )}
              {passwordError && (
                <>
                  <span className="text-red-600 flex items-center mb-2">
                    <AiOutlineExclamationCircle /> <span className="ps-2 pe-2">{passwordError}</span>
                  </span>
                </>
              )}
              <button
                type="submit"
                className="w-full button-black py-2 px-4 rounded-md hover:bg-white-600 transition duration-200"
              >
                Sign In
              </button>
              {/* <div className='flex justify-end cursor-pointer'>
                <span className='ps-1 pe-1 border-b-2 border-black pt-1 text-sm'>Forget Passowrd</span>
              </div> */}
              {/* <div className='absolute bottom-2 right-3 cursor-pointer'>
                <span className='ps-1 pe-1 border-b-2 border-black pt-1 text-sm'>Continue As Admin</span>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
SignInPage.isProtected = true;
export default memo(SignInPage);
