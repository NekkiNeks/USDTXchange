/**
 * Данная функция позволяет конструировать текст ошибки для декоратора `@IsNotEmpty`
 * @param key Название поля
 * @returns Строка с описанием ошибки
 */
export function nonEmptyMessage(key: string) {
  return `Поле ${key} является обязательным.`;
}

/**
 * Данная функция позволяет конструировать текст ошибки для декораторов типов, таких как `@IsString` или `@IsNumber`.
 * @param key Название поля
 * @param type Название ожидаемого типа
 * @returns Строка с описанием ошибки
 */
export function typeMessage(key: string, type: string) {
  return `Поле ${key} должно иметь тип ${type}.`;
}

/**
 * Данная функция позволяет конструировать текст ошибки для декоратора `@IsEnum()`
 * @param key Название поля
 * @param variants Enum или Object, описывающий доступные варианты
 * @returns Строка с описанием ошибки
 */
export function enumMessage(key: string, variants: Record<string, string>) {
  const variantsString = Object.keys(variants).join(' | ');
  return `Поле ${key} должно иметь одно из значений: ${variantsString}`;
}
