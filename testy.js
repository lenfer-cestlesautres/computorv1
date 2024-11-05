// import * as readline from 'readline'
// var http = require("http");
const readline = require('readline')
// a * x^p
// A1*X^2 + B1*X^1 + C1*X^0 = A2*X^2 + B2*X^1 + C2*X^0  
/*
1 = 0 Invalid
0 = 0 Infinite
if p > 2 => The polynomial degree is strictly greater than 2, I can't solve.
if p < 0 => (for your own safe check)
------
D < 0 (Im no need to handle => Invalid)
D = 0 => 1 root (x = -b/2a)
D > 0 => 2 roots (x_n = (-b +- sqrt(D))/(2a)) 

---
if !string => return no equation provided
~ eq style is not unifying
---
handle all numbers (dont sqrt?)
case zero (0 * X^n)
(- -12.1)
~ num === "." which results to NaN then error?

---- order should be kept the same in the reduced form
*/

class MyMath {
    static sqrt(n) {
        let guess = n;
        const accuracy = 0.000001; // This determines the accuracy of the result
        while ((guess - n / guess) > accuracy) {
            guess = (guess + n / guess) / 2
        }
        return guess.toFixed(5)
    }

    static abs(n) {
        return n > 0 ? n : -n
    }

    static findMax(a) {
        const [max] = a.sort((a, b) => +b - +a)

        return max
    }
}

class QuadraticEquation {
    #equationRaw
    #errorMessage
    //  5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0
    //  3 * X^12 - 4 * X^1 + 5 * X^0 = 4 * X^0 - 1 * X^2
    #eqInfo = {}
    #regexp = /^((\+)?|\-)(\d*\.?\d*)\s\*\sX\^\d+$/g

    constructor() {
        this.#equationRaw = (process.argv.slice(2)?.[0] ?? '')
    }

    #throwError(msg) {
        console.log(msg ?? 'test')
    }

    #printAnswer(msg) {
        console.log(msg ?? 'test')
    }

    #getInfo(arr) {
        const info = arr.reduce((acc, _val, index) => {
            const start = 3 * index

            if (start + 3 <= arr.length) {
                const [coef, , x] = arr.slice(start, start + 3)
                const [, pow] = x.split('^')
                const newCoef = (acc?.[pow] ?? 0) + coef

                return { ...acc, [pow]: newCoef }
            }
            return acc
        }, {})

        this.#eqInfo = {...this.#eqInfo, ...info}
    }

    #getReducedEquation() {
        const reducedForm = Object.entries(this.#eqInfo).map(([pow, coef], index) => {
            return `${coef >= 0 ? index === 0 ? coef : `+ ${MyMath.abs(coef)}` : `- ${MyMath.abs(coef)}`} * X^${pow}`
        })
        return `${reducedForm.join(' ')} = 0`
    }

    #getEquationInfo() {
        
        const arr = this.#equationRaw.replace(/\+\s/g, '+').replace(/\-\s/g, '-').split('=')
        console.log(arr)
        arr.forEach((el) => console.log(this.#regexp.test(el)))

        const [left, right] = arr.map((a) => a.split(' ').filter((i) => i))
        const leftToMerge = left.map((item) => Number.isNaN(+item) ? item : +item)
        const rightToMerge = right.map((item) => Number.isNaN(+item) ? item : -+item)
        const formToReduce = [...leftToMerge, ...rightToMerge]


        this.#getInfo([...leftToMerge, ...rightToMerge])
    }


    #getCoefficient(degree) {
        console.log('a', this.#eqInfo?.[degree])
        return this.#eqInfo?.[degree] ? +this.#eqInfo?.[degree] : 0
    }

    #solveEquation() {
        const [a, b, c] = ["2", "1", "0"].map((ind) => this.#getCoefficient(ind))
        if (a === 0 && b === 0 && c === 0) {
            return this.#printAnswer(`Both sides of equation are equal: infinite number of solutions.`)
        }
        const d = b * b - 4 * a * c

        if (d < 0) {
            return this.#throwError(`Discriminant is strictly less than 0, I can't solve.`)
        }
        if (d === 0) {
            return this.#printAnswer(`Discriminant is equal to zero, the solution is:\n${(-b) / (2 * a)}`)
        }

        const x1 = (-b + MyMath.sqrt(d)) / (2 * a)
        const x2 = (-b - MyMath.sqrt(d)) / (2 * a)

        return this.#printAnswer(`Discriminant is strictly positive, the two solutions are:\n${x1}\n${x2}`)


    }

    printResult() {
        if (this.#errorMessage) {
            this.#throwError()
        }
        this.#getEquationInfo()
        console.log('this.#eqInfo', this.#eqInfo)
        const coefficients = Object.keys(this.#eqInfo)
        const polDegree = MyMath.findMax(coefficients)

        console.log(`Reduced form: ${this.#getReducedEquation()}`)
        console.log(`Polynomial degree: ${polDegree}`)

        if (polDegree > 2) {
            return this.#throwError(`The polynomial degree is strictly greater than 2, I can't solve.`)
        }
        if (polDegree < 0) {
            return this.#throwError(`The polynomial degree is strictly less than 0, I can't solve.`)
        }

        // console.log(`answerMessage: ${this.#answerMessage}`)

        this.#solveEquation()
    }


}

const inst = new QuadraticEquation()
inst.printResult()
// const rl = readline.createInterface({ 
//     input: process.stdin, 
//     output: process.stdout 
// });

// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
//   });

//   console.log('a')