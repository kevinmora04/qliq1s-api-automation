// cypress/support/logger.ts
export class Logger {
    static info(message: string, data?: any) {
      Cypress.log({
        name: '[INFO]',
        message,
        consoleProps: () => data || {},
      });
    }
  
    static debug(message: string, data?: any) {
      Cypress.log({
        name: '[DEBUG]',
        message,
        consoleProps: () => data || {},
      });
    }
  
    static warning(message: string, data?: any) {
      Cypress.log({
        name: '[WARNING]',
        message,
        consoleProps: () => data || {},
      });
    }
  
    static error(message: string, data?: any) {
      Cypress.log({
        name: '[ERROR]',
        message,
        consoleProps: () => data || {},
      });
    }
  }
  