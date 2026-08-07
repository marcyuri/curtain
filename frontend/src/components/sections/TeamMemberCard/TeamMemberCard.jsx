import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Linkedin,
    Instagram,
    Globe,
    UserRound,
} from "lucide-react";

import Button from "../../ui/Button";

import "./TeamMemberCard.css";

function TeamMemberCard({

    photo,

    name,

    position,

    bio,

    location,

    email,

    phone,

    specialties = [],

    social = {},

    onContact,

}) {

    return (

        <article className="team-member-card">

            <div className="team-member-card__photo">

                {photo ? (

                    <img

                        src={photo}

                        alt={name}

                    />

                ) : (

                    <UserRound size={80} />

                )}

            </div>

            <div className="team-member-card__content">

                <h3>

                    {name}

                </h3>

                <span className="team-member-card__position">

                    {position}

                </span>

                {bio && (

                    <p>

                        {bio}

                    </p>

                )}

                {specialties.length > 0 && (

                    <div className="team-member-card__tags">

                        {specialties.map((item) => (

                            <span

                                key={item}

                            >

                                {item}

                            </span>

                        ))}

                    </div>

                )}

                <div className="team-member-card__infos">

                    {location && (

                        <div>

                            <MapPin size={16} />

                            {location}

                        </div>

                    )}

                    {phone && (

                        <div>

                            <Phone size={16} />

                            {phone}

                        </div>

                    )}

                    {email && (

                        <div>

                            <Mail size={16} />

                            {email}

                        </div>

                    )}

                </div>

                <div className="team-member-card__socials">

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

                    {social.website && (

                        <a

                            href={social.website}

                            target="_blank"

                            rel="noreferrer"

                        >

                            <Globe size={18} />

                        </a>

                    )}

                </div>

            </div>

            <footer className="team-member-card__footer">

                <Button

                    onClick={onContact}

                >

                    Contacter

                </Button>

            </footer>

        </article>

    );

}

export default TeamMemberCard;