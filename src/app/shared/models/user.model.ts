import { UserInterface } from '../interfaces/user.interface';
export class UserModel {
    nombre: string;
    correo: string;
    password: string;
    uid: string;

    constructor(user?: UserInterface) {
        this.nombre = user?.nombre || '';
        this.correo = user?.correo || '';
        this.password = user?.password || '';
        this.uid = user?.uid || '';
    }
}
