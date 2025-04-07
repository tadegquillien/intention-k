// The goal of this file is to randomize the elements that need to be randomized once and 
// presented in the same order all throughout the experiment

// We need this because if we randomize an element within a component, the element will be re-randomized
// every time the component refresh. By creating the element here and then exporting it to the relevant
// component, we avoid this issue.

// we import the shuffle function which will allow us to randomize arrays
import { shuffle } from './convenienceFunctions';



const names = shuffle(['Sally', 'Anna', 'Mary', 'Liz']);
const conditions = shuffle([
    [0, 'normal'],
    [0, 'deviant'],
    [1, 'normal'], 
    [1, 'deviant']
]);

export const testItems = Array.from(Array(names.length*2).keys()).map((i)=>{
    let trial = Math.floor(i/2)
    return({
        name: names[trial],
        process: conditions[trial][1],
        knowledge: conditions[trial][0]
    })
});

//console.log(testItems);

export const questionOrder = shuffle(['causation', 'probRaising', 'knowHow']);
// a randomized list of elements for the training and test phases
export const trainingItems = shuffle(['a', 'b', 'c', 'd']);
//export const testItems = Array.from(Array(names.length).keys())

