import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class Mytable {

    sortDir: string = "asc";
    users = [];

    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('https://api.github.com/');
        });
    }

    activate() {
        return this.http.fetch('users')
            .then(response => response.json())
            .then(users => this.users = users);
    }

    sort(sortBy:string) {

        let factor = -1;

        if (this.sortDir === 'asc') {
            this.sortDir = 'desc';
            factor = 1;
        } else {
            this.sortDir = 'asc';
            factor = -1;
        }
        this.users.sort((user1, user2) => {
            
            return (user1[sortBy] - user2[sortBy]) * factor;
        });

    }
}