/* eslint-disable */
const rTabs = (str) => str.trim().replace(/^ {4}/gm, "");

const examples = [
    {
        filename: "src-1",
        extention: ".c",
        language: "c",
        code: rTabs(`

        	// Header file for input output functions
        #include <stdio.h>
        
        // main function -
        // where the execution of program begins
        int main()
        {
        
            // prints hello world
            printf("Hello World\\n");
        
            return 0;
        }`),
    },
    {
        filename: "src-2",
        extention: ".c",
        language: "c",
        code: rTabs(`

			// Header file for input output functions
        #include <stdio.h>
        
        // main function -
        // where the execution of program begins
        int main()
        {
        
        int a;
        printf("Enter any number for a: ");
        scanf("%d", &a);
            // prints hello world
            printf("This is second %d\\n", a);
        
            return 0;
        }`),
    },
    {
        filename: "src-3",
        extention: ".c",
        language: "c",
        code: rTabs(``),
    },
];

export default examples;
