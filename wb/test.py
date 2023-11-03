from whiteboard import solution
from unittest import TestCase, main


class NumberSummerTest(TestCase):

    def test_one_sum(self):
        self.assertEqual(solution(123), 6)

    def test_two_sum(self):
        self.assertEqual(solution(189), 9)

    def test_three_sum(self):
        self.assertEqual(solution(39872), 2)

    def test_one_sum_2(self):
        self.assertEqual(solution(22), 4)

    def test_single_digit(self):
        self.assertEqual(solution(2), 2)

if __name__ == '__main__':
    main()