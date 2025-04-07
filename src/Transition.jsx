import { textStyle, buttonStyle } from './dimensions';

const Transition = (props) => {

    const handleClick = () => {
        props.setCurrentPhase("test")
    }

    const text = <p>You will see four different people use the gumball machine. For each person, we will ask you a few questions about what you think. Please try to stay focused throughout the task!</p>;
    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Start the study</button>;

    return (
        <div style={textStyle}>
            {text}
            {nextPageButton}
        </div>

    )
}

export default Transition;