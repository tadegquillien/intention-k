//this object records the participant data

import { questionOrder } from "./randomized-parameters";

const Data = {
  //the participant's Prolific ID
  prolificId: [],
  // the comprehension questions
  compQuestions: [],
  // question order
  questionOrder: questionOrder,
  // the attention check during the instructions trial
  attnCheck: [],
  //the data describing a particular trial
  trialData: [],
  //our main DV
  responses: [],
  //the free-form comment 
  freeComment: [],
  //the answers to demographic questions
  demographics: []
};

export default Data;