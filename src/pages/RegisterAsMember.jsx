import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";
import img from "../assets/6207670.jpg";
import { toast } from "react-toastify";
export default function RegisterAsMember() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  //  const history = useHistor();
  const [member, setMembers] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value === confirmPassword.current.value) {
      const user = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/createMember", user);
        toast.success("member added..!");
        window.location.href = "/add-member";
      } catch (error) {
        toast.error(`error`);
        console.log("error in signup", error);
      }
    } else {
      toast.error("password not match");
    }
  };

  useEffect(() => {
    const getMembers = async () => {
      const res = await axiosInstance.get("/getmembers");
      setMembers(res.data.users);
    };
    getMembers();
  }, []);
  const deleteMember = async (id) => {
    await axiosInstance.delete(`/deletemembers/${id}`);
    setMembers(member.filter((item) => item._id !== id));
    toast.success("member deleted..!");
  };
  return (
    <div>
      <div className="min-h-screen h-full pt-20 bg-white flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col  py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Add New Member
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      User name
                    </label>
                    <div className="mt-1">
                      <input
                        name="name"
                        type="text"
                        required
                        ref={username}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        ref={email}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        ref={password}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        ref={confirmPassword}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {member.length > 0 && (
          <div className="relative h-full pt-24 w-full flex-1">
            <div className="rounded-lg space-y-2 max-w-sm mx-auto border bg-white shadow py-2 px-4">
              {member.map((user) => (
                <div className="bg-red-50 rounded-md p-2 h-auto" key={user._id}>
                  <span onClick={() => deleteMember(user._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 float-right cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                  <div>
                    <h3 className="uppercase font-bold text-2xl">
                      {user.name}
                    </h3>{" "}
                    <br />
                    <h4 className="text-gray-700 font-medium">
                      Role : {user.role}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
