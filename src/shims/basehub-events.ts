/**
 * Shim pour basehub/events
 * Fournit les stubs pour sendEvent et parseFormData
 */

export function sendEvent(eventName: string, data?: any) {
  // Stub - ne fait rien en développement
  return Promise.resolve();
}

export function parseFormData(formData: FormData) {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  });
  return data;
}
