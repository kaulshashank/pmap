const remove = (array, cb) => {
    for (let i = 0; i <= array.length; ++i) {
        const toRemove = Boolean(cb(array[i], i, array));
        if (!toRemove) array.splice(i, 1);
    }
    return array;
}

async function map(input, mapper, concurrency) {
    let idx = 0;
    const array = [];
    const promises = [];
    while (array.length !== input.length) {
        if (promises.length >= concurrency || idx >= input.length) {
            const resolved = await Promise.all(promises);
            array.push(...resolved);
        }
        if (idx >= input.length) continue;
        const item = input[idx];
        const promise = mapper(item, idx).then(result => {
            remove(promises, prm => prm === promise);
            return result;
        })
        promises.push(
            promise
        );
        idx++;
    }
    return array;
}

module.exports = map;
