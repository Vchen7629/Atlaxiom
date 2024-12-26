import {
    Breadcrumb,
    //BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { useSelector } from 'react-redux';
import { token } from "../types/searchresultcomptypes";
   
export function BreadcrumbSearchResult() {
    const isAuthenticated = useSelector((state: token) => state.auth.token !== null);
    
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