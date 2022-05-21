const nodemailer = require('nodemailer')
const config = require('config')

class MailService {

	constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: false,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASSWORD
            }
        })
    }

       async sendActivationMail(to, user) {
        await this.transporter.sendMail({
            from: config.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + "DQ",
            text: '',
            html:
                `
                <div style="width: 100%; background: #2c2f33; color: #ffffff; padding: 25px;">
                    <div>
                        <p style="font-size: 23px;">
                            Добрый День, ${user.nickname}
                        </p>
                    <p>
                        Ваш статус - ${user.user_status}
                    </p>
                    <p>
                    	Для активации вашего аккаунта перейдите по <a href="${config.clientUrl}" style="color: #7289da">ссылке</a>, и войдите в аккаунт
                    </p>
                </div>
                `
        })
    }

}

module.exports = new MailService()