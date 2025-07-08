export async function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then((res: Response) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json() as Promise<T>;
  });
}
