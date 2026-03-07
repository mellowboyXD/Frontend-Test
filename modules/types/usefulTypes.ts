/*
 * Defines all useful types.
 * */

export interface Task {
    id: string;
    name: string;
    priority: "Low" | "Medium" | "High";
    timestamp: number;
    isChecked: boolean;
};

export enum FilterOptions { ALL, ACTIVE, COMPLETED };
