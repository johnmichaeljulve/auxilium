export interface UserType {
    name: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}