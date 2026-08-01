import { useMemo, useState } from "react";
import "./TeamSection.css";
import Button from "../../form/Button";
import Input from "../../form/Input";
import TeamCard from "../TeamCard";

const TeamSection = ({
    title = "Notre équipe",
    subtitle,
    members = [],
    departments = [],
    searchable = true,
    filterable = true,
    limit,
    showMoreLabel = "Voir toute l'équipe",
    onShowMore,
}) => {
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");

    const filteredMembers = useMemo(() => {
        return members.filter((member) => {
            const matchesDepartment =
                department === "all" ||
                member.department === department;

            const query = search.toLowerCase();

            const matchesSearch =
                member.name.toLowerCase().includes(query) ||
                member.role.toLowerCase().includes(query);

            return matchesDepartment && matchesSearch;
        });
    }, [members, search, department]);

    const displayedMembers = limit
        ? filteredMembers.slice(0, limit)
        : filteredMembers;

    return (
        <section className="team-section">
            <header className="team-section__header">
                <h2>{title}</h2>

                {subtitle && <p>{subtitle}</p>}
            </header>

            {(searchable || filterable) && (
                <div className="team-section__toolbar">
                    {searchable && (
                        <Input
                            placeholder="Rechercher un membre..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    )}

                    {filterable && (
                        <div className="team-section__filters">
                            <button
                                className={
                                    department === "all"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setDepartment("all")
                                }
                            >
                                Tous
                            </button>

                            {departments.map((item) => (
                                <button
                                    key={item}
                                    className={
                                        department === item
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setDepartment(item)
                                    }
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="team-section__grid">
                {displayedMembers.map((member) => (
                    <TeamCard
                        key={member.id}
                        {...member}
                    />
                ))}
            </div>

            {limit &&
                filteredMembers.length > limit &&
                onShowMore && (
                    <div className="team-section__footer">
                        <Button onClick={onShowMore}>
                            {showMoreLabel}
                        </Button>
                    </div>
                )}
        </section>
    );
};

export default TeamSection;