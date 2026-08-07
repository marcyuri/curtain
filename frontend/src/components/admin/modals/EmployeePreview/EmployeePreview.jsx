import {

    Mail,

    Phone,

    Briefcase,

    Calendar,

    Shield,

} from "lucide-react";

import Modal from "../Modal";

import Avatar from "../../common/Avatar";

import StatusBadge from "../../common/StatusBadge";

import "./EmployeePreview.css";

function EmployeePreview({

    open = false,

    employee,

    onClose,

}) {

    if (!employee) {

        return null;

    }

    return (

        <Modal

            open={open}

            width="950px"

            title="Aperçu de l'employé"

            subtitle="Consultation rapide"

            onClose={onClose}

            footer={

                <button

                    type="button"

                    className="employee-preview__close"

                    onClick={onClose}

                >

                    Fermer

                </button>

            }

        >

            <section className="employee-preview">

                <aside className="employee-preview__sidebar">

                    <Avatar

                        src={employee.avatar}

                        name={employee.name}

                        size="xl"

                    />

                    <h2>

                        {employee.name}

                    </h2>

                    <StatusBadge

                        status={employee.status}

                    />

                </aside>

                <div className="employee-preview__content">

                    <div className="employee-preview__grid">

                        <div>

                            <Mail size={18} />

                            <span>

                                {employee.email}

                            </span>

                        </div>

                        <div>

                            <Phone size={18} />

                            <span>

                                {employee.phone}

                            </span>

                        </div>

                        <div>

                            <Briefcase size={18} />

                            <span>

                                {employee.position}

                            </span>

                        </div>

                        <div>

                            <Shield size={18} />

                            <span>

                                {employee.role}

                            </span>

                        </div>

                        <div>

                            <Calendar size={18} />

                            <span>

                                Rejoint le {employee.hireDate}

                            </span>

                        </div>

                    </div>

                    <section className="employee-preview__notes">

                        <h3>

                            Notes

                        </h3>

                        <p>

                            {

                                employee.notes ||

                                "Aucune note disponible."

                            }

                        </p>

                    </section>

                </div>

            </section>

        </Modal>

    );

}

export default EmployeePreview;