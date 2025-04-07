
import { useState, useEffect } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { questionOrder } from './randomized-parameters';
import Likert from 'react-likert-scale';
import { likertChoicesTest } from './likertScale';
import normal from './normal.svg';
import deviant from './deviant.svg';

import Data from './Data';

const TestPhase = (props) => {

    // import some relevant props
    const testData = props.testData;
    const name=testData.name;
    const process=testData.process;
    const knowledge=testData.knowledge;

    // initialize variables
    const [responseIntentionality, setResponseIntentionality] = useState(0);
    const [responseCausation, setResponseCausation] = useState(0);
    const [responseProbRaising, setResponseProbRaising] = useState(0);
    const [responseKnowHow, setResponseKnowHow] = useState(0);
    const [displayButton, setDisplayButton] = useState(0);
    

    useEffect(() => {
        // go to top of the screen
            window.scrollTo(0, 0);
        }, []); 


    const handleClick = () => {
        // stores relevant data to the Data object
        // (you should replace '42' with the relevant data to be exported)
        Data.responses.push({
            trialNumber: props.testNumber,
            intentionality: responseIntentionality,
            causation: responseCausation,
            probRaising: responseProbRaising,
            knowHow: responseKnowHow
        })
        Data.trialData.push({
            trialNumber: props.testNumber,
            knowledge: knowledge,
            process: process,
            name: name
        })
        //console.log(Data);
        // increment the trial number so as to go to the next trial
        props.incrementTest(props.testNumber)
    }

    // is the reminder text at the top visible
    const reminderViz = props.testNumber === 0 ? 'hidden' : 'visible';
    // reminder text
    // note that throughout we use testNumber % 2 to compute whether we are in the intentionality question
    // trial (testNumber is even) or the 'other questions' trial (testNumber is odd)
    const textreminder = props.testNumber % 2 ? <p style={{visibility: reminderViz}}>(We have
     a few more questions about {name}---here is a reminder about what happened.)</p> :
     <p style={{visibility: reminderViz}}>(The following information is about another user of the gumball machine.)</p>;
    
    // text displaying information about what happens in the story

    const textknowledge = <p>{name} {knowledge === 1 ? <b>knows</b> :
    knowledge === 0 ? <b>does NOT know</b> : NaN } what the buttons do. She wants a <span style={{color:'green'}}><b>green</b></span> gumball.</p>;

    const textchoice = 
    <p>{knowledge===1 ? <span>Because she knows how the buttons work, {name} </span> : 
        knowledge===0 ? <span>{name} chooses a button at random: she </span> : NaN} 
    presses the 'G' button. </p>
    const textprocess = <p>{process==='normal' ? <span>The button works normally</span> :
    process==='deviant' ? <span>There is a mix-up</span> : NaN}, and the machine selects randomly
     from the container with mostly {process==='normal' ? <span style={{color:'green'}}><b>green</b></span> : 
     process === 'deviant' ? <span style={{color:'purple'}}><b>purple</b></span> : NaN} gumballs.</p>
    const textoutcome = <p>{name} gets a <span style={{color:'green'}}><b>green</b></span> gumball.</p>;
    
    // the picture
    const pic = process === 'normal' ?
    <img style={{width:'60vw', height:'auto'}} src={normal}/> :
    process === 'deviant' ? 
    <img style={{width:'60vw', height:'auto'}} src={deviant}/> : NaN;


    //the likert scale for each question

    const likertOptionsIntentionality =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseIntentionality(val.value);
            setDisplayButton(true);
        },
        id: 'questionIntentionality',
    };

    const likertOptionsCausation =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseCausation(val.value);
            setDisplayButton(true);
        },
        id: 'questionCausation',
    };

    const likertOptionsProbRaising =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseProbRaising(val.value);
            setDisplayButton(true);
        },
        id: 'questionProbRaising',
    };

    const likertOptionsKnowHow =  {
        question: "",
        responses: likertChoicesTest,
        //keeps track of the last response by the participant
        onChange: val => {
            setResponseKnowHow(val.value);
            setDisplayButton(true);
        },
        id: 'questionKnowHow',
    };

     //the intentionality question 
    const intentionalityQuestion = <span>
    {/* <p>Please tell us how much you agree with the following statement:</p> */}
    <h4>{name} intentionally got a green gumball.</h4>
    <span><Likert {...likertOptionsIntentionality} /></span>
    </span>;

    const questionIntro = <p>Please tell us how much you agree with the following
         statement{props.testNumber % 2 ? 's' : ''}:</p>;

    const causationQuestion =  <span>
    <h4>{name} got a green gumball because she wanted to get a green gumball.</h4>
    <span><Likert {...likertOptionsCausation} /></span>
    </span>;

    const knowHowQuestion = <span>
    <h4>{name} knows how to get a green gumball.</h4>
    <span><Likert {...likertOptionsKnowHow} /></span>
    </span>;

    const probRaisingQuestion =  <span>
    <h4>Pushing the 'G' button increased the probability of {name} getting a green gumball.</h4>
    <span><Likert {...likertOptionsProbRaising} /></span>
    </span>;

    // creates an array with the causation, probability-raising and know-how questions
    // (order randomized between participants, constant within participant)
    const otherQuestions = [0,1,2].map((i)=>{
        let q = questionOrder[i];
        return(
            q==='causation' ? causationQuestion :
            q==='probRaising' ? probRaisingQuestion :
            q==='knowHow' ? knowHowQuestion : NaN
        )
    })

    // compute which question(s) to display
    const questions = props.testNumber % 2 ? otherQuestions 
      : intentionalityQuestion;

    // control when to display the Next-Page button
    const nextPageViz = props.testNumber % 2 ? 
    (responseCausation===0|responseKnowHow===0|responseProbRaising===0 ? 'hidden' : 'visible') :
    (displayButton ? 'visible' : 'hidden');

    // next-page button
    const nextPageButton = <button style={{...buttonStyle, visibility: nextPageViz}} onClick={() => handleClick()}>Next</button>;

    return (
        <div style={textStyle}>
            {textreminder}
            {textknowledge}
            {textchoice}
            {textprocess}
            {pic}
            {textoutcome}
            {questionIntro}
            {questions}
            {nextPageButton}
        </div>

    )
}

export default TestPhase;