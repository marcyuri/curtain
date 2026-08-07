import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

import "./EmployeeForm.css";

const DEPARTMENT_OPTIONS = [
    { value: "management", label: "Direction" },
    { value: "hr", label: "Ressources Humaines" },
    { value: "finance", label: "Finance" },
    { value: "sales", label: "Ventes" },
    { value: "psychology", label: "Psychologie" },
    { value: "support", label: "Support" },
];

function EmployeeForm({

    employee = {},

    onChange,

}) {

    const handleField = (field) => (event) => {
        onChange?.({
            ...employee,
            [field]: event.target.value,
        });
    };

    return (
        <div className="employee-form">

            <div className="employee-form__row">

                <Input
                    id="employee-firstname"
                    name="firstname"
                    label="Prénom"
                    value={employee.firstname ?? ""}
                    onChange={handleField("firstname")}
                    required
                />

                <Input
                    id="employee-lastname"
                    name="lastname"
                    label="Nom"
                    value={employee.lastname ?? ""}
                    onChange={handleField("lastname")}
                    required
                />

            </div>

            <Input
                id="employee-email"
                name="email"
                type="email"
                label="Email"
                value={employee.email ?? ""}
                onChange={handleField("email")}
                required
            />

            <div className="employee-form__row">

                <Select
                    id="employee-department"
                    name="department"
                    label="Département"
                    value={employee.department ?? ""}
                    onChange={handleField("department")}
                    options={DEPARTMENT_OPTIONS}
                />

                <Input
                    id="employee-position"
                    name="position"
                    label="Poste"
                    value={employee.position ?? ""}
                    onChange={handleField("position")}
                />

            </div>

        </div>
    );
}

export default EmployeeForm;
