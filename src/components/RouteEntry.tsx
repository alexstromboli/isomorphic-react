import { matchPath } from 'react-router';
import { APIMod } from "../api/calls";
import { Runtime } from "./Runtime";
import { FeedPageDef, FeedPageList } from "./FeedPage";
import { About } from "./About";

export class RouteEntry
{
	path: string|string[];
	load: (API: APIMod, loc: any) => Promise<any>;
	render: (Props: Runtime) => JSX.Element;
}

export const Routes: RouteEntry[] =
	[
		About,
		FeedPageDef,
		FeedPageList
	];

export function PrepareData (loc, API: APIMod): Promise<any>
{
	for (var ind in Routes)
	{
		var en = Routes[ind];
		var m = matchPath (loc.pathname, en.path);

		if (m
			&& (m.url != "/" || m.isExact))
		{
			return en.load(API, loc);
		}
	}

	// return trivial
	return Promise.reject("");
}
