import { Action } from "@ngrx/store";
export enum LayoutActionTypes {
    OpenSideNav = '[Layout] Open Left SideNav',
    CloseSideNav = '[Layout] Close Left SideNav'
}

export class OpenSideNav implements Action{
    readonly type = LayoutActionTypes.OpenSideNav;
}

export class CloseSideNav implements Action{
    readonly type = LayoutActionTypes.CloseSideNav;
}

export type LayoutActions = 
 | OpenSideNav
 | CloseSideNav;