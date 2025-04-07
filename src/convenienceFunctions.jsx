// A set of potentially useful functions


//randomly shuffles an array
export const shuffle = (unshuffled) => {
    const new_array = unshuffled.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    return new_array;

}

//a function computing the mode of an array
export const mostCommon = (arr) => {

    let arr_copy = arr.map((i) => {
        return (i)
    })
    return arr_copy.sort((a, b) =>
        arr_copy.filter(v => v === a).length
        - arr_copy.filter(v => v === b).length
    ).pop();
}

//computes the number of elements in an array, if one eliminated the duplicates
const sizeUnique = (array) => {
    return ([...new Set(array)].length)
}

//order elements in an array by their frequencies
export const orderByFrequency = (arr) => {
    let arr_copy = arr.map((i) => {
        return (i)
    });
    let arr_to_fill = Array.from(Array(sizeUnique(arr_copy)).keys());
    return (arr_to_fill.map((i) => {
        let mode = mostCommon(arr_copy);
        arr_copy = arr_copy.filter((a) => a != mode);
        return (mode);
    }))

}

// sample a random integer between min and max
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}