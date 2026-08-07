import {

    useEffect,

} from "react";

import Toast from "../Toast";

import "./ToastContainer.css";

function ToastContainer({

    toasts = [],

    removeToast,

}) {

    useEffect(() => {

        const timers = toasts.map((toast) =>

            setTimeout(() => {

                removeToast?.(toast.id);

            }, toast.duration || 5000)

        );

        return () => {

            timers.forEach(clearTimeout);

        };

    }, [

        toasts,

        removeToast,

    ]);

    return (

        <section className="toast-container">

            {

                toasts.map((toast) => (

                    <Toast

                        key={toast.id}

                        {...toast}

                        onClose={removeToast}

                    />

                ))

            }

        </section>

    );

}

export default ToastContainer;