import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '../user/user.entity';
import { LoginDto } from './dtos/login.dto';
import { Public } from './auth.guard';
import { RefreshDto } from './dtos/refresh.dto';

@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a simple user' })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiBearerAuth()
  async register(@Body() registerDto: RegisterDto) {
    registerDto.role = UserRole.USER;
    const user = await this.authService.register(registerDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resUser = (({ password, refreshToken, ...rest }) => rest)(user);
    return { message: 'User created', user: resUser };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiResponse({
    status: 200,
    description: 'The login was successful.',
    type: () => ({
      accessToken: String,
      refreshToken: String,
    }),
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: LoginDto, description: 'User credentials' })
  async login(@Body() loginDto: LoginDto) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);
    return { accessToken, refreshToken };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh accessToken without re-login' })
  @ApiBody({
    type: RefreshDto,
    description: 'refresh token',
  })
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refresh(token);
  }
}
