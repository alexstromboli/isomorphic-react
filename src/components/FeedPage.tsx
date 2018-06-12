import * as React from "react";
import { RouteEntry } from "./RouteEntry";
import { getQueryParams } from "../utils";
import { APIMod } from "../api/calls";
import * as IO from "../api/io_types";
import { ManLink } from "./ManLink";
import { Post } from "./Post";

var styles = require("./main.scss");

export class PageNav extends React.Component<IO.GetFeedPageOutput,any>
{
	render ()
	{
		var tNext = "prev";
		var tPrev = "next";

		return <div>
			<span className={styles.pages_link}>
				{this.props.PageNum < this.props.PageCount && <ManLink href={"/list?p=" + (this.props.PageNum+1)}><span>{tNext}</span></ManLink>}
				{this.props.PageNum == this.props.PageCount && <span>{tNext}</span>}
			</span>

			<span className={styles.pages_link}>
				{this.props.PageNum} / {this.props.PageCount}
			</span>

			<span className={styles.pages_link}>
				{this.props.PageNum > 1 && <ManLink href={"/list?p=" + (this.props.PageNum-1)}><span>{tPrev}</span></ManLink>}
				{this.props.PageNum == 1 && <span>{tPrev}</span>}
			</span>
		</div>;
	}
}

export var FeedPageList: RouteEntry =
	{
		path: "/list",
		load: (API: APIMod, loc) =>
		{
			var PageNum = getQueryParams(loc.search).p || 1;
			return API.GetFeedPage({PageNum: PageNum}) as Promise<any>;
		},
		render: (props) =>
		{
			var D: IO.GetFeedPageOutput = props.data;
			if (!D)
			{
				return <span>wait</span>;
			}

			return <div>
				<PageNav {...D} />

				{D.Entries.map((en,ind) => <Post {...en} key={ind} />)}

				<PageNav {...D} />
			</div>;
		}
	};

export var FeedPageDef: RouteEntry =
	{
		path: "/",
		load: FeedPageList.load,
		render: FeedPageList.render
	};
