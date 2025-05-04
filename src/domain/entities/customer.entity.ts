export class CustomerEntity {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;

    constructor(id: string, fullName: string, email: string, phone: string, address: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}