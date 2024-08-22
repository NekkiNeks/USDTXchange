export function nonEmptyMessage(key: string) {
  return `Поле ${key} является обязательным.`;
}

export function typeMessage(key: string, type: string) {
  return `Поле ${key} должно иметь тип ${type}.`;
}

export function enumMessage(key: string, variants: Record<string, string>) {
  return Object.keys(variants).join(' | ');
}
