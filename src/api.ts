async function doFetch<R>(path: string, requestInit: RequestInit) {
  try {
    const response = await fetch(
      `${<string>import.meta.env.VITE_SERVER_URL}/${path}`,
      {
        ...requestInit,
        headers: { ...requestInit.headers, 'Content-Type': 'application/json' },
      },
    );

    if (!response.ok) {
      throw new Error('Palvelu palautti virheen');
    }

    return <R>response.json();
  } catch (e) {
    throw new Error('Palveluun ei saatu yhteyttä');
  }
}

export async function fetchJSON<R>(path: string, body: unknown) {
  return doFetch<R>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function getJSON<R>(path: string) {
  return doFetch<R>(path, { method: 'GET' });
}
