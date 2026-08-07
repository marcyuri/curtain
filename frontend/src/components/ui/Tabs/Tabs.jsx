import "./Tabs.css";

function Tabs({
    tabs = [],
    activeTab,
    onChange,
    className = ""
}) {

    const classes = [
        "tabs",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            <div
                className="tabs__header"
                role="tablist"
            >

                {tabs.map((tab) => (

                    <button
                        key={tab.value}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.value}
                        className={`tabs__tab ${activeTab === tab.value
                                ? "tabs__tab--active"
                                : ""
                            }`}
                        onClick={() => onChange(tab.value)}
                    >

                        {tab.icon && (

                            <span className="tabs__icon">

                                <tab.icon size={18} />

                            </span>

                        )}

                        {tab.label}

                    </button>

                ))}

            </div>

        </div>

    );

}

export default Tabs;