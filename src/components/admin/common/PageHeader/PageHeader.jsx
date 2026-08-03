import "./PageHeader.css";

function PageHeader({

    title,

    subtitle,

    children,

    breadcrumb,

}) {

    return (

        <header className="page-header">

            <div className="page-header__content">

                {

                    breadcrumb && (

                        <div className="page-header__breadcrumb">

                            {breadcrumb}

                        </div>

                    )

                }

                <h1>

                    {title}

                </h1>

                {

                    subtitle && (

                        <p>

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {

                children && (

                    <div className="page-header__actions">

                        {children}

                    </div>

                )

            }

        </header>

    );

}

export default PageHeader;