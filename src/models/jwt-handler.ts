// https://k94n.com/es6-modules-single-instance-pattern

import jwt from "supertokens-node/recipe/jwt";
import JsonWebToken, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient, { JwksClient } from "jwks-rsa";

export class JWTHandler {
  private static instance: JWTHandler;
  private client: JwksClient;
  public aJWT: string;

  private constructor() {
    this.client = this.createJWKSClient();
    this.aJWT = "";
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
      this.aJWT = jwtResponse.jwt;
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

  public async getVerifiedJWT(payload: any, days: number): Promise<[string, boolean]> {
    try {
      //get the existing JWT
      const existingJWT = this.aJWT;

      //if the jwt is empty, this means that we need to create a new one
      if (existingJWT == "") {
        const newJWT = await this.createNewJWT(payload, days);
        //here we create a new JWT and let the caller know that it was created afresh
        return [newJWT, true];
      }

      //check if the jwt is valid
      const [decodedJWT, wasValid] = await this.decodeJWT(existingJWT);

      //if the jwt is valid, return the token and end the execution there
      if (wasValid) {
        return [existingJWT, wasValid];
      }

      //if the jwt is NOT valid, create a brand new one.
      const freshJWT = await this.createNewJWT(payload, days);

      //return the token
      return [freshJWT, wasValid];
    } catch (error) {
      throw error;
    }
  }
}
