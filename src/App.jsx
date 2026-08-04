import { Suspense } from "react";

import AppRouter from "@routes/AppRouter";

import Loader from "@components/common/Loader";
import ErrorBoundary from "@components/common/ErrorBoundary";

function App() {
    return (
        <ErrorBoundary showDetails>

            <Suspense
                fallback={
                    <Loader />
                }
            >
                <AppRouter />
            </Suspense>

        </ErrorBoundary>
    );
}

export default App;