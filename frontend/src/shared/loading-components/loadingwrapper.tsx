import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import FoldingCube from './foldingcube.tsx';

const HomePages = lazy(() => (import("../../features/homepage/pages/homepage.tsx")))
const SignUpPage = lazy(() => (import("../../features/user/pages/signuppage.tsx")))
const LoginPage = lazy(() => import("../../features/user/pages/login.tsx"))
const SearchBarPage = lazy(() => import("@/features/search/pages/searchBar.tsx"))
const ContactPage = lazy(() => import("../../features/misc/pages/Contact.tsx"))
const PasswordResetPage = lazy(() => import("../../features/user/pages/requestpasswordreset.tsx"))

export function LoadingWrapper({ children }: { children: React.ReactNode}) {
    const location = useLocation();

    const getCurrentComponent = () => {

        switch (location.pathname) {
            case '/':
                return <HomePages />;
            case '/signup':
                return <SignUpPage />;
            case '/login':
                return <LoginPage />;
            case '/search':
                return <SearchBarPage />
            case '/searchresult':
                return <FoldingCube />
            case '/contact':
                return <ContactPage />
            case "./passwordreset":
                return <PasswordResetPage />
            default:
                return null
        }
    };

    return (
        <div className="w-full h-screen">
            <Suspense fallback={getCurrentComponent()}>
                {children}
            </Suspense>
        </div>
    );
}