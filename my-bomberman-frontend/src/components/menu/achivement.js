import '../../styles/achivement.css';

function achivement({ achivementName, achivementDescription }){
    return(
        <li>{achivementName} : {achivementDescription}</li>
    );
}

export default achivement;