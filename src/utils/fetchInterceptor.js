export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token')
    
    if (!token) {
      window.location.href = '/login'
      return
    }
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    })
  
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      return
    }
  
    return response
  }