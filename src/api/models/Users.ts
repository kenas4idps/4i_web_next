export interface UserProps {
  telegramId: string;
  principal: string;
  name?: string;
  email?: string;
  identity?: string;
  activationCode?: string;
  isActive?: boolean;
  validatingAt?: number;
  privateKey?: string;
  createdAt: string;
  updatedAt: string;
}

export class User {
  telegramId: string = '';
  principal: string = '';
  name?: string;
  email?: string;
  identity?: string;
  activationCode?: string;
  isActive?: boolean;
  validatingAt?: number;
  privateKey?: string;
  createdAt: string = '';
  updatedAt: string = '';

  constructor(data: UserProps) {
    this.telegramId = data.telegramId || this.telegramId;
    this.principal = data.principal || this.principal;
    this.name = data.name || this.name;
    this.email = data.email || this.email;
    this.identity = data.identity || this.identity;
    this.activationCode = data.activationCode || this.activationCode;
    this.isActive = data.isActive || this.isActive;
    this.validatingAt = data.validatingAt || this.validatingAt;
    this.privateKey = data.privateKey || this.privateKey;
    this.createdAt = data.createdAt || this.createdAt;
    this.updatedAt = data.updatedAt || this.updatedAt;
  }
}
