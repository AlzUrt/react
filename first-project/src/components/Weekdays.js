const weekdays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

function Agenda(props) {
    return (
        <div>
            <h2>Agenda</h2>
            <ul>
                {weekdays.map((day)=>
                    <li 
                    key={day}
                    className={props.day === day && "fw-bold"}
                    style = {{fontweight: props.day === day ? 700 : 400}}
                    >
                        {props.day === day ? day.toUpperCase() : day}
                    </li>)
                }
            </ul>
        </div>
    );
}

export default Agenda;