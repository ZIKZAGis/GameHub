
export async function fetchData<T>(url: string): Promise<T> {

    return await fetch(url)
        .then((res: Response) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json() as Promise<T>;
        })

}


// export async function fetchJson<T>(
//   ...args: Parameters<typeof fetch>
// ): Promise<T> {
//   const res = await fetch(...args);

//   if (!res.ok) {
//     throw new Error(res.statusText);
//   }

//   return res.json() as Promise<T>;
// }