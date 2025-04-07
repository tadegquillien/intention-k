// This component displays the instructions
// Technically it is several components (one for each page), nested within one big component
// (there migth be more elegant ways to handle this).

// import external components and methods
import { textStyle, buttonStyle } from './dimensions';
import { useState, useEffect } from 'react';
import instpicture from './instructions picture.svg';
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
        <p>You will read a few simple stories, and tell us what you think about what happened.</p>
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
            <p>There is a machine that distributes gumballs.
                 It contains two types of gumballs: <span style={{color:'green'}}><b>green</b></span> and <span style={{color:'purple'}}><b>purple</b></span>.</p>
                 <p>The machine has two containers: one container has mostly <span style={{color:'green'}}><b>green</b></span> gumballs, the other has mostly <span style={{color:'purple'}}><b>purple</b></span> gumballs.</p>
    <p>If the user wants a gumball, they need to press a button. If you press the button labeled 'G', you get a gumball selected at random from the machine that has mostly <span style={{color:'green'}}><b>green</b></span> gumballs.
        If you press the 'P' button, you get a gumball selected at random from the machine with mostly <span style={{color:'purple'}}><b>purple</b></span> gumballs.
    </p>
    
    </div>

    const pic = <img style={{width:'60vw', height:'auto'}} src={instpicture}/>

    const mixupText = <p>Sometimes there are mix-ups and the machine selects a gumball from the wrong container. But most of the time the machine works correctly.</p>

    const questionsIntro = <p>Please answer a few questions to make sure you understand:</p>

    const questions = <form>
        <label for="likely">If the user presses the 'G' button, what is most likely? </label>

        <select name="likely" id="likely" onChange={(e) => handleLikely(e)}>
            <option value="NA">  </option>
            <option value="green">They will get a green gumball</option>
            <option value="purple">They will get a purple gumball</option>
            <option value="both">Both outcomes are equally likely</option>
        </select>
        <br></br>
        <label for="guaranteed">Users are guaranteed to get a gumball of the color they want. </label>

        <select name="guaranteed" id="guaranteed" onChange={(e) => handleGuaranteed(e)}>
            <option value="NA">  </option>
            <option value="true">True</option>
            <option value="false">False</option>
            <option value="notenough">Not enough information given</option>
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
            {mixupText}
            {questionsIntro}
            {questions}
            {nextPageButton}
        </div>
    )

}


export default Instructions;