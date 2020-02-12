function doubleMGenerator(n) {
    let minNumber = 2;
    let maxNumber = 10000;
    let isEven = n % 2 === 0;
    const errorMsg = `The number ${n} you have entered must be `;
    const evenErrorMsg = 'an odd number.';
    if (n <= minNumber) {
        return errorMsg + `greater than ${minNumber}${isEven ? ` and ${evenErrorMsg}` : '.'}`;
    }
    if (n >= maxNumber) {
        return errorMsg + `smaller than ${maxNumber}${isEven ? ` and ${evenErrorMsg}` : '.'}`;
    }
    if (isEven) {
        return errorMsg + evenErrorMsg;
    }

    const createRowPartDash = createRowPart.bind(undefined, '-');
    const createRowPartAsterisk = createRowPart.bind(undefined, '*');
    const [leftMRows, flippedMiddleColumn] = createFullRows();

    function createRowPart(symbol, repeatCount) {
        return symbol.repeat(repeatCount);
    }

    function createFullRows() {
        let k = 1;
        let j = n - 1;
        let median = Math.floor(n / 2);
        const leftMRows = [];
        const commonColumn = [];
        for (let i = 0; i <= n; i++) {
            let firstPart = '';
            let secondPart = '';
            let thirdPart = '';
            let fourthPart = '';

            firstPart = createRowPartDash(n - i);
            if (median + i < n) {
                secondPart = createRowPartAsterisk(median + i);
                fourthPart = createRowPartAsterisk(median + i);
            } else {
                secondPart = createRowPartAsterisk(n);
            }

            if (median >= i) {
                thirdPart = createRowPartAsterisk(1);
            } else {
                thirdPart = createRowPartDash(k);
                k += 2;
            }

            if (median + i >= n) {
                fourthPart = createRowPartAsterisk(j);
                j -= 1;
            }
            leftMRows.push(firstPart + secondPart + thirdPart + fourthPart);
            commonColumn.push(thirdPart);
        }
        return [leftMRows, commonColumn.reverse()];
    }

    return leftMRows.reduce((acc, leftMRow, i) => {
        const rightMRow = [...leftMRow].reverse().join('');
        const fullMRow = createRowPart(leftMRow + flippedMiddleColumn[i] + rightMRow, 2);
        acc = [...acc, fullMRow];
        return acc;
    }, []).join('\n');


}

console.log(doubleMGenerator(3));
console.log(doubleMGenerator(5));
console.log(doubleMGenerator(7));
console.log(doubleMGenerator(9));
/*Invalid inputs:*/
console.log(doubleMGenerator(2));
console.log(doubleMGenerator(10001));
console.log(doubleMGenerator(4));