import "./Timeline.css";

function Timeline({
    items = [],
    className = ""
}) {

    return (

        <div className={`timeline ${className}`}>

            {items.map((item, index) => (

                <div
                    key={item.id ?? index}
                    className="timeline__item"
                >

                    <div className="timeline__left">

                        <div
                            className={`
                                timeline__dot
                                ${item.color
                                    ? `timeline__dot--${item.color}`
                                    : ""
                                }
                            `}
                        />

                        {index < items.length - 1 && (

                            <div className="timeline__line" />

                        )}

                    </div>

                    <div className="timeline__content">

                        <div className="timeline__header">

                            <h4 className="timeline__title">

                                {item.title}

                            </h4>

                            {item.date && (

                                <span className="timeline__date">

                                    {item.date}

                                </span>

                            )}

                        </div>

                        {item.description && (

                            <p className="timeline__description">

                                {item.description}

                            </p>

                        )}

                        {item.children}

                    </div>

                </div>

            ))}

        </div>

    );

}

export default Timeline;