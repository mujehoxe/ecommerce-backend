import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from './user.entity';
import { Roles, RolesGuard } from '../auth/auth.guard';
import { RegisterDto } from '../auth/dtos/register.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';

@Controller('user')
@ApiTags('user')
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<ResponseUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseUserDto> {
    return this.userService.findById(id);
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create an admin user' })
  @ApiResponse({
    status: 201,
    description: 'The admin user has been successfully created.',
  })
  @ApiBody({ type: RegisterDto })
  async createAdminUser(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = UserRole.ADMIN;

    const user = await this.userService.createUser(createUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resUser = (({ password, refreshToken, ...rest }) => rest)(user);
    return { message: 'Admin user created', user: resUser };
  }
}
