import { Transform } from 'class-transformer';

export function TransformCPF() {
  return Transform(({ value }) => {
    console.log('AOBA')
    if (typeof value === 'string') {
      return value.replace(/\D/g, '');
    }
    return value;
  });
}