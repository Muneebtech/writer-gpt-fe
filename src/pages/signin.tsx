import { memo, useState } from 'react';
import { NextPageWithLayout } from '@/utils/types';
import { useSignIn } from '@/services/auth';
import { encryptData } from '@/utils/localStorage';
import { useRouter } from 'next/router';

const SignInPage: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const [forcedInput, setForcedInput] = useState(false);
  const { data, mutate, isSuccess } = useSignIn()
  const handleSubmit = (e: React.FormEvent) => {
    e.stopPropagation()
    e.preventDefault();
    mutate({ email, password, forced: forcedInput })
    // Perform sign-in logic here
  };

  if (isSuccess) {
    console.log(data?.tokens,'tokens');
    
    encryptData(data?.user, 'userdata')
    encryptData(data?.tokens, 'token')
    router.push('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="forcedInput" className="block text-gray-700 font-medium mb-1">
              <input
                type="checkbox"
                id="forcedInput"
                className="mr-2"
                checked={forcedInput}
                onChange={(e) => setForcedInput(e.target.checked)}
              />
              Forced
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
SignInPage.isProtected = true
export default memo(SignInPage);
