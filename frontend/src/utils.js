async function postQuery(uri, query) {
  const requestOptions = {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  };
  const response = await fetch(uri, requestOptions);
  const data = await response.json();
  return {data: data, status: response.status};
}

async function putQuery(uri, query) {
  const requestOptions = {
    method: "PUT",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  };
  console.log(uri);
  const response = await fetch(uri, requestOptions);
  console.log(response);
  const data = await response.json();
  return {data: data, status: response.status};
}

async function deleteQuery(uri) {
  const requestOptions = {
    method: "DELETE",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(uri, requestOptions);
  const data = await response.json();
  return {data: data, status: response.status};
}

async function getQuery(uri) {
  const requestOptions = {
    method: "GET",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
  };
  console.log(uri);
  const response = await fetch(uri, requestOptions);
  console.log(response);
  const data = await response.json();
  return {data: data, status: response.status};
}

export { postQuery, putQuery, deleteQuery, getQuery };
