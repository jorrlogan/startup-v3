import { useState } from 'react';

// import { MessageDialog } from './messageDialog';

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
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div className="flex justify-start items-center content-center flex-col">
        <div
          className="md:w-5/12 h-3/6 flex justify-center content-center items-center flex-wrap flex-col p-8 rounded-lg bg-opacity-8 ">
          <div className="mb-8">
            <img src="./assets/fire-gif.gif" width="200px" />
          </div>
          <p className="md:text-7xl text-5xl font-black mb-8 text-white">Campsnatch</p>
          <div className="w-7/12">
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
            <div className="w-full flex justify-center">
              <button type="submit"
                className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                onClick={() => loginUser()}>Log in</button>
            </div>
            <div id="error-message" className="flex justify-center">

            </div>
          </div>
        </div>
      </div>

      {/* <MessageDialog message={displayError} onHide={() => setDisplayError(null)} /> */}
    </>
  );
}
