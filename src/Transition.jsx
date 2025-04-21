import { textStyle, buttonStyle } from './dimensions';

const Transition = (props) => {

    const handleClick = () => {
        props.setCurrentPhase("test")
    }

    const text = <p>You will now read a simple story and tell us what you think about what happened. </p>;
    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Start the study</button>;

    return (
        <div style={textStyle}>
            {text}
            {nextPageButton}
        </div>

    )
}

export default Transition;