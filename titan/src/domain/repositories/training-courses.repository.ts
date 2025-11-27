import { AvailableTrainingCourse } from "lib";

export interface TrainingCoursesRepository {
  getAvailableCourses(userData: { documentType: string; identification: string }, token: string): Promise<AvailableTrainingCourse[]>;
}

export class TrainingCoursesRepositoryImpl implements TrainingCoursesRepository {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  async getAvailableCourses(
    userData: { documentType: string; identification: string },
    token: string
  ): Promise<AvailableTrainingCourse[]> {
    try {
      const response = await fetch(
        `${this.API_URL}/training-courses/available/${userData.identification}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching available courses");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getAvailableCourses:", error);
      return [];
    }
  }
} 