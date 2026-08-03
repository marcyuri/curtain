import {

    ExternalLink,

} from "lucide-react";

import Avatar from "../../common/Avatar";
import Badge from "../../common/Badge";
import ProgressBar from "../../feedback/ProgressBar";

import "./TableCell.css";

function TableCell({

    value,

    type = "text",

    align = "left",

    image,

    avatar,

    color,

    href,

    render,

}) {

    if (render) {

        return (

            <td className={`table-cell table-cell--${align}`}>

                {render()}

            </td>

        );

    }

    switch (type) {

        case "avatar":

            return (

                <td className="table-cell">

                    <div className="table-cell__avatar">

                        <Avatar

                            src={avatar}

                            name={value}

                            size="sm"

                        />

                        <span>

                            {value}

                        </span>

                    </div>

                </td>

            );

        case "image":

            return (

                <td className="table-cell">

                    <img

                        src={image}

                        alt={value}

                        className="table-cell__image"

                    />

                </td>

            );

        case "badge":

            return (

                <td className="table-cell">

                    <Badge

                        color={color}

                    >

                        {value}

                    </Badge>

                </td>

            );

        case "price":

            return (

                <td className="table-cell">

                    {Number(value).toLocaleString()} FCFA

                </td>

            );

        case "progress":

            return (

                <td className="table-cell">

                    <ProgressBar

                        value={value}

                        showPercentage

                    />

                </td>

            );

        case "link":

            return (

                <td className="table-cell">

                    <a

                        href={href}

                        target="_blank"

                        rel="noreferrer"

                    >

                        {value}

                        <ExternalLink

                            size={14}

                        />

                    </a>

                </td>

            );

        default:

            return (

                <td

                    className={`

                        table-cell

                        table-cell--${align}

                    `}

                >

                    {value}

                </td>

            );

    }

}

export default TableCell;