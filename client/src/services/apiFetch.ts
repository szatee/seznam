const apiFetch = async <T>(params: any): Promise<T> => {
  const { method = 'GET', route, payload, body } = params;
  const res = await fetch(`http://localhost:8080/api/${route}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(payload ? { 'Content-Type': 'application/json' } : {}),
    },
    body: payload ? JSON.stringify(payload) : body,
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    const errorMessage: any = await res.json();
    throw new Error(errorMessage.message);
  }
};

export default apiFetch;
