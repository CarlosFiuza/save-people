import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function validateCPF(cpf: string): boolean {
    // Remove non-numeric characters
    cpf = cpf.replace(/\D/g, '');

    // Check if the CPF has 11 digits
    if (cpf.length !== 11) return false;

    // Check for repeated digits
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validate CPF digits
    const calculateDigit = (digits: string) => {
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            sum += parseInt(digits[i]) * (digits.length + 1 - i);
        }
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    const firstDigit = calculateDigit(cpf.slice(0, 9));
    if (firstDigit !== parseInt(cpf[9])) return false;

    const secondDigit = calculateDigit(cpf.slice(0, 10));
    if (secondDigit !== parseInt(cpf[10])) return false;

    return true;
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === 'string' && validateCPF(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'CPF inválido';
                },
            },
        });
    };
}