/* eslint-disable */
const rTabs = str => str.trim().replace(/^ {4}/gm, "");

const examples = {
    javascript: rTabs(`
    const buf2hex = buffer => Array.prototype.map.call(
      new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)
    ).join('');
    
    const str2buf = str => new TextEncoder().encode(str);
    
    const str2hex = str => buf2hex(str2buf(str));
    
    export default str2hex;  
    
  `),
    python: rTabs(`
    # Python program to check if the number provided by the user is an Armstrong number or not
    # take input from the user
    num = int(input("Enter a number: "))
    # initialize sum
    sum = 0
    # find the sum of the cube of each digit
    temp = num
    while temp > 0:
       digit = temp % 10
       sum += digit ** 3
       temp //= 10
    # display the result
    if num == sum:
       print(num,"is an Armstrong number")
    else:
       print(num,"is not an Armstrong number")
  `)
};

export default examples;
