import * as IO from "./io_types";
import { RunAction } from "../client";

export class APIMod
{
	Prefix: string;

	constructor (Prefix: string)
	{
		this.Prefix = Prefix;
	}

	GetFeedPage(Input: IO.GetFeedPageInput): Promise<IO.GetFeedPageOutput>
	{
		return RunAction<IO.GetFeedPageOutput>(this.Prefix, "GetFeedPage", Input);
	}
}
