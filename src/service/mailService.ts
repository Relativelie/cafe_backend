interface IMailService {
  sendActivationMail: (to: string, link: string) => void;
}

export class MailService implements IMailService {
  async sendActivationMail(to: string, link: string) {
    console.log("sendActivationMail");
  }
}
