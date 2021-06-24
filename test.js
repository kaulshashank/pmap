const pmap = require("./pmap")

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = await pmap(
        nums,
        async (num, i) => {
            await sleep(Math.random() * 1000);
            const val = num * i;
            console.log("val: ", val);
            return val;
        },
        2
    );

    console.log("Result is: ", result);
})();