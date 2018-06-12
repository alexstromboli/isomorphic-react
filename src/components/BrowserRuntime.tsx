import { Runtime } from "./Runtime";

export function GetRuntime (): Runtime
{
	return (window as any).AppRuntime;
}

export function SetRuntime (rt: Runtime): void
{
	(window as any).AppRuntime = rt;
}
