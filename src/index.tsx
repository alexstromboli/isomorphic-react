import * as ReactDOM from "react-dom";
import * as React from "react";
import { createBrowserHistory } from 'history';
import { APIMod } from "./api/calls";
import { Runtime } from "./components/Runtime";
import { SetRuntime } from "./components/BrowserRuntime";
import { Page } from "./components/page";

var BrowserHistory = createBrowserHistory ();
var API = new APIMod (window.location.origin);

var AppRuntime: Runtime =
	{
		API: API,
		history: BrowserHistory,
		data: (window as any).Init.Data,
		MainEl: null
	};
SetRuntime (AppRuntime);

AppRuntime.MainEl = ReactDOM.hydrate (<Page runtime={AppRuntime} />, document.getElementById ("app")) as React.Component<Runtime,any>;
