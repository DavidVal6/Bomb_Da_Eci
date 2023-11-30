import '../../styles/achivementsBar.css';
import Achivement from './achivement';

function achivementsBar(){
    return(
        <div className="achivementPanel">
            <h3 className="panelTitle">Achivements</h3>
            <ul className="achivementBar">
                <Achivement achivementName="Bombtastic" achivementDescription="You defeat more than 1000 players"/>
                <Achivement achivementName="Bombtastic" achivementDescription="You defeat more than 1000 players"/>
                <Achivement achivementName="Bombtastic" achivementDescription="You defeat more than 1000 players"/>
                <Achivement achivementName="Bombtastic" achivementDescription="You defeat more than 1000 players"/>
                <Achivement achivementName="Bombtastic" achivementDescription="You defeat more than 1000 players"/>
            </ul>
        </div>
    );
}

export default achivementsBar;