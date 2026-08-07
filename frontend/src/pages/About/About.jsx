import AboutSection from "../../components/sections/AboutSection";
import StatisticsSection from "../../components/sections/StatisticsSection";
import TeamMemberCard from "../../components/sections/TeamMemberCard";
import CTASection from "../../components/sections/CTASection";

import {

    statistics,

    teamMembers,

} from "./data";

import "./About.css";

function About() {

    return (

        <main className="about-page">

            <AboutSection />

            <StatisticsSection

                statistics={statistics}

            />

            <section className="about-page__team">

                <div className="about-page__header">

                    <span>

                        Notre équipe

                    </span>

                    <h2>

                        Les personnes qui font vivre LOVE CAN BUILD

                    </h2>

                    <p>

                        Notre équipe vous accompagne avec professionnalisme,
                        écoute et bienveillance.

                    </p>

                </div>

                <div className="about-page__grid">

                    {

                        teamMembers.map((member) => (

                            <TeamMemberCard

                                key={member.id}

                                {...member}

                            />

                        ))

                    }

                </div>

            </section>

            <CTASection />

        </main>

    );

}

export default About;