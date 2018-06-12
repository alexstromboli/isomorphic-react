import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from 'react-router';
import { Runtime } from "./Runtime";
import { Routes } from "./RouteEntry";
import { ManLink } from "./ManLink";

var styles = require("./main.scss");

export class PageElProps
{
	runtime: Runtime;
}

export class Page extends React.Component<PageElProps,any>
{
	render ()
	{
		return <Router history={this.props.runtime.history}>
			<div>
				<div className={styles.nav_bar}>
					<span className={styles.pages_link}><ManLink href="/">feed</ManLink></span>
					<span className={styles.pages_link}><ManLink href="/about">about</ManLink></span>
				</div>
				<div className={styles.content}>
					<Switch>
						{
							Routes.map((r, w) => <Route path={r.path} key={r.path} render={() => r.render(this.props.runtime)}/>)
						}
					</Switch>
				</div>
			</div>
		</Router>
		;
	}
}
