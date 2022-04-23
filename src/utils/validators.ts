const minLength = (min: number) => {
    return (input: string) => input.length < min
        ? `Value must be at least ${min} characters`
        : null;
}

const isEmail = (input: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(input)
        ? null
        : "Must be a valid email address";
}

const isPositiveNumber = (input: number) =>
    input > 0
        ? null
        : 'Must be positive number'

const isNoNegativeNumber = (input: number) =>
    input >= 0
        ? null
        : 'Must be positive number or zero'

export {minLength, isEmail, isPositiveNumber, isNoNegativeNumber}
