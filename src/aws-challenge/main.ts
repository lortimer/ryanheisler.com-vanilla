export function findValidCredentials(primaryCode: string, backupCode: string): Result {
    /**
     * There are (2^n - 1) subsequences for any given string containing only unique characters.
     *   Basically, each character is present or not, so you count it like a binary number.
     *   You subtract one because empty string is not a valid subsequence in this exercise
     *
     * (2^n - 1) is the same as 2^(n-1) for each unique substring of primary including itself
     *   if primary is 4 characters long, there are 2^4 - 1 or 15 unique subsequences
     *   2^3 + 2^2 + 2^1 + 2^0 also equals 15
     *
     * That means we can recursively call our function with "primary", then "rimary", then "imary", etc.
     * and add all the counts together to get the final count
     *
     * That only works if all of primary's letters are lexicographically greater than the first
     * character of backup. If not, we have to look more closely.
     *   If the first character of primary is less than the first of backup, we don't count anything
     *
     *   If it's equal, then we don't count anything for this character, but we need to move to the
     *   next character of primary AND backup to see how they differ and count from there. We do this
     *   by recursively calling our function with "rimary" and "ackup"
     *
     * TODO: Optimizations
     * 1. If there's a repeated character, it will reduce the number of unique subsequences by
     *   a predictable amount, you can probably optimize to not repeat the work
     */

    const firstPrimaryValue = primaryCode.charCodeAt(0);
    const firstBackupValue = backupCode.charCodeAt(0);
    let count: number;

    if (firstPrimaryValue < firstBackupValue) { // || isNaN(firstPrimaryValue)
        /**
         * if this character is smaller than the first character of the backup code,
         * we can skip it - none of the subsequences starting with this character will be larger
         */
        count = 0;
    } else if (firstPrimaryValue > firstBackupValue) {
        /**
         * if this character is larger than the first character of the backup code
         * we can count all of the subsequences starting with this character, they're all larger
         */

        count = 2 ** (primaryCode.length - 1);
    } else {
        /**
         * this character is the same as the first character of the backup code, so we get the count
         * for findValidCredentials(primary[1:], backup[1:]
         * This will repeat until it finds a difference. If primary is greater, it'll count from there,
         * If secondary is greater, it'll just skip.
         */
        const nextPrimary = primaryCode.slice(1) || primaryCode;
        const nextBackup = backupCode.slice(1) || backupCode;

        if (primaryCode.length > 1 && backupCode.length > 1) {
            count = findValidCredentials(nextPrimary, nextBackup).numberOfSubstrings;
        } else if (primaryCode.length > 1) {
            count = 2 ** (nextPrimary.length - 1);
        } else {
            count = 0;
        }
    }

    if (primaryCode.length > 1 && backupCode.length >= 1) {
        return new Result(count + findValidCredentials(primaryCode.slice(1), backupCode).numberOfSubstrings);
    } else {
        return new Result(count);
    }
}

export class Result {
    numberOfSubstrings: number;
    modulo: number;

    constructor(numberOfSubstrings: number) {
        this.numberOfSubstrings = numberOfSubstrings;
        this.modulo = numberOfSubstrings;
    }
}