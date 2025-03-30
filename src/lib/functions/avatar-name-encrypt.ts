export const shiftCharsBy4 = (cleanUser: string) => {
  let shiftedString = "";

  for (let i = 0; i < cleanUser.length; i++) {
    const shiftedChar = String.fromCharCode(cleanUser.charCodeAt(i) + 4);
    shiftedString += shiftedChar;
  }
  return encodeURIComponent(shiftedString);
};
