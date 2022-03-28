export const getItemHeight = <T>(
    i: number,
    itemHeight: number | ((item: T) => number),
    item: T
) => {
    if (typeof itemHeight === "number") {
        return (i + 1) * itemHeight;
    }
    return itemHeight(item);
};

export const getItemOffsetBottom = <T>(
    i: number,
    data: T[],
    itemHeight: number | ((item: T) => number)
) => {
    if (typeof itemHeight === "number") {
        return (i + 1) * itemHeight;
    }
    console.log(i)
    return data
        .slice(0, i + 1)
        .reduce((sum, curItem) => sum + itemHeight(curItem), 0);
};

export const getItemOffsetTop = <T>(
    i: number,
    data: T[],
    itemHeight: number | ((item: T) => number)
) => {
    return getItemOffsetBottom(i - 1, data, itemHeight);
};

export const getFullListHeight = <T>(
    data: T[],
    itemHeight: number | ((item: T) => number)
) => {
    return getItemOffsetBottom(data.length - 1, data, itemHeight);
};