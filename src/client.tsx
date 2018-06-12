import fetch from "node-fetch";

export function RunAction<R> (Prefix: string, Method: string, Data): Promise<R>
{
    return fetch(Prefix + "/api/" + Method,
                {
                    method: "POST",
                    body: JSON.stringify(Data)
                })
            .then(r => r.json())
            ;
}
