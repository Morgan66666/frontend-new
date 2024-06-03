// src/utils/timeUtil.ts

/**
 * 将时间戳转换为 ISO 格式字符串
 * @param timestamp - 时间戳（毫秒）
 * @returns ISO 格式字符串
 */
export const convertToISO = (timestamp: number): string => {
  return new Date(timestamp).toISOString(); // 时间戳是毫秒
};

/**
 * 将 ISO 格式字符串转换为本地时间字符串
 * @param isoString - ISO 格式字符串
 * @returns 本地时间字符串
 */
export const convertISOToLocal = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

/**
 * 将时间戳转换为本地时间字符串
 * @param timestamp - 时间戳（毫秒）
 * @returns 本地时间字符串
 */
export const convertTimestampToLocal = (timestamp: string|number): string => {
  const date = new Date(timestamp); // 时间戳是毫秒
  return date.toLocaleString();
};

/**
 * 将本地时间字符串转换为 ISO 格式字符串
 * @param localString - 本地时间字符串
 * @returns ISO 格式字符串
 */
export const convertLocalToISO = (localString: string): string => {
  const date = new Date(localString);
  return date.toISOString();
};

/**
 * 将 ISO 格式字符串转换为时间戳
 * @param isoString - ISO 格式字符串
 * @returns 时间戳（毫秒）
 */
export const convertISOToTimestamp = (isoString: string): number => {
  const date = new Date(isoString);
  return date.getTime();
};

/**
 * 将本地时间字符串转换为时间戳
 * @param localString - 本地时间字符串
 * @returns 时间戳（毫秒）
 */
export const convertLocalToTimestamp = (localString: string): number => {
  const date = new Date(localString);
  return date.getTime();
};

export function isValidTimestamp(value: any): boolean {
  // 尝试将字符串转换为数字
  const timestamp = typeof value === 'string' ? Number(value) : value;


  // 检查转换后的值是否为数字类型
  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    return false;
  }

  // 检查是否为整数
  if (!Number.isInteger(timestamp)) {
    return false;
  }

  // 检查是否为合理范围内的时间戳（从1970年1月1日到当前时间的毫秒数）
  const minTimestamp = 0;

  return timestamp >= minTimestamp;
}
