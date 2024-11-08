/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   testy.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: arichie <arichie@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/11/06 20:39:20 by arichie           #+#    #+#             */
/*   Updated: 2024/11/06 20:39:21 by arichie          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

class MyMath {
    static sqrt(n) {
        let guess = n;
        const accuracy = 0.000001; // This determines the accuracy of the result
        while ((guess - n / guess) > accuracy) {
            guess = (guess + n / guess) / 2
        }
        return +guess.toFixed(5)
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
    #eqInfo = {}
    #additionalRegex = /((\+?|\-)\d+((\.|\,)?\d*))|\*|([Xx]\^\-?(\d+((\.|\,)?\d*)))/g

    constructor() {
        if (process.argv.length > 3) {
            this.#errorMessage = `Well, try again. I think that's too much args.`
            return
        }
        this.#equationRaw = (process.argv.slice(2)?.[0] ?? '')
    }

    #throwError(msg) {
        console.log(msg ?? 'error')
    }

    #printAnswer(msg) {
        console.log(msg ?? 'error')
    }

    #getInfo(arr) {
        if (arr.length % 3 !== 0) {
            this.#errorMessage = `Invalid format, I can't solve.`
        }

        const info = arr.reduce((acc, _val, index) => {
            if (this.#errorMessage) {
                return
            }

            const start = 3 * index

            if (start + 3 <= arr.length) {
                const [coef, , x] = arr.slice(start, start + 3)

                if (Number.isNaN(coef)) {
                    this.#errorMessage = `Invalid format, I can't solve.`
                }

                const [, powPre] = x.split('^')
                const pow = +powPre == 0 ? '0' : powPre
                const newCoef = ((acc?.[pow] ?? 0) + coef)

                return { ...acc, ...(pow) && { [pow]: newCoef } }
            }
            return acc
        }, {})
        const eqInfo = { ...this.#eqInfo, ...info }

        if (!Object.keys(eqInfo).filter((k) => k).length) {
            this.#errorMessage = `Invalid format, I can't solve.`
            return
        }
        this.#eqInfo = { ...this.#eqInfo, ...info }
    }

    #getReducedEquation() {
        const reducedForm = Object.entries(this.#eqInfo).map(([pow, coef], index) => {
            return `${coef >= 0 ? index === 0 ? +coef.toFixed(3) : `+ ${+MyMath.abs(coef).toFixed(3)}` : `- ${+MyMath.abs(coef).toFixed(3)}`} * X^${pow}`
        })
        return `${reducedForm.join(' ')} = 0`
    }

    #convertCoefficients(arr, changeSign = false) {
        return arr.map((itemRaw) => {
            const item = itemRaw.replace(',', '.')

            return Number.isNaN(+item) ? item : changeSign ? -+item : +item
        }
        )
    }

    #getEquationInfo() {
        if (!this.#equationRaw?.length) {
            if (!this.#errorMessage) {
                this.#errorMessage = `Well, try again. I think you haven't passed anything.`
            }
            return
        }
        const arr = this.#equationRaw.replace(/\+\s*/g, '+').replace(/\-\s*/g, '-').split('=')

        if (arr.length !== 2) {
            this.#errorMessage = `Invalid format, I can't solve.`
            return
        }

        const [left, right] = arr?.map((a) => a?.split(' ')?.filter((i) => i))

        if (!left?.length || !right?.length) {
            this.#errorMessage = `Invalid format, I can't solve.`
            return
        }
        const cleanedLeft = left.map((item) => item.match(this.#additionalRegex)).flat()
        const cleanedRight = right.map((item) => item.match(this.#additionalRegex)).flat()

        const strLeft = cleanedLeft.join('')
        const strRight = cleanedRight.join('')
        if (strLeft === strRight) {
            this.#errorMessage = `Both sides of the equation are equal: any real number can be a solution.`
            return
        }

        if (left.join('').length !== strLeft.length || right.join('').length !== strRight.length) {
            this.#errorMessage = `Use the right format: a * X^p`
            return
        }

        const leftToMerge = this.#convertCoefficients(cleanedLeft)
        const rightToMerge = this.#convertCoefficients(cleanedRight, true)

        if (rightToMerge.length === 1 && rightToMerge[0] == 0 && leftToMerge.length > 0) {
            this.#getInfo(leftToMerge)
            return
        }
        if (leftToMerge.length === 1 && leftToMerge[0] == 0 && rightToMerge.length > 0) {
            this.#getInfo(rightToMerge)
            return
        }
        this.#getInfo([...leftToMerge, ...rightToMerge])
    }

    #solveComplex(d, a, b, c) {
        const absD = MyMath.sqrt(MyMath.abs(d))
        const rePart = +(-b / (2 * a)).toFixed(5)
        const imPart = +(absD / (2 * a)).toFixed(5)

        return this.#printAnswer(`Discriminant is strictly negative, the solution is:\n${rePart} - ${imPart}i\n${rePart} + ${imPart}i`)
    }

    #solveEquation() {
        const a = this.#eqInfo?.['2'] ? +this.#eqInfo?.['2'] : 0
        const b = this.#eqInfo?.['1'] ? +this.#eqInfo?.['1'] : 0
        const c = this.#eqInfo?.['0'] ? +this.#eqInfo?.['0'] : 0

        if (a === 0) {
            if (b === 0) {
                if (c === 0) {
                    return this.#printAnswer(`Both sides of the equation are equal: any real number can be a solution.`)
                }
                return this.#throwError(`Invalid format, I can't solve.`)
            }
            return this.#printAnswer(`The solution is:\n${+(-c / b).toFixed(5)}`)
        }

        const d = b * b - 4 * a * c

        if (d < 0) {
            return this.#solveComplex(d, a, b, c)
        }
        if (d === 0) {
            return this.#printAnswer(`Discriminant is equal to zero, the solution is:\n${+((-b) / (2 * a)).toFixed(5)}`)
        }

        const x1 = +((-b + MyMath.sqrt(d)) / (2 * a)).toFixed(5)
        const x2 = +((-b - MyMath.sqrt(d)) / (2 * a)).toFixed(5)

        return this.#printAnswer(`Discriminant is strictly positive, the two solutions are:\n${x1}\n${x2}`)
    }

    printResult() {
        this.#getEquationInfo()
        if (this.#errorMessage) {
            return this.#throwError(this.#errorMessage ?? 'What have you done with me?')
        }

        const degrees = Object.keys(this.#eqInfo).filter((key) => this.#eqInfo[key] !== 0)
        console.log(`Reduced form: ${this.#getReducedEquation()}`)
        console.log(`Polynomial degree: ${MyMath.findMax(degrees) ?? 0}`)

        if (degrees.filter((a) => +a < 0)?.length > 0) {
            return this.#throwError(`This equation contains degrees that are strictly negative, I can't solve.`)
        }
        if (MyMath.findMax(degrees) > 2) {
            return this.#throwError(`The polynomial degree is strictly greater than 2, I can't solve.`)
        }
        if (degrees.find((deg) => !Number.isInteger(+(deg.replace(',', '.'))))) {
            return this.#throwError(`The polynomial degree is not an integer, I can't solve.`)
        }

        this.#solveEquation()
    }
}

const equationSolver = new QuadraticEquation()
equationSolver.printResult()
