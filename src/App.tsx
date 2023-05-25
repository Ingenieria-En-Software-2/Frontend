import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "modules/Home/widgets/Home.tsx";
import CreateUser from "modules/User/widgets/CreateUser.tsx";
import SERVER_URLS from "utils/serversUrls.ts";
import UserProfiles from "modules/User/widgets/UserProfiles.tsx";
import UserRoles from "modules/User/widgets/UserRoles";
// import { useGetUsersQuery, useCreateRoleMutation, useCreateUserMutation } from "services/dbApi";
// import { useEffect } from "react";

const { URL_CREATE_USER, URL_HOME, URL_USER_PROFILES, URL_USER_ROLES } = SERVER_URLS;

function App() {
  /* This is an example of how to use the generated API */

  /* How to get users by query params */
  // const { data, error, isLoading } = useGetUsersQuery(undefined); // get first 10 users
  // const { data, error, isLoading } = useGetUsersQuery({
  //   // get users with name "admin"
  //   name: "admin",
  // });

  // useEffect(() => {
  //   if (data) console.log(data);
  //   if (error) console.log(error);
  //   if (isLoading) console.log(isLoading);
  // }, [data, error, isLoading]);

  /* How to create a role */
  // const [createRole, { data, error, isLoading }] = useCreateRoleMutation();

  // useEffect(() => {
  //   createRole({ description: "Admin" });
  //   createRole({ description: "User" });
  // }, [createRole]);

  // useEffect(() => {
  //   if (data) console.log(data);
  //   if (error) console.log(error);
  //   if (isLoading) console.log(isLoading);
  // }, [data, error, isLoading]);

  /* How to create a user */
  // const [createUser, { data, error, isLoading }] = useCreateUserMutation();

  // useEffect(() => {
  //   createUser({
  //     login: "test",
  //     password: "test",
  //     name: "test",
  //     lastname: "test",
  //     user_type: "test",
  //     role_id: 1,
  //   });
  // }, [createUser]);

  // useEffect(() => {
  //   if (data) console.log(data);
  //   if (error) console.log(error);
  //   if (isLoading) console.log(isLoading);
  // }, [data, error, isLoading]);

  return (
    <>
      <Routes>
        <Route path={URL_HOME} element={<Home />} />
        <Route path={URL_CREATE_USER} element={<CreateUser />} />
        <Route path={URL_USER_PROFILES} element={<UserProfiles />} />
        <Route path={URL_USER_ROLES} element={<UserRoles />} />
      </Routes>
    </>
  );
}

export default App;
