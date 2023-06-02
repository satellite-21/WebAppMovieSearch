export const toSentenceCase = (str: string) => {
  const lower = str.toLowerCase().replace(/_/g, ' ');
  return str.charAt(0).toUpperCase() + lower.slice(1);
};


// converts the entire string to the lowerCase 
// replaces all the  occurences of the '_' with spaces 
// effectively removing underscores from the string and replacing them with spaces


// The transformed string (lower) is assigned to a variable lower using the const keyword.

// Finally, the function returns the converted string in sentence case:

// str.charAt(0).toUpperCase() accesses the first character of the original string (str), converts it to uppercase.
// lower.slice(1) extracts the remaining characters from the lower string starting from index 1 (excluding the first character).

// example :
// const sentence = toSentenceCase('hello_world'); // Input: 'hello_world', Output: 'Hello world'
// console.log(sentence); // Output: 'Hello world'
