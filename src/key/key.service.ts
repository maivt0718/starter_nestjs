import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs'

@Injectable()
export class KeyService{
    getPrivateKey(): string{
        const private_key_path = path.resolve(__dirname,'../../keys/private.key')
        try {
            return fs.readFileSync(private_key_path, 'utf8')
        } catch (error) {
            throw new Error(`Could not find private key`)
        }
    }
    getPublicKey(): string{
        const public_key_path = path.resolve(__dirname,'../../keys/public.key')
        try {
            return fs.readFileSync(public_key_path, 'utf8')
        } catch (error) {
            throw new Error(`Could not find public key`)
        }
    }
}