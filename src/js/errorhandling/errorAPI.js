export function errorAPI(response) {
  if (!response.ok) {
    const errorMessage = response.statusText || 'Unknown error occurred';
    return { success: false, status: response.status, message: errorMessage };
  }
  return { success: true };
}
