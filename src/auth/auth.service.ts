import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    return await this.userService.createUser(registerDto);
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userService.findUserByUsername(username);
    if (user && (await this.userService.comparePassword(user, password))) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
      await this.userService.updateRefreshToken(user.id, refreshToken);
      return { accessToken, refreshToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refresh(refreshToken: string) {
    const user = await this.validateRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.userService.updateRefreshToken(user.id, newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  }

  async validateRefreshToken(refreshToken: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);
      if (user && user.refreshToken === refreshToken) {
        return user;
      }
    } catch (error) {
      throw new InternalServerErrorException("couldn't verify token", error);
    }
    return null;
  }
}
