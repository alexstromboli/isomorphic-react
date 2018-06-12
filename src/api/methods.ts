import * as IO from "./io_types";

export module APIImplementation
{
	export function  GetFeedPage(Input: IO.GetFeedPageInput): IO.GetFeedPageOutput
	{
		var Numbers =
		[
		99, 10, 39, 20, 17, 71, 41, 91, 87, 59,
		64, 76, 84, 63, 80, 22, 99, 72, 70, 39,
		18, 58, 75, 56, 96, 48, 27, 88, 55, 79,
		54, 82];

		var PageSize = 10;

		var PageCount = ((Numbers.length + (PageSize - 1)) / PageSize) >> 0;
		var PageIndex = Input.PageNum - 1;

		if (PageIndex < 0)
		{
			PageIndex = 0;
		}
		if (PageIndex >= PageCount)
		{
			PageIndex = PageCount - 1;
		}

		var StartIndex = PageSize * PageIndex;
		var Chunk = Numbers.slice (StartIndex, StartIndex + PageSize)
			.map(n => <IO.Entry>{Value:n})
			;

		var Result: IO.GetFeedPageOutput =
			{
				PageNum: PageIndex + 1,
				Entries: Chunk,
				PageCount: PageCount
			};

		return Result;
	}
}
