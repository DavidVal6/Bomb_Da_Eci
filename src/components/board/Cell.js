import '../../styles/Cell.css';

function Cell({ row, column, content}){
    return(
    <div id={row + "-" + column} className="cell">{content}</div>
    );
}

export default Cell;