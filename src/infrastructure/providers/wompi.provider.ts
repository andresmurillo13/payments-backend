import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class WompiProvider {
    private readonly publicKey = process.env.WOMPI_PUBLIC_KEY;
    private readonly privateKey = process.env.WOMPI_PRIVATE_KEY;
    private readonly apiUrl = process.env.WOMPI_API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';


    async getAcceptanceToken(): Promise<{ acceptanceToken: string }> {
        try {
            const response = await axios.get(`${this.apiUrl}/merchants/${this.publicKey}`);

            return {
                acceptanceToken: response.data.data.presigned_acceptance.acceptance_token,

            };
        } catch (error) {
            throw new HttpException(`Error getting acceptance_token: ${error.message}`, 500);
        }
    }


    async createCardTransaction(params: {
        amountInCents: number;
        customerEmail: string;
        paymentMethodToken: string;
        reference: string;
        acceptanceToken: string;
        installments?: number;
        redirectUrl: string;
    }) {
        const {
            amountInCents,
            customerEmail,
            paymentMethodToken,
            reference,
            acceptanceToken,
            installments = 1,
            redirectUrl,
        } = params;

        const currency = 'COP';
        const integrityKey = process.env.WOMPI_INTEGRITY_KEY;

        if (!integrityKey) {
            throw new Error('WOMPI_INTEGRITY_KEY is not defined in environment variables.');
        }

        const signature = this.generateIntegritySignature(reference, amountInCents, currency, integrityKey);


        const payload = {
            amount_in_cents: amountInCents,
            currency,
            customer_email: customerEmail,
            payment_method: {
                type: 'CARD',
                token: paymentMethodToken,
                installments,
            },
            reference,
            acceptance_token: acceptanceToken,
            redirect_url: redirectUrl,
            signature,
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.privateKey}`,
        };

        console.log(
            'Firma esperada:',
            crypto
                .createHmac('sha256', this.privateKey)
                .update(JSON.stringify(payload))
                .digest('hex')
        );
        try {
            const response = await axios.post(`${this.apiUrl}/transactions`, payload, { headers });
            return response.data;
        } catch (error) {

            if (error.response?.data?.error?.messages) {
                console.error('Mensajes de error:', error.response.data.error.messages);
            } else {
                console.error('Error desconocido:', error.response?.data || error.message);
            }
            throw new HttpException(
                `Wompi card transaction error: ${error.response?.data?.message || error.message}`,
                error.response?.status || 500,
            );
        }
    }


    generateIntegritySignature(reference: string, amountInCents: number, currency: string, merchantKey: string): string {
        const rawString = `${reference}${amountInCents}${currency}${merchantKey}`;
        return crypto.createHash('sha256').update(rawString).digest('hex');
    }


    verifyWebhookSignature(payload: any, signature: string): boolean {
        const expected = crypto
            .createHmac('sha256', this.privateKey)
            .update(JSON.stringify(payload))
            .digest('hex');
        console.log(
            'Firma esperada:',
            crypto
                .createHmac('sha256', this.privateKey)
                .update(JSON.stringify(payload))
                .digest('hex')
        );
        return expected === signature;
    }
}
