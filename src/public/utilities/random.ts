/**
 * returns a random integer between `from` and `through` inclusive of both
 *
 * randomInteger(3,7) could return 3, 4, 5, 6, or 7
 *
 * @param from beginning of range, inclusive
 * @param through end of range, inclusive
 * @return {number}
 */
export const randomInteger = (from: number, through: number): number => {
    if (from < through) {
        const range = through - from;
        return Math.floor((Math.random() * (range + 1)) + from);
    }

    const errorMessage = `randomInteger requires first parameter 'from' (${from}) to be less than second parameter 'through' (${through})`;
    throw new SyntaxError(errorMessage);
};
