const sanitizeObject = (obj, whitelist, keepFirst, polluted) => {
  const clean = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (Array.isArray(value) && !whitelist.includes(key)) {
      clean[key] = keepFirst ? value[0] : value[value.length - 1];
      polluted[key] = value;
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      polluted[key] = {};
      clean[key] = sanitizeObject(value, whitelist, keepFirst, polluted[key]);

      if (Object.keys(polluted[key]).length === 0) {
        delete polluted[key];
      }
    } else {
      clean[key] = value;
    }
  }

  return clean;
};

function hppCustom(options = {}) {
  const whitelist = options.whitelist || [];
  const keepFirst = options.keepFirst || false;

  return function (req, res, next) {
    // always sanitize query
    if (req.query) {
      req.queryPolluted = {};
      const cleanQuery = sanitizeObject(
        req.query,
        whitelist,
        keepFirst,
        req.queryPolluted
      );

      Object.defineProperty(req, 'query', {
        value: cleanQuery,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    // only sanitize body if it's urlencoded (qs-parsed), not JSON
    if (req.body && typeof req.body === 'object') {
      req.bodyPolluted = {};
      const cleanBody = sanitizeObject(
        req.body,
        whitelist,
        keepFirst,
        req.bodyPolluted
      );

      Object.defineProperty(req, 'body', {
        value: cleanBody,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    next();
  };
}

module.exports = hppCustom;
