import { ComponentType } from 'react';
import Event from './Event';
import Login from './Login';
import { PathRouteProps } from 'react-router/lib/components';
import Post from './Post';

export enum ERoutes {
    LOGIN = '/login',
    POST = '/post',
    HOME = '/'
} 

export const routesConfig: Array<PathRouteProps & { Element: ComponentType }> = [
    {
        path: ERoutes.LOGIN,
        Element: Login
    },
    {
        path: ERoutes.POST,
        Element: Post
    },
    {
        path: ERoutes.HOME,
        Element: Event
    }
];
