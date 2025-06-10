export const getGeneratorFromArray = <T>(values: T[]): Generator<T> => {
    function* generator() {
        for (const value of values) {
            yield value;
        }
    }

    return generator();
};
