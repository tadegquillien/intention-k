
import { useState, useEffect } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { questionOrder } from './randomized-parameters';
import Likert from 'react-likert-scale';
import { likertChoicesTest } from './likertScale';
import kraemer_a from './kraemer_a.svg';
import kraemer_b from './kraemer_b.svg';

import Data from './Data';

const TestPhase = (props) => {

    // import some relevant props
    const testData = props.testData;
    const name=testData.name;
    const dv=testData.dv;
    

    // initialize variables
    const [responseIntentionality, setResponseIntentionality] = useState(0);
    const [responseCausation, setResponseCausation] = useState(0);
    const [responseKnowHow, setResponseKnowHow] = useState(0);
    const [responseProbRaising, setResponseProbRaising] = useState(0);
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
            knowHow: responseKnowHow,
            probRaising: responseProbRaising,
            condition: dv
        })
        Data.trialData.push({
            trialNumber: props.testNumber,
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

    const text1 = <div >
        <p>Sally is a contestant on a game show. In the game, Sally is given the opportunity to push a button. 
         If she pushes the button, a machine will select a ball at random from a container. 
        </p>
        <p>The container has a lot of <span style={{color:'purple'}}><b>purple</b></span> balls and only a few <span style={{color:'green'}}><b>green</b></span> balls. 
        If Sally gets a <span style={{color:'green'}}><b>green</b></span> ball, she wins a brand new <b>car</b>. If she gets a <span style={{color:'purple'}}><b>purple</b></span> ball, she wins nothing.</p>
    </div>;

    // the picture
    const pic_a = 
    <img style={{width:'20vw', height:'auto'}} src={kraemer_a}/>;

    const text2 = <div>
        <p>Sally knows that she will get a brand new <b>car</b> if she gets a <span style={{color:'green'}}><b>green</b></span> ball. 
        She really wants to win the <b>car</b>, so she really wants to get a <span style={{color:'green'}}><b>green</b></span> ball.<br></br>
             Sally pushes the button. The machine selects a ball at random. To {name}'s great satisfaction, 
             it is a <span style={{color:'green'}}><b>green</b></span> ball, and she wins the <b>car</b>!<br></br></p>
    </div>;


    const pic_b = 
    <img style={{width:'40vw', height:'auto'}} src={kraemer_b}/>;

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

     //the intentionality question 
    const intentionalityQuestion = <span>
    {/* <p>Please tell us how much you agree with the following statement:</p> */}
    <h4>{name} intentionally {dv==='means' ? 'got a green ball.' : dv==='ends' ? 'won the car.' : NaN}</h4>
    <span><Likert {...likertOptionsIntentionality} /></span>
    </span>;

    const questionIntro = <p>Please tell us how much you agree with the following
         statement{props.testNumber % 2 ? 's' : ''}:</p>;

    const causationQuestion =  <span>
    <h4>{name} {dv==='means' ? 'got a green ball' : dv==='ends' ? 'won the car' : NaN} because she wanted to {dv==='means' ? 'get a green ball.' : dv==='ends' ? 'win the car.' : NaN}</h4>
    <span><Likert {...likertOptionsCausation} /></span>
    </span>;

    const knowHowQuestion = <span>
    <h4>{name} knows how to {dv==='means' ? 'get a green ball.' : dv==='ends' ? 'win the car.' : NaN}</h4>
    <span><Likert {...likertOptionsKnowHow} /></span>
    </span>;

    const probRaisingQuestion = <span>
    <h4>Pushing the button increased the probability of {name} {dv==='means' ? 'getting a green ball.' : dv==='ends' ? 'winning the car.' : NaN}</h4>
    <span><Likert {...likertOptionsProbRaising} /></span>
    </span>;

    // creates an array with the causation, probability-raising and know-how questions
    // (order randomized between participants, constant within participant)
    const otherQuestions = [0,1,2].map((i)=>{
        let q = questionOrder[i];
        return(
            q==='causation' ? causationQuestion :
            q==='knowHow' ? knowHowQuestion : 
            q==='probRaising' ? probRaisingQuestion :
            NaN
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
            {text1}
            {pic_a}
            {text2}
            {pic_b}
            {questionIntro}
            {questions}
            {nextPageButton}
        </div>

    )
}

export default TestPhase;