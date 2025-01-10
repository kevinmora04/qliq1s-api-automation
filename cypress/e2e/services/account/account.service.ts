import { loginService } from './login.service';

export const accountService = {
  login: loginService.execute.bind(loginService),
};

export * from './account.service.types';