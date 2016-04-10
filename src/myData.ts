import {DataItem} from './dataItem'

export class MyData{
    
    getItems(){
        
        let itemsStr:string = localStorage.getItem("items") || "[]";
        return JSON.parse(itemsStr);
    }
    
    setItems(itemsToSet:DataItem[]){
        return localStorage.setItem("items",JSON.stringify(itemsToSet));
    }
}