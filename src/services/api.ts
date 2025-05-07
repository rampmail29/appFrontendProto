const BASE_URL = 'http://192.168.40.20:3000/api'; // IP local de mi backend srv

const headers = {
  'Content-Type': 'application/json',
};

// Función GET genérica
export const apiGet = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`GET ${endpoint} - Código HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en apiGet(${endpoint}):`, error);
    throw error;
  }
};

// Función POST genérica
export const apiPost = async (endpoint: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
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
      method: 'PUT',
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
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
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
      method: 'PATCH',
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
      method: 'HEAD',
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
      method: 'OPTIONS',
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
      method: 'CONNECT',
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
      method: 'TRACE',
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