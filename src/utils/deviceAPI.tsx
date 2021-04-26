export async function devices<T> (url: string, devicesNumber: number): Promise<T> {
  const res = await fetch(`${url}${devicesNumber ? `?n=${devicesNumber}` : null}`)
  const body = await res.json();
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return body;
}