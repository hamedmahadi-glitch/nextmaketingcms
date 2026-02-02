/**
 * Shim pour basehub/events
 * Fournit les stubs pour sendEvent et parseFormData
 */

export function sendEvent(eventName: string, data?: any) {
  // Stub - ne fait rien en développement
  return Promise.resolve();
}

export function parseFormData(
  key: string | FormData,
  schema?: Record<string, any>,
  data?: any
) {
  let result: Record<string, any> = {};
  
  if (key instanceof FormData) {
    key.forEach((value, formKey) => {
      if (result[formKey]) {
        if (Array.isArray(result[formKey])) {
          result[formKey].push(value);
        } else {
          result[formKey] = [result[formKey], value];
        }
      } else {
        result[formKey] = value;
      }
    });
  } else if (data) {
    result = data;
  }
  
  return { success: true, data: result, errors: {} };
}
