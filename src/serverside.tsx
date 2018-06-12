import fs from "fs";
import * as React from "react";
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { APIMod } from "./api/calls";
import { PrepareData } from "./components/RouteEntry";
import { Runtime } from "./components/Runtime";
import { Page } from "./components/Page";

export function render (url: string, ApiPort: number): Promise<string>
{
	var API = new APIMod ("http://127.0.0.1:" + ApiPort);

	var History = createMemoryHistory (
		{
			initialEntries: [url],
			initialIndex: 0
		});

	var PageLayout = PrepareData (History.location, API)
		.then(r =>
		{

			var AppRuntime: Runtime =
				{
					API: API,
					history: History,
					data: r,
					MainEl: null
				};

			var Init =
				{
					Data: r
				};

			var El = <Page runtime={AppRuntime} />;

			var content: string = ReactDOMServer.renderToString (El);
			var template: string = fs.readFileSync ("index.html",'utf8');
			var res: string = template
				.replace('###', content)
				.replace('000000', JSON.stringify(Init));

			return res;
		}, () =>
		{
			return Promise.reject("");
		}) as Promise<string>
	;

	return PageLayout;
}
