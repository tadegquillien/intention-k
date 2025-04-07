
import { textStyle, buttonStyle } from './dimensions';
import { trainingItems } from './randomized-parameters';
const TrainingPhase = (props) => {


    const handleClick = () => {
        // increment the training number so as to go to the next page
        props.incrementTraining(props.trainingNumber)
    }

    const text = <p>This is training trial number {props.trainingNumber}.
        The trial displays element {trainingItems[props.trainingNumber]}</p>;
    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>;

    return (
        <div style={textStyle}>
            {text}
            {nextPageButton}
        </div>

    )
}

export default TrainingPhase;