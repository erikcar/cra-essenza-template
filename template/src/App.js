import './App.scss';
import React, { useRef } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import { version, Test } from '@essenza/core';
import { AppRoot, useBreakPoint } from '@essenza/react';

import { AppSchema } from './schema';
import { MainLayout } from './layout/MainLayout';
import { ProfileVista } from './vista/profile/ProfileVista';
import { MobileLayout } from './layout/MobileLayout';
import { LoginVista } from './vista/profile/LoginVista';
import { SigninVista } from './vista/profile/SigninVista';
import { RecoverVista } from './vista/profile/RecoverVista';
import { Welcome } from './vista/Welcome';
import { CheckEmail } from './vista/profile/Signin';

let initialized = false;

/**
 * 
 * @param {VistaApp} app 
 */
function initApp(app) {

  console.log("INIT APP", app);

  if (!initialized) {
    /*return fetch(window.location.origin + "/app/appsettings.json", { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(r => r.json()).then(r => {
      console.log("CONFIG-DATA", r);
      initialized = true;
    });*/
  }

  return null;
}

/**
 * 
 * @param {VistaApp} app 
 */
function onlogin(app) {
  console.log("ON LOGIN", app);
  app.navigate("/");
}

function AppController(c) {
  c.skin = App;
  c.command = null;
}

//http://geco.iconsultant.it/  https://localhost:44380/

function App() {
  console.log("APP-PROVIDER-BP", version, Test);
  const nav = useNavigate();
  const [qp] = useSearchParams();
  const token = useRef();
  const breakpoint = useBreakPoint('md');

  return (
    <AppRoot token={token} init={initApp} control={AppController} navigator={nav} qp={qp} onlogin={onlogin} baseurl="http://geco.iconsultant.it/" schema={AppSchema}>
      <Routes>
        {breakpoint.md.active
          ? <Route path="/" element={<MainLayout token={token} />}>
            <Route index element={<Welcome token={token} />} />
          </Route>
          :
          <Route path="/" element={<MobileLayout token={token} />}>
            <Route index element={<Welcome token={token} />} />
          </Route>
        }
        <Route path="login" element={<LoginVista />} />
        <Route path="profile" element={<ProfileVista />} />
        <Route path="signin" element={<SigninVista />} />
        <Route path="onsignin" element={<CheckEmail />} />
        <Route path="loginrec" element={<RecoverVista />} />
      </Routes>
    </AppRoot>
  );
}

export default App;
