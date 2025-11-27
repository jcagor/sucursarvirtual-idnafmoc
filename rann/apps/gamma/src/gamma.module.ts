import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GammaController } from './gamma.controller';
import { GammaService } from './gamma.service';
import { PrismaService } from './prisma/prisma.service';
import { SharedModule } from '@app/shared';
import { UserSiseModule } from './user-sise/user-sise.module';
import { CoursesModule } from './courses/courses.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { DepartmentModule } from './department/department.module';
import { CityModule } from './city/city.module';
import { SectorModule } from './sector/sector.module';
import { SubsectorModule } from './subsector/subsector.module';
import { SelfManagementModule } from './self-management/self-management.module';
import { FormUtilsModule } from './form-utils/form-utils.module';
import { PostulationModule } from './postulation/postulation.module';
import { AppointmentModule } from './appointment/appointment.module';
import { UserMpacModule } from './user-mpac/user-mpac.module';
import { CourseModule } from './course/course.module';
import { CourseScheduleModule } from './course-schedule/course-schedule.module';
import { CourseRegistrationModule } from './course-registration/course-registration.module';
import { IpaasServicesModule } from './ipaas-services/ipaas-services.module';
import { CourseCurriculumModule } from './course-curriculum/course-curriculum.module';
import { TrainingCoursesModule } from './training-courses/training-courses.module';
import { BulkUsersModule } from './bulk-users/bulk-users.module';
import { CourseSessionModule } from './course-session/course-session.module';
import { MonthlyReportModule } from './monthly-report/monthly-report.module';
import { UserInfoModule } from './user-info/user-info.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { CityService } from './city/city.service';
import { CreaApiClientModule } from './crea-api-client/crea-api-client.module';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckService } from './health-check/health-check.service';
import { AwsS3ClientModule } from './aws-s3-client/aws-s3-client.module';
import { WorkPlanModule } from './work-plan/work-plan.module';
import { GrowthPlanModule } from './growth-plan/growth-plan.module';
import { ProgramModule } from './program/program.module';
import { BusinessValidationModule } from './business-validation/business-validation.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { PsychologistTestModule } from './psychologist-test/psychologist-test.module';
import { UserInfoService } from './user-info/user-info.service';

@Module({
  imports: [
    SharedModule,
    UserSiseModule,
    CoursesModule,
    DepartmentModule,
    CityModule,
    SectorModule,
    SubsectorModule,
    SelfManagementModule,
    CurriculumModule,
    FormUtilsModule,
    PostulationModule,
    AppointmentModule,
    UserMpacModule,
    CourseModule,
    CourseScheduleModule,
    CourseRegistrationModule,
    IpaasServicesModule,
    CourseCurriculumModule,
    HealthCheckModule,
    TrainingCoursesModule,
    BulkUsersModule,
    ScheduleModule.forRoot(),
    CourseSessionModule,
    MonthlyReportModule,
    UserInfoModule,
    CreaApiClientModule,
    HttpModule,
    AwsS3ClientModule,
    WorkPlanModule,
    GrowthPlanModule,
    ProgramModule,
    BusinessValidationModule,
    UserProfileModule,
    PsychologistTestModule,
  ],
  controllers: [GammaController],
  providers: [GammaService, PrismaService, CityService, HealthCheckService, UserInfoService],
})
export class GammaModule {}
