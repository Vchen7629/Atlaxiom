import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import FoldingCube from './foldingcube';

const HomePages = lazy(() => (import("../../pages/homepage/homepage.tsx")))
const SignUpPage = lazy(() => (import("../../pages/sign-up-page/signuppage.tsx")))
const LoginPage = lazy(() => import("../../pages/loginpage/login.tsx"))
const SearchBarPage = lazy(() => import("../../pages/searchpage/searchbarpage.tsx"))
const PrivacyPolicyPage = lazy(() => import("../../pages/privacypolicypage/privacypolicypage.tsx"))
const SiteHelpPage = lazy(() => import("../../pages/sitehelppage/FaqPage.tsx"))

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
            case '/privacy':
                return <PrivacyPolicyPage />
            case '/FAQ':
                return <SiteHelpPage />
            default:
                <FoldingCube/>;
        }

        return null;
    };

    return (
        <div className="w-full h-screen">
            <Suspense fallback={getCurrentComponent()}>
                {children}
            </Suspense>
        </div>
    );
}