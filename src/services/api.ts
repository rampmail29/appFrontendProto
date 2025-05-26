//conexión red WiFi:IoT
//const BASE_URL = "http://192.168.10.20:4561/api"; // IP local de mi backend srv en iot
const BASE_URL = "https://appbackend-production-96c6.up.railway.app/api"; // URL de mi backend en Railway

const headers = {
  "Content-Type": "application/json",
};
// Función para construir query string desde un objeto
const buildQueryString = (params?: Record<string, string | number>) => {
  if (!params) return "";
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return `?${query}`;
};

// Función GET genérica con soporte de query params
export const apiGet = async (
  endpoint: string,
  queryParams?: Record<string, string | number>
) => {
  try {
    const url = `${BASE_URL}${endpoint}${buildQueryString(queryParams)}`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`GET ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    //console.error(`Error en apiGet(${endpoint}):`, error);
    throw error;
  }
};

// Función POST genérica
export const apiPost = async (endpoint: string, body: any) => {
  console.log(body)
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`POST ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiPost(${endpoint}):`, error);
    throw error;
  }
};
// función put generica
export const apiPut = async (endpoint: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`PUT ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiPut(${endpoint}):`, error);
    throw error;
  }
};
// función delete generica
export const apiDelete = async (endpoint: string) => {
  console.log(endpoint)
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiDelete(${endpoint}):`, error);
    throw error;
  }
};

// función patch generica
export const apiPatch = async (endpoint: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`PATCH ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiPatch(${endpoint}):`, error);
    throw error;
  }
};
// función head generica
export const apiHead = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "HEAD",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HEAD ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiHead(${endpoint}):`, error);
    throw error;
  }
};
// función options generica
export const apiOptions = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "OPTIONS",
      headers,
    });

    if (!response.ok) {
      throw new Error(`OPTIONS ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiOptions(${endpoint}):`, error);
    throw error;
  }
};
// función connect generica
export const apiConnect = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "CONNECT",
      headers,
    });

    if (!response.ok) {
      throw new Error(`CONNECT ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiConnect(${endpoint}):`, error);
    throw error;
  }
};
// función trace generica
export const apiTrace = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "TRACE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`TRACE ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiTrace(${endpoint}):`, error);
    throw error;
  }
};
