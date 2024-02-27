export class SessionService {
    session: boolean = false;
    username: string = ''
    userId: number = -1;

    checkIfLogged(): Promise<void> {
        return fetch('http://localhost:3001/checkIfLogged')
            .then(response => {
                if (!response.ok) {
                    this.session = false;
                    throw new Error('Session check failed');
                }
                return response.json();
            })
            .then(data => {
                this.session = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    
}
