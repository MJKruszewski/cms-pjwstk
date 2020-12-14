import * as paypal from "paypal-rest-sdk";

export class PaypalRepository {
    constructor(
        private readonly client = paypal,
    ) {
        this.client.configure({
            mode: 'sandbox',
            client_id: process.env.PAYPAL_SANDBOX_CLIENT,
            client_secret: process.env.PAYPAL_SECRET
        });
    }

    static async build(): Promise<PaypalRepository> {
        return new PaypalRepository();
    }

    async getPayment(paymentId: string): Promise<paypal.PaymentResponse> {
        return new Promise((resolve) => {
            this.client.payment.get(paymentId, {},(error, payment) => {
                if (error || payment === null) {
                    throw error;
                } else {
                    resolve(payment);
                }
            });
        });
    }
}