import {
    Award,
    Globe,
    ArrowRight,
    Facebook,
    Instagram,
    Linkedin
} from "lucide-react";

import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

import "./TeamCard.css";

function TeamCard({

    member,

    variant = "default",

    onViewProfile,

    className = ""

}) {

    const {

        photo,

        name,

        role,

        specialty,

        biography,

        experience,

        languages = [],

        social = {},

        badge

    } = member;

    return (

        <article
            className={`
                team-card
                team-card--${variant}
                ${className}
            `}
        >

            <div className="team-card__header">

                <Avatar

                    src={photo}

                    alt={name}

                    size="2xl"

                />

                {badge && (

                    <Badge
                        className="team-card__badge"
                    >

                        {badge}

                    </Badge>

                )}

            </div>

            <div className="team-card__body">

                <h3>

                    {name}

                </h3>

                <span className="team-card__role">

                    {role}

                </span>

                <p className="team-card__specialty">

                    {specialty}

                </p>

                <p className="team-card__bio">

                    {biography}

                </p>

                <div className="team-card__experience">

                    <Award size={18} />

                    {experience}

                </div>

                <div className="team-card__languages">

                    <Globe size={18} />

                    {languages.join(" • ")}

                </div>

                <div className="team-card__social">

                    {social.facebook && (

                        <a
                            href={social.facebook}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <Facebook size={18} />

                        </a>

                    )}

                    {social.instagram && (

                        <a
                            href={social.instagram}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <Instagram size={18} />

                        </a>

                    )}

                    {social.linkedin && (

                        <a
                            href={social.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <Linkedin size={18} />

                        </a>

                    )}

                </div>

                <Button

                    fullWidth

                    onClick={() =>
                        onViewProfile?.(member)
                    }

                >

                    Voir le profil

                    <ArrowRight size={18} />

                </Button>

            </div>

        </article>

    );

}

export default TeamCard;