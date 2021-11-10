export function isUndefinedNullOrEmpty(value) {
    if (null === value || undefined === value) return true;
    if ('string' === typeof value) {
      if ('' == value) return true;
      return false;
    }
  
    if ('number' === typeof value) return false;
  
    if ('object' === typeof value) {
      if (Array.isArray(value)) {
        if (0 >= value.length) return true;
        return false;
      }
  
      if (0 >= Object.keys(value).length) return true;
      return false;
    }
  
    return true;
  }

  export function isNumber(value) {
    const n = parseInt(value, 10);
    return !isNaN(n);
  }