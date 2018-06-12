export class Entry
{
	Value: number;
}

export class GetFeedPageInput
{
	PageNum: number;
}

export class GetFeedPageOutput
{
	PageNum: number;
	Entries: Entry[];
	PageCount: number;
}
