import * as React from "react";
import { Navigate } from "../navigate";

export class ManLink extends React.Component<any,any>
{
	NavigateA (e, href)
	{
		e.preventDefault();
		Navigate(href);
	}

	render ()
	{
		return <a onClick={e => this.NavigateA(e,this.props.href)} href={this.props.href} className={this.props.className}>{this.props.children}</a>;
	}
}
