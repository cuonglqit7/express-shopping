export const generateRandomTextByLength = (num: number) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < chars.length; i++) {
        if (result.length <= (num ? num : 10)) {
            const str = chars[Math.floor(Math.random() * chars.length)];
            result += str;
        }
    }

    return result.toLocaleUpperCase();
};
