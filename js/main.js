/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 *
 * @param {number} min Целое число, начало диапазона. Обратите внимание число должно быть большие или равно нуля!
 * @param {number} max Целое число, конец диапазона. Обратите внимание число должно быть больше нуля!
 * @return {number} Возвращает случайное число в заданном диапазоне. В случае если в параметрах передано отрицательное число, то функция вернет -1!
 */
function getRandomNumber(min, max){
  if(min < 0 || max < 0){
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Функция для проверки максимальной длины строки.
 *
 * @param {string} stroka Исходная строка для проверки.
 * @param {number} dlinna Целое число, максимальная длинна строки.
 * @return {boolean} Возвращет true, если строка проходит по длине, и false — если не проходит.
 */
function checkLengthString(stroka, dlinna){
  return stroka.length <= dlinna;
}
