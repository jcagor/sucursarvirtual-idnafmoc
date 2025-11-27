import { Controller, Post, Body, Req, Get, Res } from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';
import {
  CreateMonthlyReportDto,
  QueryReportByBusinessDto,
} from './dto/create-monthly-report.dto';

@Controller('monthly-report')
export class MonthlyReportController {
  constructor(private readonly monthlyReportService: MonthlyReportService) {}

  @Post()
  create(
    @Req() request,
    @Body() createMonthlyReportDto: CreateMonthlyReportDto,
  ) {
    const token = request.headers.authorization;
    return this.monthlyReportService.create(token, createMonthlyReportDto);
  }

  @Post('/list')
  getReportList(@Req() request, @Body() query: QueryReportByBusinessDto) {
    const token = request.headers.authorization;
    return this.monthlyReportService.queryReportList(token, query);
  }

  /**
   *
   * Returns the milestones report for analyst in lalande.
   * @param request
   * @returns
   */
  @Get('/milestones/generate-report')
  generateReport(@Req() request) {
    const token = request.headers.authorization;
    return this.monthlyReportService.queryMilestonesList(token);
  }

  /**
   * Returns the summarized PDF report in lalande.
   */
  @Post('/document/summary')
  async generateSummaryDocument(@Req() request, @Res() res) {
    const token = request.headers.authorization;
    const buffer = await this.monthlyReportService.generateSummaryReport(token);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
