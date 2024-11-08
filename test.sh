#!/bin/bash

neutralColor="\033[0m"
purpleColor="\033[95m"
blueColor="\033[94m"


infSolution="The equasion has an infinite number of solutions"
noSolution="The equasion has no solutions"

testListFreeMember=(\
"4 = 5" \
"0=0" \
"9 =8" \
"1=  1 * x^0"
)

echo -e "${purpleColor}------------------------------------TEST STARTED [free member cases]------------------------------------\n"

for t in ${!testListFreeMember[*]}
do
    echo -e "${purpleColor}Test: [${testListFreeMember[$t]}]$neutralColor"
    node index.js "${testListFreeMember[$t]}"
    echo -e "${blueColor}----------------------------------------------------------------\n"
done


testLinearEquation=(\
"4 * x^1 = 5*x^0" \
"4 * x^1 = 5" \
"0=0 * x^1" \
"9 =8 * x^1 + x^1 - x^1" \
"1 * x^1 =  1 * x^1" \
"0 = 1 * x^1 + 1*x^1 + 1*x^1 - 3 * x^1 - 1 * x^1" \
"0 = -2 * x^0 + 1   * x^1 + 78*x^0" \
"0 = !*x^1" \
"0 = -1 * x^1f + 0.5*x^1 + 8*x^0" \
"1*x^1 = 0 * x^1 + 1 * xx^1" \
"1* xX^1 - 1* x^1 + 1 * x^0 = 0 * x^5"
)

echo -e "${purpleColor}------------------------------------TEST STARTED [linear equation cases]------------------------------------\n"

for t in ${!testLinearEquation[*]}
do
    echo -e "${purpleColor}Test: [${testLinearEquation[$t]}]$neutralColor"
    node index.js "${testLinearEquation[$t]}"
    echo -e "${blueColor}----------------------------------------------------------------\n"
done

testQuadraticEquation=(\
"1*x^1 = 1  * x^2" \
"0 * x^2 + 2 * x^2 = 9 * x^0" \
"0 = 1*x^2 - 2 * x^1 + 1* x^0" \
"1 * x^0 + 2 * x^1 + 1 * x^2 = 0" \
"1*x^2 = -4" \
"0 = 8 * x^2 - 6*x^0" \
"0 = 8 *  x^2   -  6* x^0" \
"1*x^2 + x^0 - 7 - x^1 = 12 + x^2 - 2 * x^2" \
"0.3 * x^2 + 0.6 * x^1 + 0.3*x^0 = 0" \
"0.3 * x^2 = -0.8 * x^0" \
"0.3 * x^2 = -0.8 * x^1 - 56*x^0" \
"0.3 * x^2 = 0.8 * x^1 - 56 *X^0" \
"1*x^0 - x^2 - x^3 = 1* x^3 - x^2" \
"1 * x^0 - 1 * x^2 - 1* x^3 = -x^3 + x^2" \
"1 * x^0 + 1 * x^2 - 1* x^3 = -x^3 - x^2" \
"1 * x^0 + 1 * x^2 - 1* x^3 + x^1 = -x^3 - x^2" \
"1 * x^0 + 1 * x^2 - 1* x^3 - x^1 = -x^3 - x^2" \
"1 * x^0 + x^2 - x^3 - 2*x^1 = -x^3 - x^2" \
"1 * x^0 + 1 * x^2 -1*  x^3 - 2*x^1 = -x^3 - x^2 - 4*x^1" \
"x^0 + x^2 - 5 * x^3 - 2*x^1 = - 5 * x^3 - x^2 + 4*x^1" \
"1 * x^0 + 1 * x^2 - 5 * x^3 - 2*x^1 = - 5 * x^3 - x^2 + 4*x^1 + 9 * x^7" \
"1 * x^0 + 1 * x^1 + x^2 + x^3+x^4+x^5 +x^6+ x^7 + x^9+ x^10 + x^11 = 0" \
"x^0 + 0 * 1 * x^1 + 0 * x^2 + 0 * x^3+0*x^4+0*x^5 +0*x^6+ 0*x^7 + 0*x^9+ 0*x^10 + x^11 = 0" \
"1 * x^0 + 0 * x^1 + 0 * x^2 + 0 * x^3 + 0 * x^4 + 0 * x^5 + 0 * x^6 + 0 * x^7 + 0 * x^8 + 0 * x^9 + 0 * x^10 + 1 * x^11 = 0" \
"x^8 + 0 * x^9 = 3 * x^0")

echo -e "${purpleColor}------------------------------------TEST STARTED [quadratic+ equation cases]------------------------------------\n"

for t in ${!testQuadraticEquation[*]}
do
    echo -e "${purpleColor}Test: [${testQuadraticEquation[$t]}]$neutralColor"
    node index.js "${testQuadraticEquation[$t]}"
    echo -e "${blueColor}----------------------------------------------------------------\n"
done

testSubjectList=(
"5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0" \
"5 * X^0 + 4 * X^1 = 4 * X^0" \
"8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 3 * X^0" \
"42 * X^0 = 42 * X^0" \
"5 * X^0 = 5 * X^0" \
"4 * X^0 = 8 * X^0" \
"5 * X^0 = 4 * X^0 + 7 * X^1" \
"5 * X^0 + 13 * X^1 + 3 * X^2 = 1 * X^0 + 1 * X^1" \
"6 * X^0 + 11 * X^1 + 5 * X^2 = 1 * X^0 + 1 * X^1" \
"5 * X^0 + 3 * X^1 + 3 * X^2 = 1 * X^0 + 0 * X^1")

echo -e "${purpleColor}------------------------------------TEST STARTED [from subject equation cases]------------------------------------\n"

for t in ${!testSubjectList[*]}
do
    echo -e "${purpleColor}Test: [${testSubjectList[$t]}]$neutralColor"
    node index.js "${testSubjectList[$t]}"
    echo -e "${blueColor}----------------------------------------------------------------\n"
done
