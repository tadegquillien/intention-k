
//the consent form, accessed at the start of the experiment

import { buttonStyle } from './dimensions';

const consentStyle = {
    marginLeft: "20vw",
    marginRight: "20vw"
}

const ConsentForm = (props) => {
    return (
        <div style={consentStyle}>
            <h1>Participant Information Sheet</h1>

<p>This document explains what kind of study we’re doing, what your rights are, and what will be done with your data. You should print this page for your records.</p>

<h2>Nature of the study</h2>
<p>You are invited to participate in a study which involves observing, interacting with, and making judgments about simple stimuli on a web-based interface. Once you finish, we may have some questions about you and feedback about how you approached the task. Your responses will be recorded. You will be given full instructions shortly.</p>

<h2>Compensation</h2>
<p>You will be paid for your participation in this study in accordance with the study description on Prolific.</p>

<h2>Risks and benefits</h2>
<p>There are no known risks to participation in this study. Other than the payment mentioned, there are no tangible benefits to you, however you will be contributing to our knowledge about human cognition.</p>

<h2>Confidentiality and use of data</h2>
<p>All the information we collect during the course of the research will be processed in accordance with Data Protection Law. In order to safeguard your privacy, we will never share personal information (like names or dates of birth) with anyone outside the research team. Your data will be referred to by a unique participant number rather than by name. Please note that we will temporarily collect your Prolific ID to prevent repeat participation, however we will never share this information with anyone outside the research team.</p>
<p>We will store any personal data (e.g., audio/video recordings, signed forms) using the University of Edinburgh’s secure encrypted storage service, a password-protected laptop, or in a locked filing cabinet at the University of Edinburgh. The anonymized data collected during this study will be used for research purposes.</p>

<h2>What are my data protection rights?</h2>
<p>The University of Edinburgh is a Data Controller for the information you provide. You have the right to access information held about you. Your right of access can be exercised in accordance with Data Protection Law. You also have other rights including rights of correction, erasure and objection. For more details, including the right to lodge a complaint with the Information Commissioner’s Office, please visit <a href="https://www.ico.org.uk">www.ico.org.uk</a>. Questions, comments and requests about your personal data can also be sent to the University Data Protection Officer at <a href="mailto:dpo@ed.ac.uk">dpo@ed.ac.uk</a>.</p>

<h2>Voluntary participation and right to withdraw</h2>
<p>Your participation is voluntary, and you may withdraw from the study at any time and for any reason. If you withdraw from the study during data gathering, we will delete your data. If you wish to have your data deleted after participation, you can contact us up to 48 hours after participation; after 48 hours, we will have deleted all identifying information from the data. Withdrawing from participation entails no penalty or loss of the benefits to which you are otherwise entitled.</p>

<h2>Contact Information</h2>
<p>If you have any questions about what you’ve just read, please feel free to ask, or contact us later. You can contact us by email at <a href="mailto:tadeg.quillien@ed.ac.uk">tadeg.quillien@ed.ac.uk</a>. This project has been approved by PPLS Ethics committee. If you have questions or comments regarding your rights as a participant, please contact the School Research Ethics Convenor at <a href="mailto:ppls.rec@ed.ac.uk">ppls.rec@ed.ac.uk</a>.</p>

<h2>Consent</h2>
<p>By proceeding with the study, you consent to the following:</p>
<ol>
    <li>I agree to participate in this study.</li>
    <li>I confirm that I have read and understood how my data will be stored and used.</li>
    <li>I understand that my Prolific ID will be collected and temporarily stored.</li>
    <li>I understand that I have the right to terminate this session at any point. If I choose to withdraw after completing the study, my data will be deleted at that time.</li>
</ol>
<button style={buttonStyle} onClick={() => props.setCurrentPhase("instructions")}>I agree</button>
            <br></br>
            <br></br>
        </div>


    )
}

export default ConsentForm;