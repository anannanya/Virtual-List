export const getItemHeight = <T>(
    i: number,
    itemHeight: number | ((item: T, i: number) => number),
    item: T
) => {
    if (typeof itemHeight === "number") {
        return (i + 1) * itemHeight;
    }
    return itemHeight(item, i);
};

export const getItemOffsetBottom = <T>(
    i: number,
    data: T[],
    itemHeight: number | ((item: T, i: number) => number)
) => {
    if (typeof itemHeight === "number") {
        return (i + 1) * itemHeight;
    }
    return data
        .slice(0, i + 1)
        .reduce((sum, curItem, idx) => sum + itemHeight(curItem, idx), 0);
};

export const getItemOffsetTop = <T>(
    i: number,
    data: T[],
    itemHeight: number | ((item: T, i: number) => number)
) => {
    return getItemOffsetBottom(i - 1, data, itemHeight);
};

export const getFullListHeight = <T>(
    data: T[],
    itemHeight: number | ((item: T, i: number) => number)
) => {
    return getItemOffsetBottom(data.length - 1, data, itemHeight);
};