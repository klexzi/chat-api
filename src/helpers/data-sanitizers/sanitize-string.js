
const sanitizeString = (object) => {
   Object.keys(object).map((key, index) => {
      if (typeof object[key] === "string") {
        object[key] = object[key].trim().toLowerCase();
      }
    });
}

export {sanitizeString as default};