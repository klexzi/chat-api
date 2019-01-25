
const generateCode = () => {
   let randomNumber = Math.ceil(Math.random() * 1000000).toString(10);
   if(randomNumber.length < 6) {
      randomNumber += "1";
   }
   return +randomNumber
}

export {generateCode as default};