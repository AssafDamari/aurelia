import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {MyData} from './myData'

@autoinject
export class Mytable {

    sortDir: string = "asc";
    sortBy: string = "id";
    users = [];
    columns = ["id", "login", "type", "url", "site_admin"];

    constructor(private http: HttpClient,private myData:MyData) {
        
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('https://api.github.com/');
        });
    }

    activate() {
        this.sort(this.sortBy);
        return this.http.fetch('users')
            .then(response => response.json())
            .then(users => this.users = users);
            
    }

    sort(sortBy: string) {
        if (sortBy) {
            this.sortBy = sortBy;
        }
        
        let factor = this.toggleSortDir();

        this.users.sort((user1, user2) => {
            if (typeof user1[this.sortBy] == "string") {
                return user1[this.sortBy].localeCompare(user2[this.sortBy]) * factor;
            } else if (typeof user1[this.sortBy] == "number") {
                return (user1[this.sortBy] - user2[this.sortBy]) * factor;
            } else if (typeof user1[this.sortBy] == "boolean") {
                return (user1[this.sortBy] ? 1 : -1) * factor;
            }
        });
    }

    toggleSortDir(): number {
        let factor: number = -1;
        if (this.sortDir === 'asc') {
            this.sortDir = 'desc';
            factor = 1;
        } else {
            this.sortDir = 'asc';
            factor = -1;
        }
        return factor;
    }

}