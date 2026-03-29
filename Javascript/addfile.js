export const setValue = (limit) => {
    const settingVal = Math.ceil(Math.random() * limit);
    return settingVal;
}

export function takeValue(lm) {
    const settingVal = Math.ceil(Math.random() * lm);
    return settingVal;
}