import { useState } from 'react';

export function Unauthenticated(props) {
  const [userName, setUserName] = useState(props.userName);
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log(response)
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      console.log(body)
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div className="flex justify-start items-center content-center flex-col mt-24">
        <div
          className="xl:w-3/12 lg:w-4/12 md:w-6/12 w-full h-3/6 flex justify-center content-center items-center flex-wrap flex-col p-8 rounded-lg bg-opacity-8 ">
          <h1 className="text-center md:text-4xl text-4xl font-bold mb-8 ">Campsnatch</h1>
          <div className="w-full">
            <div className="mb-3">
              <label for="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Email
                address</label>
              <input type="email" id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com" required onChange={(e) => setUserName(e.target.value)}></input>
            </div>
            <div className="mb-6">
              <label for="password"
                className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
              <input type="password" id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••" required onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className='flex justify-center flex-row'>
              <div className=''>
              <button className={`text-white p-2 m-4 w-24 rounded-lg bg-blue-700`} onClick={() => loginUser()}>Login</button>

              <button className={`text-white p-2 m-4 w-24 rounded-lg bg-blue-700`} onClick={() => createUser()}>Sign Up</button>
            </div>
            </div>
            <div id="error-message" className="flex justify-center">
              {displayError}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
