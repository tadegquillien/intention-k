// This component displays the instructions
// Technically it is several components (one for each page), nested within one big component
// (there migth be more elegant ways to handle this).

// import external components and methods
import { textStyle, buttonStyle } from './dimensions';
import { useState, useEffect } from 'react';
import intro_pic from './intro_pic.svg';
import Data from './Data';
import './instructions.css';

// the main component
const Instructions = (props) => {
    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    //the props we will pass on to each page
    const tutorialProps = {
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
    };



    //the list of pages (add more as you see fit)
    const instructionTrials = [
        <TaskTutorialOne {...tutorialProps} />,
        <TaskTutorialTwo {...tutorialProps} />
        //<TaskTutorialThree {...tutorialProps} />,
        //<TaskTutorialFour {...tutorialProps} />,
        //<TaskTutorialFive {...tutorialProps} />,
        // etc
    ]
    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

const TaskTutorialOne = (props) => {

    const handleClick = () => {
        props.incrementTrial()
    };

    const warning =<p style={{color:'red'}}>Please do not refresh the page while taking the study.
     You would be unable to complete the experiment.</p>
    const text = <div>
        <p>Thank you for taking part in our study!</p>
        <p>You will read a simple story, and tell us what you think about what happened.</p>
        </div>;


    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>

    return (
        <div style={textStyle}>
            {warning}
            {text}
            {nextPageButton}
        </div>
    )

}

const TaskTutorialTwo = (props) => {

    useEffect(() => {
        // go to top of the screen
        window.scrollTo(0, 0);
      }, []); 
    
    const [likely, setLikely] = useState(0);
    const [guaranteed, setGuaranteed] = useState(0);

    const handleClick = () => {
        Data.compQuestions.push({
            likely: likely,
            guaranteed: guaranteed
        });
        //console.log(Data);
        props.setCurrentPhase("transition");
    };

    const handleLikely = (e) => {
        setLikely(e.target.value);
    };

    const handleGuaranteed = (e) => {
        setGuaranteed(e.target.value);
    };


    const text = <div>
            <p>Before we start the task, please take a moment to answer a few questions.
                Suppose a ball is selected at random from the container below:
    </p>
    
    </div>

    const pic = <img style={{width:'20vw', height:'auto'}} src={intro_pic}/>

    const questions = <form>
        <label for="likely">What is most likely? </label>

        <select name="likely" id="likely" onChange={(e) => handleLikely(e)}>
            <option value="NA">  </option>
            <option value="green">A green ball will be selected</option>
            <option value="purple">A purple ball will be selected</option>
            <option value="both">Both outcomes are equally likely</option>
        </select>
        <br></br>
        <label for="guaranteed">Can the outcome be predicted with 100% certainty? </label>

        <select name="guaranteed" id="guaranteed" onChange={(e) => handleGuaranteed(e)}>
            <option value="NA">  </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>
        <br></br>
        <br></br>
    </form>;

    const buttonViz = (likely===0 | guaranteed===0) ? 'hidden' : 'visible';
    const nextPageButton = <button style={{...buttonStyle, visibility: buttonViz}} 
    onClick={() => handleClick()}>Click here to start the task</button>

    return (
        <div style={textStyle}>
            {text}
            {pic}
            {questions}
            {nextPageButton}
        </div>
    )

}


export default Instructions;