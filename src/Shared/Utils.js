export const howManyDecimals = (numberOfDecimals, value) => {
    if (numberOfDecimals) {
        // specified decimals already
        return numberOfDecimals;
    }
    if (value >= 1) {
        return 2;
    }
    if (Number(value.toFixed(6)) === 0) {
        return 9;
    }
    return 6;
};

export const getFormattedAmount = (
    value = "",
    shouldFormat = true,
    numberOfDecimals
) => {
    if (shouldFormat) {
        return value.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: howManyDecimals(numberOfDecimals, value),
        });
    }
    return Number(
        Number(value).toFixed(howManyDecimals(numberOfDecimals, value))
    );
};
