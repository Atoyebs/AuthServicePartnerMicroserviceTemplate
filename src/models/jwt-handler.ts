// https://k94n.com/es6-modules-single-instance-pattern

import jwt from "supertokens-node/recipe/jwt";
import JsonWebToken, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient, { JwksClient } from "jwks-rsa";

export class JWTHandler {
  private static instance: JWTHandler;
  private client: JwksClient;
  public jwt: string;

  private constructor() {
    this.client = this.createJWKSClient();
  }

  public static getInstance(): JWTHandler {
    if (!this.instance) {
      this.instance = new JWTHandler();
    }

    return this.instance;
  }

  private convertDaysToSeconds(days: number): number {
    const secondsInADay = 86400;
    return days * secondsInADay;
  }

  async createNewJWT(payload: any, days: number) {
    let jwtResponse = await jwt.createJWT(
      {
        ...payload,
        source: "microservice",
      },
      this.convertDaysToSeconds(days)
    );
    if (jwtResponse.status === "OK") {
      // Send JWT as Authorization header to M2
      return jwtResponse.jwt;
    }
    throw new Error("Unable to create JWT. Should never come here.");
  }

  private createJWKSClient(jwksUri?: string) {
    try {
      const aJwksUri =
        jwksUri ||
        `${process.env.NEXT_SERVER_API_DOMAIN}/${process.env.NEXT_SERVER_API_BASE_PATH}/jwt/jwks.json`;

      const client = jwksClient({ jwksUri: aJwksUri });
      return client;
    } catch (error) {
      throw error;
    }
  }

  private async getKey() {
    const jwks = (await this.client.getKeys()) as { kid: string }[];
    const sKey = jwks[1].kid;

    const signingKey = await this.client.getSigningKey(sKey);
    const publicKey = signingKey.getPublicKey();

    return publicKey;
  }

  /**
   * Decodes a JSON Web Token (JWT) using the provided key.
   *
   * @param {string} jwt - The JWT to decode.
   * @return {Promise<[any, boolean]>} A Promise that resolves to an array containing the decoded JWT and a boolean indicating success.
   * If the decoding fails, the Promise is rejected with the error.
   */
  public async decodeJWT(jwt: string): Promise<[any, boolean]> {
    const key = await this.getKey();

    return new Promise((resolve, reject) => {
      JsonWebToken.verify(jwt, key, {}, function (err, decoded) {
        if (err) {
          reject(err);
        }

        resolve([decoded, true]);
      });
    });
  }
}
