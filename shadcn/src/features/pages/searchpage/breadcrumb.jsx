import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
   
export function BreadcrumbSearchResult() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    
    return (
        <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink className="text-white text-lg hover:text-gold" href={isAuthenticated ? "/loggedin" : "/"}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink  className="text-white text-lg hover:text-gold" href={isAuthenticated ? "/searchloggedin" : "/search"}>Search</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage  className="text-white text-lg">...</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
  }