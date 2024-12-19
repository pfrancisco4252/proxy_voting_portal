import { v4 as uuidv4 } from 'uuid';

interface SecurityToken {
  token: string;
  expiresAt: Date;
  controlNumber: string;
  deviceId: string;
}

interface DeviceInfo {
  deviceId: string;
  userAgent: string;
  ipAddress: string;
  lastAccess: Date;
  isBlocked: boolean;
}

class SecurityService {
  private readonly tokens: Map<string, SecurityToken> = new Map();
  private readonly devices: Map<string, DeviceInfo> = new Map();
  private readonly TOKEN_EXPIRY = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_DEVICES_PER_USER = 3;

  public async generateSecurityToken(
    controlNumber: string,
    deviceId: string
  ): Promise<string> {
    // Clean up expired tokens
    this.cleanupExpiredTokens();

    // Validate device
    await this.validateDevice(deviceId, controlNumber);

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRY);

    this.tokens.set(token, {
      token,
      expiresAt,
      controlNumber,
      deviceId
    });

    return token;
  }

  public async validateToken(token: string): Promise<boolean> {
    const securityToken = this.tokens.get(token);
    if (!securityToken) return false;

    if (securityToken.expiresAt < new Date()) {
      this.tokens.delete(token);
      return false;
    }

    return true;
  }

  public async registerDevice(
    deviceId: string,
    userAgent: string,
    ipAddress: string
  ): Promise<void> {
    this.devices.set(deviceId, {
      deviceId,
      userAgent,
      ipAddress,
      lastAccess: new Date(),
      isBlocked: false
    });
  }

  public async validateDevice(
    deviceId: string,
    controlNumber: string
  ): Promise<boolean> {
    const device = this.devices.get(deviceId);
    if (!device) throw new Error('Device not registered');
    if (device.isBlocked) throw new Error('Device is blocked');

    // Count active devices for this control number
    const activeDevices = Array.from(this.tokens.values())
      .filter(token => token.controlNumber === controlNumber)
      .map(token => token.deviceId);

    const uniqueDevices = new Set(activeDevices);
    if (uniqueDevices.size >= this.MAX_DEVICES_PER_USER && !uniqueDevices.has(deviceId)) {
      throw new Error('Maximum number of devices reached');
    }

    return true;
  }

  public async blockDevice(deviceId: string): Promise<void> {
    const device = this.devices.get(deviceId);
    if (device) {
      device.isBlocked = true;
      // Revoke all tokens for this device
      for (const [tokenId, token] of this.tokens.entries()) {
        if (token.deviceId === deviceId) {
          this.tokens.delete(tokenId);
        }
      }
    }
  }

  private cleanupExpiredTokens(): void {
    const now = new Date();
    for (const [tokenId, token] of this.tokens.entries()) {
      if (token.expiresAt < now) {
        this.tokens.delete(tokenId);
      }
    }
  }
}

export const securityService = new SecurityService();
