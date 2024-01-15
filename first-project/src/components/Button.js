function Button(props) {
    return (
        <div>
        {props.onClick ?
        <button className={"btn " + props.className} type="button" onClick={props.onClick}>
            { props.name || "Click me" } {props.yelling && "!!!"}
        </button>
        :
        <a href={props.link} className={"btn " + (props.className || "btn-primary")} >
            { props.name || "Click me"} {props.yelling && "!!!"}
        </a>
        }
        </div>
    );
}

export default Button;