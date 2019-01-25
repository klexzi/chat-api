// export type options = {
//    ref: string;
//    type: any;
//    name: string;
//  };

 const belongsTo = (schema, options) => {
   const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
   const field = JSON.parse(fieldInString);
   field[options.name]["type"] = options.type;
   schema.add(field);
 };
 const mustBelongTo = (schema, options) => {
   const fieldInString = `{ "${options.name}" : { "ref": "${options.ref}"}}`;
   const field = JSON.parse(fieldInString);
   field[options.name]["type"] = options.type;
   field[options.name]["required"] = true;
   schema.add(field);
 };

 const hasMany = (schema, options) => {
   const fieldInString = `{ "${options.name}" : [{ "ref": "${options.ref}"}]}`;
   const field = JSON.parse(fieldInString);
   field[options.name][0]["type"] = options.type;
   field[options.name][0]["default"] = [];
   schema.add(field);
 };
 
 const belongsToMany = (schema, options) => {
  const fieldInString = `{ "${options.name}" : [{ "ref": "${options.ref}"}]}`;
  const field = JSON.parse(fieldInString);
  field[options.name][0]["type"] = options.type;
  field[options.name][0]["default"] = [];
  schema.add(field);
};

 export {belongsTo, mustBelongTo, belongsToMany, hasMany};