// const arr = ['ab', 'a', 'c', 'z', 'b', 'd', 'e', 'f', 'g', 'j', 'h'];
//
// function sortCustom(a) {
//     const indexes = [];
//     const sortedArr = [...a];
//     sortedArr.sort();
//     sortedArr.forEach((element, i) => {
//         if (
//             String(element).toLowerCase() !== String(arr[i]).toLowerCase() &&
//             String(arr[i]).toLowerCase() < String(element).toLowerCase()
//         ) {
//             indexes.push(i);
//         }
//     });
//     console.log('arr', arr);
//     console.log('sortedArr', sortedArr);
//     console.log('indexes', indexes);
// }
// sortCustom(arr);

//trello 12678
const arr = [
    {   position: 1,
        title: "a"},

    {   position: 2,
        title: "c"},

    {   position: 3,
        title: "b"},

    {   position: 4,
        title: "d"},

    {   position: 5,
        title: "e"},

    {   position: 6,
        title: "f"},

    {   position: 7,
        title: "g"},

    {   position: 8,
        title: "j"},

    {   position: 9,
        title: "h"}];

function sortCustom(a) {
    const indexes = [];
    const sortedArr = [...a];

    sortedArr.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    console.log('arr',arr);
    console.log('sortedArr', sortedArr);


}
sortCustom(arr);
