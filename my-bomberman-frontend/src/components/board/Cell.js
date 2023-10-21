import '../../styles/Cell.css';

function Cell({ identifier, content }){
    return(
    <div id={identifier} className="cell">{content}</div>
    );
}

export default Cell;