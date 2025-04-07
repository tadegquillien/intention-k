// This code provides a template for how to build a psychology experiment in React

// The experiment structure that this code implements is the following:
// -a screen allowing the participant to enter their Prolific Id
// -Consent Form
// -Instructions
// -Training Phase
// -Transition
// -Test Phase
// -Demographics
// -Ending

// Of course not all experiments will follow this exact structure, but this code gives you an
// example of how one can organize experiment structure. You can adapt the code accordingly depending
// on the particular structure of your experiment.

// import relevant files and components
import './App.css';
import { useState } from 'react';
import { trainingItems, testItems } from './randomized-parameters';
import ProlificId from './ProlificId';
import ConsentForm from './ConsentForm';
import Instructions from './Instructions';
import TrainingPhase from './TrainingPhase';
import Transition from './Transition'
import TestPhase from './TestPhase';
import Demographics from './Demographics';
import Ending from './Ending';





 const App =() => {

  //keeps track of the current phase
  const [currentPhase, setCurrentPhase] = useState("prolificId");
  //keeps track of the current trial, for the Training phase
  const [trainingNumber, setTrainingNumber] = useState(0);
  //keeps track of the current trial, for the Test phase
  const [testNumber, setTestNumber] = useState(0);


  //increment the trial number, in the Test phase
  const incrementTest = (integer) => setTestNumber(integer + 1);
  // increment the trial number, in the Training phase
  const incrementTraining = (integer) => setTrainingNumber(integer + 1);


  // create an array with the id numbers of the training phase trials 
  const training_ids = Array.from(Array(trainingItems.length).keys());

  // create an array with the id numbers of the test phase trials
  const test_ids = Array.from(Array(testItems.length).keys());

  // generate the trials of the Training phase
  // (this creates an array, where each element is an instance of the component. 
  // I.e. there is one instance of the component per trial)
  var trainings = training_ids.map((i) => {
    return (
      <TrainingPhase key={i} training_ids={training_ids} phase={currentPhase}
        incrementTraining={incrementTraining} trainingNumber={trainingNumber}
      />
    )
  });

  //generate the trials of the Test phase
  // (this creates an array, where each element is an instance of the component. 
  // I.e. there is one instance of the component per trial)
  var tests = test_ids.map((i) => {
    return (
      <TestPhase key={i} incrementTest={incrementTest}
        test_ids={test_ids} phase={currentPhase} testNumber={testNumber}
        testData={testItems[i]}
      />
    )
  });


  // this code is responsible for displaying the current page to the user.
  // Basically this is a giant if-else command, that checks the current value of the
  // currentPhase variable, as well as the current trial number within that phase,
  // and returns the current page accordingly


  return (
    currentPhase === "prolificId" ? <ProlificId setCurrentPhase={setCurrentPhase} /> :
      currentPhase === "consentForm" ? <ConsentForm setCurrentPhase={setCurrentPhase} /> :
        currentPhase === "instructions" ? <Instructions setCurrentPhase={setCurrentPhase} /> :
          // currentPhase === "training" ? ((trainingNumber + 1) > training_ids.length ?
          //   setCurrentPhase("transition") : trainings[trainingNumber]) :
            currentPhase === "transition" ? <Transition setCurrentPhase={setCurrentPhase} /> :
              currentPhase === "test" ? ((testNumber + 1) > test_ids.length ?
                setCurrentPhase("demographics") : tests[testNumber]) :
                currentPhase === "demographics" ? <Demographics setCurrentPhase={setCurrentPhase} /> :
                  currentPhase === "ending" ? <Ending /> :
                    <p>{currentPhase}</p>
  )

}



export default App;
