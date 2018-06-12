import * as React from "react";
import { Entry } from "../api/io_types";

export class Post extends React.Component<Entry,any>
{
	render ()
	{
		return <div>
			<p>{this.props.Value}</p>
		</div>;
	}
}
