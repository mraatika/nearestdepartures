async function doFetch<R>(path: string, requestInit: RequestInit) {
  try {
    const apiUrl = <string>import.meta.env.VITE_SERVER_URL;
    const apiKey = <string>import.meta.env.VITE_DIGITRANSIT_API_KEY;
    const response = await fetch(`${apiUrl}/${path}`, {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/json',
        'digitransit-subscription-key': apiKey,
      },
    });

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
