import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./Common/RequireAuth/RequireAuth";
import { BroshShishi } from "./Screens/BroshShishi/BroshShishi";
import { Calendar } from "./Screens/Calendar/Calendar";
import { Home } from "./Screens/Home/Home";
import Classes from "./Screens/Classes/ClassRegister";
import Keys from "./Screens/Keys/Keys";
import { Login } from "./Screens/Login/Login";
import { User } from "./types/types";

type Props = {};

export const UserContext = React.createContext<User>(null!);

function App(props: Props) {
  const getUserContext = (): User => {
    const base64Url = document.cookie.split("=")[1];

    if (base64Url) {
      return jwt_decode(base64Url);
    }

    return null!;
  };

  const [loggedUser, setLoggedUser] = useState<User>(() => {
    return getUserContext();
  });
  const location = useLocation();

  useEffect(() => {
    storeUserContext();
  }, []);

  const storeUserContext = () => {
    setLoggedUser(getUserContext());
  };

  return (
    <UserContext.Provider value={loggedUser}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={<Login storeUserContext={storeUserContext} />}
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            }
          />
          <Route
            path="/broshShishi"
            element={
              <RequireAuth>
                <BroshShishi />
              </RequireAuth>
            }
          />
          <Route
            path="/class"
            element={
              <RequireAuth>
                <Classes />
              </RequireAuth>
            }
          />
          <Route
            path="/key"
            element={
              <RequireAuth>
                <Keys />
              </RequireAuth>
            }
          />
        </Routes>
      </>
    </UserContext.Provider>
  );
}

export default App;
