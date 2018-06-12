import { createLocation } from 'history';
import { PrepareData } from "./components/RouteEntry";
import { GetRuntime } from "./components/BrowserRuntime";

export function Navigate (href: string)
{
	var Runtime = GetRuntime();
	Runtime.data = null;
	Runtime.history.push(href);

	PrepareData(createLocation(href), Runtime.API).then(r =>
	{
		Runtime.data = r;
		Runtime.MainEl.forceUpdate();
	});
}
