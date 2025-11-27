import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AssignAdminBusinessDto } from './dto/businessAdministratos.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('/consultants-assigned-to-business/:business_id')
  findConsultantsToBusiness(@Param('business_id') business_id: string) {
    return this.userProfileService.findConsultantsToBusiness(business_id);
  }
  @Get('/admins-assigned-to-business/:business_id')
  findAdminsToBusiness(@Param('business_id') business_id: string) {
    return this.userProfileService.findAdminsToBusiness(business_id);
  }


  // Business Administrators API
  // Endpoints to be used via swagger or external tools, not use for WEB UI functions.

  @Post('/business-administrator/:adminUserId/business')
  registerBusinessAdministrators(@Param('adminUserId') adminUserId: string, @Body() businessInfoDto: AssignAdminBusinessDto) {
    return this.userProfileService.registerBusinessAdministrators(adminUserId, businessInfoDto);
  }

  @Get('/business-administrator/:adminUserId/business')
  readBusinessAdministrators(@Param('adminUserId') adminUserId: string) {
    return this.userProfileService.readBusinessAdministrators(adminUserId);
  }

  @Get('/business-administrator/:adminUserId/business/history')
  readBusinessAdministratorsHistory(@Param('adminUserId') adminUserId: string) {
    return this.userProfileService.readBusinessAdministratorsHistory(adminUserId);
  }

  @Delete('/business-administrator/:adminUserId/business/:businessId')
  deleteBusinessAdministrator(@Param('businessId') businessId: string, @Param('adminUserId') adminUserId:string) {
    return this.userProfileService.deleteBusinessAdministrator(businessId, adminUserId);
  }

  // Business Administrators API
}
