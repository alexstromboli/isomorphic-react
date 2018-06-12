import * as React from "react";
import { RouteEntry } from "./RouteEntry";

export var About: RouteEntry =
	{
		path: "/about",
		load: (API,loc) => Promise.resolve({}),
		render: (props) => <div>
			<p>
				This is a simple isomorphic ReactJS-based single-page web application.
			</p>
			<p>
				HTML-pages are being rendered both on server side and on client side by the same code.
			</p>
		</div>
	};
