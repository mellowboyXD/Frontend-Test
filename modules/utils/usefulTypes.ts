/*
 * Defines all useful types.
 * */

export interface Task {
    id: string;
    name: string;
    priority: "Low" | "Medium" | "High";
    isChecked: boolean;
};

export enum FilterOptions { ALL, ACTIVE, COMPLETED };
