# Write a Python program to add the digits of a positive integer 
# repeatedly until the result has a single digit.


# EX
# Input:
n1=48
# 4+8=12
# 1+2=3
# Output:
# 3

# Input
n2=59
# Output
# 5

def solution(num):
    while len(str(num)) > 1:
        total = 0
        for digit in str(num):
            total += int(digit)
        num = total
    return num


def solution(num):
    if len(str(num)) == 1:
        return num  
    else:
        return solution(sum([int(digit) for digit in str(num)]))

def solution(num):
    return num if len(str(num)) == 1 else solution(sum([int(digit) for digit in str(num)]))
