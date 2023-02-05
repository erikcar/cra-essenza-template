import './style.scss';
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
import { SettingVista } from './vista/profile/SettingVista';
import { UserFormVista } from './vista/profile/UserFormVista';
import { HomeVista } from './vista/home';
//import { Common } from '@xxx/common';

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
    initialized = true;
    //Common.initialize(app);
    app.settings.roles = ['Utente'];
    app.settings.usertype = 0; //se gestisce più ruoli mettere array
    app.settings.defaultRole = 0;
    app.settings.defaultRoute = "";
    app.settings.route =  [""];//Perc ciascun usertype
    app.navigate("/settings");
  }

  return null;
}

/**
 * 
 * @param {VistaApp} app 
 */
function onlogin(app) {
  console.log("ON LOGIN", app);
  app.navigate("/settings");
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
    <AppRoot dev token={token} init={initApp} control={AppController} navigator={nav} qp={qp} onlogin={onlogin} baseurl="http://geco.iconsultant.it/" schema={AppSchema}>
      <Routes>
        {breakpoint.md.active
          ? <Route path="/" element={<MainLayout token={token} />}>
            <Route path="home" element={<HomeVista />} />
            <Route path="settings" element={<SettingVista />} />
            <Route path="userform" element={<UserFormVista />} />
          </Route>
          :
          <Route path="/" element={<MobileLayout token={token} />}>
          </Route>
        }
        <Route index element={<Welcome token={token} />} />
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
